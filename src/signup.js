import React from "react";
import SproutContext from './SproutContext';
import AuthApiService from './auth-api-service'
import TokenService from './token-service';
import { Route, Link } from 'react-router-dom';
import WelcomePage from './welcome-page/welcome-page'


export default class SignUp extends React.Component {

  state = {
    error: null
  }

  static contextType = SproutContext;

 

  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    const { email, password } = ev.target

  AuthApiService.postLogin({
    email: email.value,
    password: password.value,
  })
    .then(res => {
      email.value = ''
      password.value = ''
      TokenService.saveAuthToken(res.authToken)
      const user = res.user
      localStorage.setItem('user email', user.email)
      localStorage.setItem('firstname', user.firstname)
      localStorage.setItem('lastname', user.lastname)

      this.props.history.push(`/account/${user.email}`);
      window.location.reload()
    })

    .catch(res => {
      console.log(res.message)
      this.setState({ error: res.error })
    })
  }

  handleNewUser = ev => {
  ev.preventDefault()
  const { firstname, lastname, email, password } = ev.target

  AuthApiService.postUser({
 
   firstname: firstname.value,
   lastname: lastname.value,
   email: email.value,
   password: password.value
    
  })
    .then(user => {
      this.setState({success: true})
      this.setState({error: false})
      localStorage.setItem('new user email', email.value)
      localStorage.setItem('new user password', password.value)
//window.location.reload()

    })
    .catch(res => {
      this.setState({ error: res.error })
    })
  }

  reset = () => {
    var form = document.getElementById("form")
    form.reset()
    localStorage.clear();
  }

   
  render() {

    return (

<div>
      <form className="modal" onSubmit={this.handleNewUser}         >
      <button className="close" onClick={this.context.go}>X</button>
 <b className="log"> Create Account</b>
          <input name="firstname" type="text" placeholder="First Name" />
          <input name="lastname" type="text" placeholder="Last Name" />
          <input name="email" type="email" placeholder="email" />
          <input name="password" type="password" placeholder="password" />

          <button className="sign-btn" type="submit">
            Submit
          </button>
         
        </form>
        
        <form id= "form" className="modal" onSubmit = {this.handleSubmitJwtAuth}>
        <b className="log"> Login</b>

        {this.state.error ? this.state.error : null}

          <input name="email" type="email" placeholder="email" />

          <input name="password" type="password" placeholder="password" />
          <button className="sign-btn" type="submit" >
            Submit
          </button>
          <button className="cancelbtn" onClick={this.reset}>Cancel</button>

        </form>
        
        </div>

     
    );
  }
}
