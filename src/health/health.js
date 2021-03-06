import React from "react";
import "./health.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClinicMedical } from "@fortawesome/free-solid-svg-icons";
import { faSyringe } from "@fortawesome/free-solid-svg-icons";
import { faPrescriptionBottle } from "@fortawesome/free-solid-svg-icons";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import SproutContext from "../SproutContext";
import config from "../config";
import PropTypes from "prop-types";

export default class Health extends React.Component {
  state = {
    aptOpen: false,
    vacOpen: false,
    medOpen: false,
    formOpen: false,
  };

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

  addNewHealth = (health) => {
    fetch(`${config.API_ENDPOINT}/api/health`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(health),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => this.context.addHealth(responseJson))
      .then(this.goBack())
      .catch((error) => {
        this.setState({ hasError: true });
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const newHealth = {
      useremail: localStorage.getItem("user email"),
      sproutid: parseInt(this.props.match.params.id),
      title: e.target.title.value,
      notes: e.target.notes.value,
      date: e.target.date.value,
      time: e.target.time.value,
    };
    this.addNewHealth(newHealth);
  };

  apt = () => {
    this.setState({
      aptOpen: true,
      vacOpen: false,
      medOpen: false,
      formOpen: false,
    });
  };
  vac = () => {
    this.setState({
      aptOpen: false,
      vacOpen: true,
      medOpen: false,
      formOpen: false,
    });
  };
  med = () => {
    this.setState({
      aptOpen: false,
      vacOpen: false,
      medOpen: true,
      formOpen: false,
    });
  };

  goHome = () => {
    this.setState({
      aptOpen: false,
      vacOpen: false,
      medOpen: false,
      formOpen: false,
    });
  };

  newHealth = () => {
    this.setState({
      aptOpen: false,
      vacOpen: false,
      medOpen: false,
      formOpen: true,
    });
  };
  static contextType = SproutContext;

  render() {
    let health = [];
    const healthArray = () => {
      for (var key in this.context.health) {
        health.push(this.context.health[key]);
      }
    };
    healthArray();

    const sortedArray = health
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .reverse();

    const apt = sortedArray.map((apt, index, key) => {
      if (
        apt.title === "Appointment" &&
        apt.sproutid === Number(this.props.match.params.id)
      ) {
        return (
          <div key={apt.id} className="height">
            <span className="date">{apt.date}</span>

            <li>
              <img
                src="https://www.flaticon.com/svg/static/icons/svg/619/619051.svg"
                alt="hospital"
                width={50}
              />
              <br />
              <span className="act-title">APPOINTMENT</span>
              <br />
              {apt.notes}
              <br />
              <span>{apt.time}</span>
            </li>
          </div>
        );
      }
      return null;
    });

    const vac = sortedArray.map((apt, index, key) => {
      if (
        apt.title === "Vaccination" &&
        apt.sproutid === Number(this.props.match.params.id)
      ) {
        return (
          <div key={apt.id} className="height">
            <span className="date">{apt.date}</span>

            <li>
              <img
                src="https://www.flaticon.com/svg/static/icons/svg/3027/3027579.svg"
                alt="syringe"
                width={50}
              />
              <br />
              <span className="act-title">VACCINATION</span>
              <br />
              {apt.notes}
              <br />
              <span>{apt.time}</span>
            </li>
          </div>
        );
      }
      return null;
    });

    const med = sortedArray.map((apt, index) => {
      if (
        apt.title === "Medication" &&
        apt.sproutid === Number(this.props.match.params.id)
      ) {
        return (
          <div key={apt.id} className="height">
            <span className="date">{apt.date}</span>

            <li>
              <img
                src="https://www.flaticon.com/svg/static/icons/svg/1546/1546140.svg"
                alt="medications"
                width={50}
              />
              <br />
              <span className="act-title">MEDICATION</span>
              <br />
              {apt.notes}
              <br />
              <span>{apt.time}</span>
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
              <FontAwesomeIcon icon={faLongArrowAltLeft} /> Back to dashboard
            </p>
          </button>

          <button className="btn" onClick={this.apt}>
            <FontAwesomeIcon icon={faClinicMedical} /> <p>Appoinments</p>
          </button>
          <button className="btn" onClick={this.vac}>
            <FontAwesomeIcon icon={faSyringe} />
            <p>Vaccinations</p>
          </button>
          <button className="btn" onClick={this.med}>
            <FontAwesomeIcon icon={faPrescriptionBottle} /> <p>Medications</p>
          </button>
          <button className="btn" onClick={this.newHealth}>
            <p>New Record</p>
          </button>
        </div>
        <main className="height">
          <h1>HEALTH</h1>
          {this.state.formOpen ? (
            <form className="default-form" onSubmit={this.handleSubmit}>
              <h2> New Record </h2>

              <fieldset>
                <legend>
                  <span className="act-title">TYPE</span>
                </legend>
                <label htmlFor="apt">
                  <input
                    value="Appointment"
                    id="apt"
                    type="radio"
                    name="title"
                    required
                  />
                  Appointment
                </label>
                <label htmlFor="Vaccination">
                  <input
                    value="Vaccination"
                    id="Vaccination"
                    type="radio"
                    name="title"
                    required
                  />
                  Vaccination
                </label>
                <label htmlFor="Medication">
                  <input
                    value="Medication"
                    id="Medication"
                    type="radio"
                    name="title"
                    required
                  />
                  Medication
                </label>
              </fieldset>
              <label htmlFor="notes">
                <span className="act-title">NOTES</span>
              </label>
              <input id="notes" type="text" placeholder="Notes" required />
              <label htmlFor="date">
                <span className="act-title">DATE</span>
              </label>

              <input
                id="date"
                type="date"
                required
                placeholder="Date YYYY-MM-DD"
              />
              <label htmlFor="time">
                <span className="act-title">TIME</span>
              </label>

              <input id="time" type="time" required placeholder="Time HH-mm" />

              <input className="sign-btn" type="submit" value="Submit" />
            </form>
          ) : this.state.aptOpen ? (
            apt
          ) : this.state.vacOpen ? (
            vac
          ) : this.state.medOpen ? (
            med
          ) : (
            [apt, vac, med]
          )}
        </main>
      </>
    );
  }
}

Health.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};
