import React from "react";
import { NavLink } from "react-router-dom";
import STORE from "../STORE";
import "./welcome-page.css";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class WelcomePage extends React.Component {
  back = () => {
    this.props.history.push("/sign-up");
  };

  render() {
    const user = STORE.user.map((us) => {
      return us.name;
    });
    return (
      <>
        <header>
          <span className="heading">
            Sprout <FontAwesomeIcon icon={faLeaf} />
          </span>
          <button className="home" onClick={this.back}>
            Sign Out
          </button>
        </header>
        <h1> {user}'s Dashboard </h1>
        <div className="sprouts">
          <ul>
            <h3>My Sprouts:</h3>
            {STORE.sprouts.map((sprout, i) => {
              return (
                <NavLink className="my-sprout" to={`/dashboard/${sprout.id}`}>
                  <li key={i} className="my-sprout">
                    {sprout.name}
                  </li>
                </NavLink>
              );
            })}
            <NavLink to="/new-sprout">
              <button className="home"> Add Sprout</button>
            </NavLink>
          </ul>
        </div>
      </>
    );
  }
}
