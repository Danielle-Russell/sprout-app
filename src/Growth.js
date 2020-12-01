import React from "react";
import SproutContext from "./SproutContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRuler } from "@fortawesome/free-solid-svg-icons";
import { faWeight } from "@fortawesome/free-solid-svg-icons";
import config from "./config";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";

export default class Growth extends React.Component {
  state = {
    heightOpen: false,
    weightOpen: false,
    formOpen: false,
  };

  static contextType = SproutContext;

  back = () => {
    this.props.history.push(`/dashboard/${this.props.match.params.id}`);
  };

  goBack = () => {
    setTimeout(function () {
      window.location.reload();
    }, 1000);
    this.setState({
      formOpen: false,
    });
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

    const { id } = this.props.match.params;

    const sortedArray2 = growth
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .reverse();

    const heights = sortedArray2.map((grow, index) => {
      if (grow.title === "Height" && grow.sproutid === Number(id)) {
        return (
          <div className="height">
            <li key={index}>
              <img width={50} src="https://www.flaticon.com/svg/static/icons/svg/2589/2589559.svg" alt="measuring tape" />
              <span className="date">{grow.date}</span>
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
      if (grow.title === "Weight" && grow.sproutid === Number(id)) {
        return (
          <div className="height">
            <li key={index}>
              <span className="date">{grow.date}</span>
              <br />
              <img src="https://www.flaticon.com/svg/static/icons/svg/822/822133.svg" alt="scale" width={50} />
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
              <FontAwesomeIcon icon={faLongArrowAltLeft} /> Back to Dashboard{" "}
            </p>
          </button>
          <button className="btn" onClick={this.goHome}>
            All
          </button>
          <button className="btn" onClick={this.height}>
            <FontAwesomeIcon icon={faRuler} /> Heights
          </button>
          <button className="btn" onClick={this.weight}>
            <FontAwesomeIcon icon={faWeight} /> Weights
          </button>
          <button className="btn" onClick={this.newGrowth}>
            {" "}
            <p>Add New Activity</p>
          </button>
        </div>
        <div className="height">
          {this.state.formOpen ? (
            <form className="left" onSubmit={this.handleSubmit}>
              <h2> New Growth Record </h2>
              <label htmlFor="height">
                <input value="Height" type="radio" name="title" required />
                Height{" "}
              </label>
              <label htmlFor="weight">
                <input value="Weight" type="radio" name="title" required />
                Weight{" "}
              </label>

              <input name="notes" type="text" placeholder="Notes" required />
              <input name="number" type="text" placeholder="Number" required />
              <select name="units">
                <option value="lbs">lbs</option>
                <option value="inches">inches</option>
              </select>
              <input
                name="date"
                type="date"
                required
                placeholder="Date YYYY-MM-DD"
              />

              <input type="submit" />
            </form>
          ) : this.state.heightOpen ? (
            heights
          ) : this.state.weightOpen ? (
            weights
          ) : (
            [heights, weights]
          )}
        </div>
      </>
    );
  }
}
