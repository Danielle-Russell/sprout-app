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
    return (
      <>
     
     <div className={color}>

<header className="landing-header">
  <span className="heading">Sprout
  {" "}
  <FontAwesomeIcon icon={faLeaf} />
</span>
  <nav>
    
    <button className="sign-up" onClick={this.context.showModal}>Sign Up</button>
  </nav>
  </header>
  </div>


      {this.context.modalShown === true ? <SignUp history={this.props.history} /> : null}
    
     
</>
    );
  }
}
