import React from "react";
import "./landing-page.css";
import SproutContext from "../SproutContext";
import Login from "../Login";
import AuthApiService from "../auth-api-service";
import heightChart from "./heightChart.png";
import recent from "./recent.png";
import sprouts from "./sprouts.png";
import PropTypes from "prop-types";

export default class LandingPage extends React.Component {
  state = {
    error: false,
  };
  static contextType = SproutContext;

  handleNewUser = (ev) => {
    ev.preventDefault();
    const { firstname, lastname, email, password } = ev.target;

    AuthApiService.postUser({
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      password: password.value,
    })
      .then((user) => {
        this.setState({ error: false });
        localStorage.setItem("user email", email.value);
        localStorage.setItem("firstname", firstname.value);
        localStorage.setItem("lastname", lastname.value);
        AuthApiService.postLogin({
          /* email: localStorage.getItem("new user email"),
    password:localStorage.getItem("new user password");*/
          email: email.value,
          password: password.value,
        });
        this.props.history.push(`/account/${email.value}`);
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  demo = () => {
    let email = "demouser@gmail.com";
    localStorage.setItem("user email", email);
    localStorage.setItem("firstname", "Demo");
    localStorage.setItem("lastname", "Smith");
    this.props.history.push(`/account/${email}`);
    window.location.reload();
  };

  render() {
    let background = "";
    if (this.context.modalShown) {
      background = "shown";
    } else {
      background = "closed";
    }
    return (
      <>
        <div id="modal-div">
          {this.context.modalShown === true ? (
            <Login history={this.props.history} />
          ) : null}
        </div>
        <div className={background}>
            <ul className="nav">
              <li>
                <a href="#landing-box-wrapper">Why Sprout</a>
              </li>
              <li>
                <a href="#how-to-wrapper">How It Works</a>
              </li>

              <li>
                <a href="#landing-body" onClick={this.demo}>
                  Demo
                </a>
              </li>
            </ul>

          <div className="landing-body">
            <h1 id="landing-title">
              SPROUT <br /> Keep Track of Precious Moments
            </h1>

            <form id="landing-form" onSubmit={this.handleNewUser}>
              <b className="log"> Create Account</b>
              <br />
              <br />
              <label htmlFor="firstname">First Name: </label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                placeholder="First Name"
                required
              />
              <label htmlFor="lastname">Last Name: </label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                placeholder="Last Name"
                required
              />
              <label htmlFor="email">Email: </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="email"
                required
              />
              <label htmlFor="password">Password (8 Characters): </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="password"
                required
              />
              <button
                className="sign-btn"
                type="submit"
                disabled={this.context.modalShown}
              >
                Submit
              </button>
              {this.state.error && !this.context.modalShown ? (
                <p style={{ color: "red" }}>{this.state.error}</p>
              ) : null}
              <br />
              Already Have An Account?
              <button
                className="sign-btn"
                onClick={this.context.showModal}
                disabled={this.context.modalShown}
              >
                Log In
              </button>
            </form>
          </div>

          <div id="landing-box-wrapper">
            <div className="landing-box">
              <img
                src="https://www.flaticon.com/svg/static/icons/svg/2972/2972085.svg"
                alt=""
              />
              <p style={{ fontStyle: "normal" }}>LOGGING</p>
              <br />
              <p>Have fast access to an activity log</p>
            </div>
            <div className="landing-box">
              <img
                src="https://www.flaticon.com/svg/static/icons/svg/3094/3094275.svg"
                alt=""
              />
              <p style={{ fontStyle: "normal" }}>LEARNING</p>
              <p>Remember and compare milestones to track progress</p>
            </div>
            <div className="landing-box">
              <img
                src="https://www.flaticon.com/svg/static/icons/svg/3772/3772926.svg"
                alt=""
              />
              <p style={{ fontStyle: "normal" }}>HEALTH RECORDS</p>
              <p>
                Have fast access to previous appointments and vaccinations, and
                keep track of important medications
              </p>
            </div>
          </div>

          <div id="how-to-wrapper">
            <div className="landing-how-to">
              <img src={sprouts} alt="sprout individual profiles example" />

              <p>Make Unique Profiles for Each Child</p>
            </div>
            <div className="landing-how-to">
              <p>
                Track growth progress with logging and automatically generated
                charts
              </p>
              <img src={heightChart} alt="sprout growth chart" />
            </div>
            <div className="landing-how-to">
              <img src={recent} alt="log of sprout activities example" />
              <p>Track daily activities</p>
            </div>
          </div>
        </div>
        <footer> &#169; Danielle Russell 2020 </footer>
      </>
    );
  }
}

LandingPage.propTypes = {
  history: PropTypes.object,
};
