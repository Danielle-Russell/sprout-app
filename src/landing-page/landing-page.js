import React from "react";
import './landing-page.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";




export default class LandingPage extends React.Component {
  render() {
    return (
      <>
      <header>
        <span className="heading">Sprout
        {" "}
        <FontAwesomeIcon icon={faLeaf} />
</span>
        <nav>
          
          <NavLink className="link" to = "/sign-up">Sign Up</NavLink>
        
        </nav>
        </header>

        <h1> Keep Track Of Your Little One's Most Precious Moments</h1>

        <hr />
        <div className = "wrapper">
<div className = "accounts">
  <img className="landing-img" src="https://images.unsplash.com/photo-1509924603848-aca5e5f276d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" alt="children=walking" />
</div>
        <div className = "logs">
<img className="landing-img" src="https://dollarsprout.com/wp-content/uploads/2018/07/free-baby-samples.jpg" alt="baby-sleeping" />
 </div>
        
        <div className = "milestones">
<img className="landing-img" src="https://blog.kinedu.com/wp-content/uploads/2020/06/First-Steps-Baby-1.jpg" alt="baby-walking" />      </div>
      </div>
      </>
    );
  }
}
