import React from "react";
import './landing-page.css';
import { NavLink } from 'react-router-dom';


export default class LandingPage extends React.Component {
  render() {
    return (
      <>
      <header>
        Sprout
        <nav>
          
          <NavLink className="link" to = "/sign-up">Sign Up</NavLink>
          <NavLink className="link" to = "/">Demo</NavLink>
        
        </nav>
        </header>

        <h1> Keep Track Of Your Little One's Most Precious Moments</h1>

        <hr />
        <div className = "wrapper">
<div className = "accounts">
  Keep separate and personal accounts for each of your children 
</div>
        <div className = "logs">
          Keep a daily log of your child's activity, such as feedings, diaper changes, and new foods 
        </div>
        
        <div className = "milestones">
          Record milestones to look back on later
        </div>
      </div>
      </>
    );
  }
}
