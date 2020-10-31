import React from "react";
import STORE from "./STORE";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

export default class SignUp extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: e.target.name.value,
    };
    STORE.user.push(newUser);
    this.props.history.push(`/account/${newUser.id}`);
  };

  render() {
    return (
      <>
        <header>
          <span className="heading">
            Sprout <FontAwesomeIcon icon={faLeaf} />
          </span>
        </header>

        <form onSubmit={this.handleSubmit}>
          <p> Create Account:</p>
          <input name="name" type="text" placeholder="Username" />
          <button className="submit" type="submit" onClick={this.back}>
            Submit
          </button>
        </form>
      </>
    );
  }
}
