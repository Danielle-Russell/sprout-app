import React from "react";
import { NavLink } from "react-router-dom";
import SproutContext from '../SproutContext'
import "./welcome-page.css";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthApiService from '../auth-api-service'
export default class WelcomePage extends React.Component {

  static contextType = SproutContext;

  back = () => {
    this.props.history.push("/");
    localStorage.clear();
    window.location.reload();
  };

 deleteUser = () => {

  AuthApiService.deleteUser({
    
    email: localStorage.getItem('user email'),
 
  })

    .catch(res => {
      console.log(res.message)
      this.setState({ error: res.error })
    })
  }

  render() {
    let sprouts = []
   const sprouts2 = () => {

      for (var key in this.context.sprouts) {
        if(key.length) {
        sprouts.push(this.context.sprouts[key])

    } 
  }
      }

      sprouts2()

      
        return (
      <>
        <header className="landing-header">
          <div className="right-header">{localStorage.getItem('firstname')} <FontAwesomeIcon icon={faUserCircle} />
          <button className="submit" onClick={this.back}>
            Sign Out
          </button>
          </div>

        </header>
        <div className="sprouts">
          <div className="sprouts-left">
            <h2>MY SPROUTS</h2>
           {sprouts.length > 4 ? null : <p style={{color: "black"}}>Get started by adding your first profile</p>}
              {sprouts.map( (sprout, index) => {
                if (sprout.name) {
              return <NavLink key={index} className="my-sprout" to={`/dashboard/${sprout.id}`}>
                  <li key={sprout.id}>
                  <img className="profile-pic" src={sprout.image} alt="personal" /> {sprout.name}
                  </li>
                </NavLink>
            }return null})}
            <NavLink to="/new-sprout">
              <button className="sign-btn"> Add Sprout</button>
            </NavLink>
          </div>
         <div className='account-info'>
           <h2>ACCOUNT INFORMATION</h2>
           <form className="delete" onSubmit={this.deleteUser}>
             First Name
             <input type="text" value={localStorage.getItem('firstname')} readOnly></input>
             Last Name
             <input type="text" value={localStorage.getItem('lastname')} readOnly></input>
Email
             <input type="text" value={localStorage.getItem('user email')} readOnly></input>
<button style={{backgroundColor: "red"}}onClick={this.back} className="sign-btn"> DELETE ACCOUNT</button>
           </form>
         </div>
         </div>
      </>
    );
  }
}
