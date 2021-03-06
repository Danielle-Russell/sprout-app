import React from "react";
import SproutContext from "./SproutContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRuler } from "@fortawesome/free-solid-svg-icons";
import { faWeight } from "@fortawesome/free-solid-svg-icons";
import config from "./config";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

export default class Growth extends React.Component {
  state = {
    heightOpen: false,
    weightOpen: false,
    formOpen: false,
    units: "",
    error: false,
    number: 1,
  };

  static contextType = SproutContext;

  back = () => {
    this.props.history.push(`/dashboard/${this.props.match.params.id}`);
  };

  goBack = () => {
    this.setState({
      formOpen: false,
    });
  };

  onChange = (e) => {
    this.setState({
      number: e.target.value,
    });
  };

  validateNumber = () => {
    const number = parseFloat(this.state.number);

    if (!Number.isInteger(number)) {
      return "Please select a whole number";
    }
    return null;
  };
  determineUnits = (e) => {
    if (e.target.value === "Height") {
      this.setState({
        units: "inches",
      });
    }
    if (e.target.value === "Weight") {
      this.setState({
        units: "lbs",
      });
    }
  };
  addNewGrowth = (growth) => {
    fetch(`${config.API_ENDPOINT}/api/growth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(growth),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => this.context.addGrowth(responseJson))
      .then(this.goBack())
      .catch((error) => {
        this.setState({ hasError: true });
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newGrowth = {
      useremail: localStorage.getItem("user email"),
      sproutid: parseInt(this.props.match.params.id),
      title: e.target.title.value,
      notes: e.target.notes.value,
      date: e.target.date.value,
      number: e.target.number.value,
      units: e.target.units.value,
    };
    this.addNewGrowth(newGrowth);
  };

  height = () => {
    this.setState({
      heightOpen: true,
      weightOpen: false,
      formOpen: false,
    });
  };
  weight = () => {
    this.setState({
      heightOpen: false,
      weightOpen: true,
      formOpen: false,
    });
  };

  goHome = () => {
    this.setState({
      heightOpen: false,
      weightOpen: false,
      formOpen: false,
    });
  };

  newGrowth = () => {
    this.setState({
      formOpen: true,
      heightOpen: false,
      weightOpen: false,
    });
  };
  render() {
    let growth = [];
    const growthArray = () => {
      for (var key in this.context.growth) {
        growth.push(this.context.growth[key]);
      }
    };
    growthArray();

    const sortedArray2 = growth
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .reverse();

    const heights = sortedArray2.map((grow, index) => {
      if (
        grow.title === "Height" &&
        grow.sproutid === Number(this.props.match.params.id)
      ) {
        return (
          <div key={grow.id} className="height">
            <li key={index}>
              <span className="date">{grow.date}</span>
              <br />
              <img
                width={50}
                src="https://www.flaticon.com/svg/static/icons/svg/2589/2589559.svg"
                alt="measuring tape"
              />

              <br />

              {grow.title}
              <br />
              <span>
                {grow.number} {grow.units}
              </span>
              <br />
              <span>{grow.notes}</span>
            </li>
          </div>
        );
      }
      return null;
    });

    const weights = sortedArray2.map((grow, index) => {
      if (
        grow.title === "Weight" &&
        grow.sproutid === Number(this.props.match.params.id)
      ) {
        return (
          <div key={grow.id} className="height">
            <li key={index}>
              <span className="date">{grow.date}</span>
              <br />
              <img
                src="https://www.flaticon.com/svg/static/icons/svg/822/822133.svg"
                alt="scale"
                width={50}
              />
              <br />
              {grow.title}
              <br />
              <span>
                {grow.number} {grow.units}
              </span>
              <br />
              <span>{grow.notes}</span>
            </li>
          </div>
        );
      }
      return null;
    });

    return (
      <>
        <div className="sidebar">
          <button className="btn" onClick={this.back}>
            <p>
              <FontAwesomeIcon icon={faLongArrowAltLeft} /> Back to Dashboard
            </p>
          </button>
          <button className="btn" onClick={this.goHome}>
            <p> All </p>
          </button>
          <button className="btn" onClick={this.height}>
            <FontAwesomeIcon icon={faRuler} /> <p>Height </p>
          </button>
          <button className="btn" onClick={this.weight}>
            <FontAwesomeIcon icon={faWeight} /> <p>Weight</p>
          </button>
          <button className="btn" onClick={this.newGrowth}>
            <p>Add New Activity</p>
          </button>
        </div>
        <main className="height">
          <h1>GROWTH</h1>
          {this.state.formOpen ? (
            <form className="default-form" onSubmit={this.handleSubmit}>
              <h2> New Growth Record </h2>
              <fieldset>
                <legend>
                  <span className="act-title">TYPE</span>
                </legend>

                <label htmlFor="height">
                  <input
                    value="Height"
                    id="height"
                    type="radio"
                    name="title"
                    onChange={this.determineUnits}
                    required
                  />
                  Height
                </label>
                <label htmlFor="weight">
                  <input
                    id="weight"
                    value="Weight"
                    type="radio"
                    name="title"
                    onChange={this.determineUnits}
                    required
                  />
                  Weight
                </label>
              </fieldset>
              <label htmlFor="notes">
                {" "}
                <span className="act-title">NOTES</span>
              </label>

              <input
                name="notes"
                id="notes"
                type="text"
                placeholder="Notes"
                required
              />
              <label htmlFor="number">
                {" "}
                <span className="act-title">NUMBER</span>
              </label>
              <span>example: "5" for "5lbs"</span>

              <input
                name="number"
                id="number"
                type="text"
                onChange={this.onChange}
              />
              {this.validateNumber()}
              <label htmlFor="units">
                {" "}
                <span className="act-title">UNITS</span>
              </label>

              <select name="units" id="units" readOnly>
                {this.state.units === "lbs" ? (
                  <option value="lbs">lbs</option>
                ) : (
                  <option value="inches">inches</option>
                )}
              </select>
              <label htmlFor="date">
                {" "}
                <span className="act-title">DATE</span>
              </label>

              <input
                name="date"
                id="date"
                type="date"
                required
                placeholder="Date YYYY-MM-DD"
              />

              <input
                className="sign-btn"
                type="submit"
                disabled={this.validateNumber()}
              />
            </form>
          ) : this.state.heightOpen ? (
            heights
          ) : this.state.weightOpen ? (
            weights
          ) : (
            [heights, weights]
          )}
        </main>
      </>
    );
  }
}

Growth.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};
