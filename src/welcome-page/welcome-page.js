import React from "react";
import { NavLink } from "react-router-dom";
import SproutContext from '../SproutContext'
import "./welcome-page.css";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthApiService from '../auth-api-service'
export default class WelcomePage extends React.Component {

  static contextType = SproutContext;

  back = () => {
    this.props.history.push("/");
    localStorage.clear();
  };

 deleteUser = () => {

  AuthApiService.deleteUser({
    
    email: localStorage.getItem('user email'),
 
  })
    .then(res => {
      const user = res.user
    })

    .catch(res => {
      console.log(res.message)
      this.setState({ error: res.error })
    })
  }

  render() {
    let sprouts = []
   const thing = () => {

      for (var key in this.context.sprouts) {
        if(key.length) {
        sprouts.push(this.context.sprouts[key])

    } 
  }
      }

      thing()

      
        return (
      <>
        <header className="landing-header">
          <span className="heading">
            Sprout <FontAwesomeIcon icon={faLeaf} />
          </span>
          <div className="right-header">{localStorage.getItem('firstname')}<FontAwesomeIcon icon={faUserCircle} />
          <button className="submit" onClick={this.back}>
            Sign Out
          </button>
          </div>

        </header>
        <div className="sprouts">
          <div className="sprouts-left">
            <h2>MY SPROUTS</h2>
           {sprouts.length > 4 ? null : <p style={{color: "black"}}>Get started by adding your first profile</p>}
              {sprouts.map( sprout => {
                if (sprout.name) {
              return <NavLink className="my-sprout" to={`/dashboard/${sprout.id}`}>
                  <li key={sprout.id} className="my-sprout">
                  <img className="profile-pic" src={sprout.image} /> {sprout.name} 
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
             <input type="text" value={localStorage.getItem('firstname')}></input>
             Last Name
             <input type="text" value={localStorage.getItem('lastname')}></input>
Email
             <input type="text" value={localStorage.getItem('user email')}></input>
<button style={{backgroundColor: "red"}}onClick={this.back} className="submit"> DELETE ACCOUNT</button>
           </form>
         </div>
         </div>
      </>
    );
  }
}
