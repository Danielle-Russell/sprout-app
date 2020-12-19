import React from "react";
import { NavLink } from "react-router-dom";
import SproutContext from "../SproutContext";
import "./welcome-page.css";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthApiService from "../auth-api-service";
import PropTypes from "prop-types";

export default class WelcomePage extends React.Component {
  static contextType = SproutContext;

  back = () => {
    this.props.history.push("/");
    localStorage.clear();
    window.location.reload();
  };

  deleteUser = () => {
    AuthApiService.deleteUser({
      email: localStorage.getItem("user email"),
    }).catch((res) => {
      console.log(res.message);
      this.setState({ error: res.error });
    });
  };

  render() {
    let sprouts = [];
    const sprouts2 = () => {
      for (var key in this.context.sprouts) {
        if (key.length) {
          sprouts.push(this.context.sprouts[key]);
        }
      }
    };

    sprouts2();

    return (
      <>
        <header className="landing-header">
          <div className="right-header">
            <FontAwesomeIcon icon={faUserCircle} />
            <p>{localStorage.getItem("firstname")}</p>

            <button className="submit" onClick={this.back}>
              Sign Out
            </button>
          </div>
        </header>
        <div className="sprouts">
          <div className="sprouts-left">
            <h1>MY SPROUTS</h1>
            <br />
            {sprouts.length > 4 ? null : (
              <p style={{ color: "black" }}>
                Get started by adding your first profile
              </p>
            )}
            {sprouts.map((sprout, index) => {
              if (sprout.name) {
                return (
                  <NavLink
                    key={index}
                    className="my-sprout"
                    to={`/dashboard/${sprout.id}`}
                  >
                    <li key={sprout.id}>
                      <img
                        className="profile-pic"
                        src={sprout.image}
                        alt={sprout.id}
                      />
                      {sprout.name}
                    </li>
                  </NavLink>
                );
              }
              return null;
            })}
            <NavLink to="/new-sprout">
              <button className="sign-btn"> Add Sprout</button>
            </NavLink>
          </div>

          <div className="sprouts-right">
            <h1>ACCOUNT INFORMATION</h1>
            <br />
            <form className="delete" onSubmit={this.deleteUser}>
              <label htmlFor="first-name">First Name</label>
              <input
                id="first-name"
                type="text"
                defaultValue={localStorage.getItem("firstname")}
                readOnly
              ></input>
              <label htmlFor="last-name">Last Name</label>
              <input
                id="last-name"
                type="text"
                defaultValue={localStorage.getItem("lastname")}
                readOnly
              ></input>
              <label htmlFor="delete-email">Email</label>

              <input
                id="delete-email"
                type="text"
                defaultValue={localStorage.getItem("user email")}
                readOnly
              ></input>
              <button
                style={{ backgroundColor: "red" }}
                onClick={this.back}
                className="sign-btn"
              >
                DELETE ACCOUNT
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

WelcomePage.propTypes = {
  history: PropTypes.object,
};
