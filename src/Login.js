import React from "react";
import SproutContext from "./SproutContext";
import AuthApiService from "./auth-api-service";
import TokenService from "./token-service";
import PropTypes from 'prop-types'

export default class Login extends React.Component {
  state = {
    error: null,
  };

  static contextType = SproutContext;

  handleSubmitJwtAuth = (ev) => {
    ev.preventDefault();
    const { email, password } = ev.target;

    AuthApiService.postLogin({
      email: email.value,
      password: password.value,
    })
      .then((res) => {
        email.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        const user = res.user;
        localStorage.setItem("user email", user.email);
        localStorage.setItem("firstname", user.firstname);
        localStorage.setItem("lastname", user.lastname);

        this.props.history.push(`/account/${user.email}`);
        window.location.reload();
      })

      .catch((res) => {
        console.log(res.message);
        this.setState({ error: res.error });
      });
  };

  render() {
    return (
      <div>
        <form
          id="login-form"
          className="modal"
          onSubmit={this.handleSubmitJwtAuth}
        >
          <button type="button" className="close" onClick={this.context.closeModal}>
            X
          </button>

          <b className="log"> Login</b>

          {this.state.error ? this.state.error : null}
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            name="email"
            type="email"
            placeholder="email"
            required
          />
          <label htmlFor="login-password">Password</label>

          <input
            id="login-password"
            name="password"
            type="password"
            placeholder="password"
            required
          />
          <input className="sign-btn" type="submit" value="Submit" />
          
          <button type="button" className="cancelbtn" onClick={this.context.closeModal}>
            Cancel
          </button>
          
        </form>
       
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
}
