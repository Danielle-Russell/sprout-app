import React from "react";
import SproutContext from "./SproutContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
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
    this.props.history.goBack();
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
    window.location.reload();
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
            <span className="date">{grow.date}</span>
            <li key={index}>
              <FontAwesomeIcon icon={faRuler} />
              {[
                grow.title,
                " ",
                <br />,
                <span>
                  {grow.number} {grow.units}
                </span>,
                <br />,
                <span>{grow.notes}</span>,
              ]}
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
            <span className="date">{grow.date}</span>

            <li key={index}>
              <FontAwesomeIcon icon={faWeight} />{" "}
              {[
                grow.title,
                " ",
                <br />,
                <span>
                  {grow.number} {grow.units}
                </span>,
                <br />,
                <span>{grow.notes}</span>,
              ]}
            </li>
          </div>
        );
      }
      return null;
    });

    return (
      <>
        <div className="sidebar">
          <button onClick={this.back}><p>Back to Dashboard </p></button>
          <button onClick={this.goHome}>
            <FontAwesomeIcon icon={faHome} />
          </button>
          <button onClick={this.height}>
            <FontAwesomeIcon icon={faRuler} />
          </button>
          <button onClick={this.weight}>
            <FontAwesomeIcon icon={faWeight} />
          </button>
          <button onClick={this.newGrowth}> <p>Add New Activity</p></button>
        </div>
        <div className="height">
          {this.state.formOpen ? (
            <form className="left" onSubmit={this.handleSubmit}>
              <h2> New Growth Record </h2>
              <div className="inputs">
                <label htmlFor="height">
                  <input value="Height" type="radio" name="title" />
                  Height{" "}
                </label>
                <label htmlFor="weight">
                  <input value="Weight" type="radio" name="title" />
                  Weight{" "}
                </label>
              </div>

              <input name="notes" type="text" placeholder="Notes" />
              <input name="number" type="text" placeholder="Number" />
              <select name="units">
                <option value="lbs">lbs</option>
                <option value="inches">inches</option>
              </select>
              <input name="date" type="date" />

              <input className="submit" type="submit" />
            </form>
          ) : (
            sortedArray2.map((grow, index) => {
              let icon;
              if (grow.title === "Height") {
                icon = <FontAwesomeIcon icon={faRuler} />;
              } else if (grow.title === "Weight") {
                icon = <FontAwesomeIcon icon={faWeight} />;
              }
              if (
                Number(id) === grow.sproutid &&
                !this.state.heightOpen &&
                !this.state.weightOpen
              ) {
                return (
                  <>
                    <span className="date">{grow.date}</span>

                    <li key={index}>
                      {icon} {grow.title}
                      <br />
                      <span>
                        {grow.number} {grow.units}
                      </span>
                      <br />
                      <span>{grow.notes}</span>
                    </li>
                  </>
                );
              }
              return null;
            })
          )}

          {this.state.heightOpen ? heights : null}
          {this.state.weightOpen ? weights : null}
        </div>
      </>
    );
  }
}
