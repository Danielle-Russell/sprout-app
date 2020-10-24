import React from "react";

export default class SignUp extends React.Component {
  render() {
    return (
      <>
        <header> Sprout </header>

        <form>
          <p> Create Account </p>
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Password" />
          <input type="text" placeholder="Re-enter password" />
          <input type="submit" />
        </form>
        <form>
          <p> Already Have an Account? </p>
          <p> Log in Here </p>
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Password" />
          <input type="submit" />
        </form>
      </>
    );
  }
}
