import React from "react";
import "./landing-page.css";
import SproutContext from "../SproutContext";
import SignUp from "../signup";
import AuthApiService from "../auth-api-service";
import placeholder from "./placeholder.png";

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
        localStorage.setItem('user email', email.value)
      localStorage.setItem('firstname', firstname.value)
      localStorage.setItem('lastname', lastname.value)
  AuthApiService.postLogin({
   /* email: localStorage.getItem("new user email"),
    password:localStorage.getItem("new user password");*/
    email: email.value,
    password: password.value

  })
  this.props.history.push(`/account/${email.value}`)
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  reset = () => {
    var form = document.getElementById("form");
    form.reset();
    localStorage.clear();
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
          <SignUp history={this.props.history} />
        ) : null}
        </div>
        <div className={background}>

        <div className="landing-body">
       
        
          <header style={{ backgroundColor: "inherit" }}></header>
         
          <div className="wrapper">
            <h1 id="landing-title">Keep Track of the Most Precious Moments</h1>
            
            <form id="landing-form" onSubmit={this.handleNewUser}>
              <b className="log"> Create Account</b>
              <input name="firstname" type="text" placeholder="First Name" />
              <input name="lastname" type="text" placeholder="Last Name" />
              <input name="email" type="email" placeholder="email" />
              <input name="password" type="password" placeholder="password" />
              <button className="sign-btn" type="submit">
                Submit
              </button>
             
              {this.state.error && !this.context.modalShown ? (
                <p style={{ color: "red" }}>{this.state.error}</p>
              ) : null}
               
              <br />
              Already Have An Account?
              <button className="sign-btn" onClick={this.context.showModal}>
                Log In
              </button>
            </form>
  
          </div>
        </div>


        <div id="landing-box-wrapper">
          <div className="landing-box">
            <img src="https://www.flaticon.com/svg/static/icons/svg/2972/2972085.svg" />
            <b>Tracking</b>
            <p style={{ color: "black" }}>
              Keep daily logs of your child's activities. Sprout will
              automatically chart your activities and show you the ratio of time
              spent{" "}
            </p>
          </div>
          <div className="landing-box">
            <img src="https://www.flaticon.com/svg/static/icons/svg/3094/3094275.svg" />
            <b>Achieving</b>
            <p style={{ color: "black" }}>
              Record your child's milestones. Include a photo to view an image
              gallery of these precious memories.{" "}
            </p>
          </div>
          <div className="landing-box">
            <img src="https://www.flaticon.com/svg/static/icons/svg/3772/3772926.svg" />
            <b>Logging</b>
            <p style={{ color: "black" }}>
              Never lose track of appointment summaries and vaccination
              schedules again. Sprout will provide quick access to date and
              notes.{" "}
            </p>
          </div>
        </div>
        <div id="how-to-wrapper">
          <div className="landing-how-to">
            <img src={placeholder} alt="placeholder" />
            Track your child's growth progress with logging and automatically
            generated charts.
          </div>
          <div className="landing-how-to">
            Keep individual profiles for multiple children
            <img src={placeholder} alt="placeholder" />
          </div>
          <div className="landing-how-to">
            <img src={placeholder} alt="placeholder" />
            Look back on your gallery of milestones throughout your child's
            life. Upload a photo for each milestone to remember
          </div>
        </div>
      </div>
      </>
    );
  }
}
