import React from "react";
import './landing-page.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import SproutContext from '../SproutContext';
import SignUp from '../signup';




export default class LandingPage extends React.Component {

  static contextType = SproutContext

  render() {
    let color = ""

    const background = () => {
      if (this.context.modalShown) {
        color= "open"
      } else {
        color = "closed"
      } return color
    }
    background()
    console.log(this.props)
    return (
      <>
      <div className={color}>
      <header className="landing-header">
        <span className="heading">Sprout
        {" "}
        <FontAwesomeIcon icon={faLeaf} />
</span>
        <nav>
          
          <button onClick={this.context.showModal}>Sign Up</button>
          <NavLink className="link" to = "/sign-up">Sign In</NavLink>
          <NavLink className="link2" to = "/sign-up">Demo</NavLink>
        </nav>
        </header>
<div className="landing-container">
        <h1 className="landing-title"> SPROUT</h1>
        <h2>A Baby Tracking App For Busy Moms</h2>
        <hr />
</div>
      </div>
      {this.context.modalShown === true ? <SignUp history={this.props.history} /> : null}
</>
    );
  }
}
