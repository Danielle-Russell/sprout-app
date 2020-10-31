import React from "react";
import "./health.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClinicMedical } from "@fortawesome/free-solid-svg-icons";
import { faSyringe } from "@fortawesome/free-solid-svg-icons";
import { faPrescriptionBottle } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import STORE from "../STORE";

export default class Health extends React.Component {
  state = {
    aptOpen: false,
    vacOpen: false,
    medOpen: false,
  };

  back = () => {
    this.props.history.goBack();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newHealth = {
      sproutId: parseInt(this.props.match.params.id),
      title: e.target.title.value,
      notes: e.target.notes.value,
      date: e.target.date.value,
      time: e.target.time.value,
    };
    STORE.health.push(newHealth);
    this.props.history.goBack();
  };

  apt = () => {
    this.setState({
      aptOpen: true,
      vacOpen: false,
      medOpen: false,
    });
  };
  vac = () => {
    this.setState({
      aptOpen: false,
      vacOpen: true,
      medOpen: false,
    });
  };
  med = () => {
    this.setState({
      aptOpen: false,
      vacOpen: false,
      medOpen: true,
    });
  };

  goHome = () => {
    this.setState({
      aptOpen: false,
      vacOpen: false,
      medOpen: false,
    });
  };

  render() {
    const { id } = this.props.match.params;

    const sortedArray = STORE.health
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .reverse();

    const apt = STORE.health.map((apt, index) => {
      if (apt.title === "Appointment" && apt.sproutId === Number(id)) {
        return (
          <>
            <span className="date">{apt.date}</span>
            <br />
            <span className="time">{apt.time}</span>{" "}
            <li key={index}>
              <FontAwesomeIcon icon={faClinicMedical} />{" "}
              {[apt.title, " ", <br />, <span>{apt.notes}</span>]}
            </li>
          </>
        );
      }
      return null;
    });

    const vac = STORE.health.map((apt, index) => {
      if (apt.title === "Vaccination" && apt.sproutId === Number(id)) {
        return (
          <>
            <span className="date">{apt.date}</span>
            <br />
            <span className="time">{apt.time}</span>{" "}
            <li key={index}>
              <FontAwesomeIcon icon={faSyringe} />{" "}
              {[apt.title, " ", <br />, <span>{apt.notes}</span>]}
            </li>
          </>
        );
      }
      return null;
    });

    const med = STORE.health.map((apt, index) => {
      if (apt.title === "Medication" && apt.sproutId === Number(id)) {
        return (
          <>
            <span className="date">{apt.date}</span>
            <br />
            <span className="time">{apt.time}</span>
            <li key={index}>
              <FontAwesomeIcon icon={faPrescriptionBottle} />{" "}
              {[apt.title, " ", <br />, <span>{apt.notes}</span>]}
            </li>
          </>
        );
      }
      return null;
    });

    return (
      <>
        <header>
          <span className="heading">
            Sprout <FontAwesomeIcon icon={faLeaf} />
          </span>
          <button className="home" onClick={this.back}>
            <FontAwesomeIcon icon={faHome} />
          </button>
        </header>

        <h1>Health Records</h1>

        <div className="buttons">
          <button onClick={this.goHome}>
            <FontAwesomeIcon icon={faHome} />
          </button>
          <button onClick={this.apt}>
            <FontAwesomeIcon icon={faClinicMedical} />
          </button>
          <button onClick={this.vac}>
            <FontAwesomeIcon icon={faSyringe} />
          </button>
          <button onClick={this.med}>
            <FontAwesomeIcon icon={faPrescriptionBottle} />
          </button>
        </div>

        <ul>
          {sortedArray.map((apt, index) => {
            let medical;
            if (apt.title === "Appointment") {
              medical = <FontAwesomeIcon icon={faClinicMedical} />;
            } else if (apt.title === "Vaccination") {
              medical = <FontAwesomeIcon icon={faSyringe} />;
            } else if (apt.title === "Medication") {
              medical = <FontAwesomeIcon icon={faPrescriptionBottle} />;
            }
            if (
              Number(id) === apt.sproutId &&
              !this.state.aptOpen &&
              !this.state.vacOpen &&
              !this.state.medOpen
            ) {
              return (
                <>
                  <span className="date">{apt.date}</span>
                  <br />
                  <span className="time">{apt.time}</span>
                  <li key={index}>
                    {medical}{" "}
                    {[apt.title, " ", <br />, <span>{apt.notes}</span>]}
                  </li>
                </>
              );
            }
            return null;
          })}

          {this.state.aptOpen ? apt : null}
          {this.state.vacOpen ? vac : null}
          {this.state.medOpen ? med : null}
        </ul>

        <form onSubmit={this.handleSubmit}>
          <h2> New Record </h2>
          <label htmlFor="apt">
            <input value="Appointment" id="apt" type="radio" name="title" />
            Appointment
          </label>
          <label htmlFor="Vaccination">
            <input
              value="Vaccination"
              id="Vaccination"
              type="radio"
              name="title"
            />
            Vaccination
          </label>
          <label htmlFor="Medication">
            <input
              value="Medication"
              id="Medication"
              type="radio"
              name="title"
            />
            Medication
          </label>
          <input name="notes" id="notes" type="text" placeholder="Notes" />
          <input name="date" type="date" />
          <input name="time" type="time" />

          <input className="submit" type="submit" />
        </form>
      </>
    );
  }
}
