import React from "react";
import Avatar from "react-avatar-edit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import config from "../config";
import moment from "moment";

export default class AddSprout extends React.Component {
  constructor(props) {
    super(props);
    const src = "./example/einshtein.jpg";
    this.state = {
      preview: null,
      src,
    };
  }

  back = () => {
    this.props.history.goBack();
  };
  onCrop = (preview) => {
    this.setState({ preview });
  };

  close = () => {
    this.props.history.push("/account/1");
    window.location.reload();
  };

  goBack = () => {
    setTimeout(function () {
      window.location.reload();
    }, 1000);
    this.props.history.goBack();
  };

  addNewSprout = (sprout) => {
    fetch(`${config.API_ENDPOINT}/api/sprouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sprout),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => this.context.addSprout(responseJson))
      .then(this.goBack())
      .catch((error) => {
        this.setState({ hasError: true });
      });
  };

  handleSubmit = (e) => {
    let user = localStorage.getItem("user email");
    e.preventDefault();
    const newSprout = {
      useremail: user,
      name: e.target.name.value,
      age: e.target.dob.value,
      image: this.state.preview,
    };
    this.addNewSprout(newSprout);
  };

  validateImage = () => {
    if (this.state.preview === null) {
return "Please select an image"
    } return null
  }
  render() {
    const yearsAgo = moment().subtract(100, "years");
    const now = moment().format("YYYY-MM-DD");
    const hundredYears = yearsAgo.format("YYYY-MM-DD");

    return (
      <>
        <header className="landing-header">
          <button className="btn" onClick={this.back}>
            <FontAwesomeIcon icon={faLongArrowAltLeft} /> <p>Back to Account</p>
          </button>
        </header>
        <form className="left" onSubmit={this.handleSubmit}>
          <button className="close" onClick={this.close}>
            X
          </button>
          <h1> ADD SPROUT</h1>
          <label htmlFor="name">
            <span className="act-title">NAME</span>
          </label>
          <input id="name" type="text" placeholder="Name" required />
          <label htmlFor="dob">
            <span className="act-title">DATE OF BIRTH</span>
          </label>
          <input
            id="dob"
            type="date"
            placeholder="Birthday YYYY-MM-DD"
            min={hundredYears}
            max={now}
          />

            <span className="act-title"> Upload a profile picture</span>
            <br />
            {this.validateImage()}


          <div className="avatar">
            <Avatar
              width={200}
              height={200}
              onCrop={this.onCrop}
            />
            <img
              src={
                this.state.preview
                  ? this.state.preview
                  : "https://www.flaticon.com/svg/static/icons/svg/2919/2919600.svg"
              }
              alt="Preview"
              className="preview"
            />
          </div>
          <button disabled={this.validateImage()} className="sign-btn" type="submit">Submit</button>
        </form>
      </>
    );
  }
}
