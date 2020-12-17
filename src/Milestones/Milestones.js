import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import config from "../config";
import SproutContext from "../SproutContext";

export default class Milestones extends React.Component {
  state = {
    file: null,
    showMilestones: true,
    showLog: false,
  };

  static contextType = SproutContext;

  back = () => {
    this.props.history.push(`/dashboard/${this.props.match.params.id}`);
  };

  goBack = () => {
    setTimeout(function () {
      window.location.reload();
    }, 1000);
    this.setState({
      formOpen: false,
    });
  };

  addNewMilestone = (mile) => {
    fetch(`${config.API_ENDPOINT}/api/milestones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mile),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => this.context.addMilestone(responseJson))
      .then(this.goBack())
      .catch((error) => {
        console.log(error.message);
        this.setState({ hasError: true });
      });
  };

  handleChange = (e) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({ file: reader.result });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const newMilestone = {
      useremail: localStorage.getItem("user email"),
      sproutid: parseInt(this.props.match.params.id),
      title: e.target.title.value,
      notes: e.target.notes.value,
      date: e.target.date.value,
      image: this.state.file,
    };
    this.addNewMilestone(newMilestone);
  };

  showForm = () => {
    this.setState({
      showLog: true,
      showMilestones: false,
    });
  };

  showMilestones = () => {
    this.setState({
      showLog: false,
      showMilestones: true,
    });
  };
  render() {
    let sprouts = [];
    const sproutArray = () => {
      for (var key in this.context.sprouts) {
        if (key.length) {
          sprouts.push(this.context.sprouts[key]);
        }
      }
    };
    sproutArray();
    let milestones = [];
    const milestoneArray = () => {
      for (var key in this.context.milestones) {
        milestones.push(this.context.milestones[key]);
      }
    };
    milestoneArray();

    const sortedArray = milestones
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .reverse();
    const specSprout = sortedArray.filter(
      (spr) => Number(this.props.match.params.id) === spr.sproutid
    );
    const sproutName = sprouts.map((spr) => {
      if (spr.id === Number(this.props.match.params.id)) {
        return (
          <div key={spr.id}>
            <img className="profile-pic" src={spr.image} alt="personal" />
            <p>{spr.name}</p>
          </div>
        );
      }
      return null;
    });
    return (
      <>
        <header>{sproutName}</header>

        <div className="sidebar">
          <button className="btn" onClick={this.back}>
            <p>
              <FontAwesomeIcon icon={faLongArrowAltLeft} /> Back to Dashboard
            </p>
          </button>
          <button className="btn" onClick={this.showMilestones}>
            <p>Milestone Gallery</p>
          </button>
          <button className="btn" onClick={this.showForm}>
            <p>New Milestone</p>
          </button>
        </div>
        <h1>MILESTONES</h1>
        {this.state.showMilestones ? (
          specSprout.map((spr) => {
            return (
              <div key={spr.id} className="gallery">
                <img src={spr.image} alt={spr.id} />
                <div className="desc">
                  <b>{spr.date}</b> <br /> {spr.notes}
                </div>
              </div>
            );
          })
        ) : (
          <form className="left" onSubmit={this.handleSubmit}>
            <h2>New Milestone</h2>
            <label htmlFor="title">
              <span className="act-title">TITLE</span>
            </label>

            <input id="title" type="text" placeholder="Name" required />
            <label htmlFor="notes">
              <span className="act-title">NOTES</span>
            </label>

            <input id="notes" type="text" placeholder="Notes" required />
            <label htmlFor="date">
              <span className="act-title">DATE</span>
            </label>

            <input
              id="date"
              type="date"
              required
              placeholder="Date YYYY-MM-DD"
            />
            <label htmlFor="image">
              <span className="act-title">UPLOAD IMAGE</span>
            </label>

            <input id="image" type="file" onChange={this.handleChange} />

            <input className="sign-btn" type="submit" value="Submit" />
          </form>
        )}
      </>
    );
  }
}
