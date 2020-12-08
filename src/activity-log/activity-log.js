import React from "react";
import "./activity-log.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faPoop } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import SproutContext from "../SproutContext";
import config from "../config";

export default class ActivityLog extends React.Component {
  state = {
    feedOpen: false,
    diaperOpen: false,
    sleepOpen: false,
    formOpen: false,
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

  addNewActivity = (activity) => {
    fetch(`${config.API_ENDPOINT}/api/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activity),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => this.context.addActivity(responseJson))
      .then(this.goBack())
      .catch((error) => {
        this.setState({ hasError: true });
      });
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const newActivity = {
      useremail: localStorage.getItem("user email"),
      sproutid: parseInt(this.props.match.params.id),
      title: e.target.title.value,
      notes: e.target.notes.value,
      date: e.target.date.value,
      time: e.target.time.value,
    };
    this.addNewActivity(newActivity);
  };

  showFeeds = () => {
    this.setState({
      feedOpen: true,
      diaperOpen: false,
      sleepOpen: false,
      formOpen: false,
    });
  };

  showDiapers = () => {
    this.setState({
      diaperOpen: true,
      feedOpen: false,
      sleepOpen: false,
      formOpen: false,
    });
  };
  showSleep = () => {
    this.setState({
      sleepOpen: true,
      diaperOpen: false,
      feedOpen: false,
      formOpen: false,
    });
  };

  goHome = () => {
    //window.location.reload()
    this.setState({
      sleepOpen: false,
      diaperOpen: false,
      feedOpen: false,
      formOpen: false,
    });
  };

  newActivity = () => {
    this.setState({
      sleepOpen: false,
      diaperOpen: false,
      feedOpen: false,
      formOpen: true,
    });
  };
  render() {
    let activities = [];
    const activityArray = () => {
      for (var key in this.context.activities) {
        activities.push(this.context.activities[key]);
      }
    };
    activityArray();

    const { id } = this.props.match.params;

    const sortedArray = activities
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .reverse();

    const feeds = sortedArray.map((act, i) => {
      if (act.title === "Feed" && act.sproutid === Number(id)) {
        return (
          <>
            <span className="date">{act.date}</span>

            <li key={i}>
              <img
                src="https://www.flaticon.com/svg/static/icons/svg/2367/2367620.svg"
                alt="dinner plate"
                width={50}
              />
              {[act.title, <br />, <span>{act.notes}</span>]}
              <span className="time">{act.time}</span>
            </li>
            <img
              style={{ margin: "5px" }}
              src="https://img.icons8.com/ultraviolet/40/000000/vertical-line.png"
            />
          </>
        );
      }
      return null;
    });

    const diapers = sortedArray.map((act, i) => {
      if (act.title === "Diaper" && act.sproutid === Number(id)) {
        return (
          <>
            <span className="date">{act.date}</span>
            <br />

            <li key={i}>
              <img
                src="https://www.flaticon.com/svg/static/icons/svg/2123/2123665.svg"
                alt="diaper"
                width={50}
              />{" "}
              {[act.title, <br />, <span>{act.notes}</span>]}
              <span className="time">{act.time}</span>
            </li>
            <img
              style={{ margin: "5px" }}
              src="https://img.icons8.com/ultraviolet/40/000000/vertical-line.png"
            />
          </>
        );
      }
      return null;
    });

    const sleep = sortedArray.map((act, i) => {
      if (act.title === "Sleep" && act.sproutid === Number(id)) {
        return (
          <>
            <span className="date">{act.date}</span>
            <li key={i}>
              <img
                src="https://www.flaticon.com/svg/static/icons/svg/3658/3658869.svg"
                alt="mobile"
                width={50}
              />{" "}
              {[act.title, <br />, <span>{act.notes}</span>]}
              <span className="time">{act.time}</span>
            </li>
            <img
              style={{ margin: "5px" }}
              src="https://img.icons8.com/ultraviolet/40/000000/vertical-line.png"
            />{" "}
          </>
        );
      }
      return null;
    });

    const combineActivities = feeds.concat(sleep, diapers);

    const allActivities = combineActivities.filter((val) => val !== null);

    const all = allActivities
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .reverse();

    return (
      <div>
        <div className="sidebar">
          <button className="btn" onClick={this.back}>
            <p>
              {" "}
              <FontAwesomeIcon
                icon={faLongArrowAltLeft}
                style={{ color: "white" }}
              />
              Back to Dashboard
            </p>
          </button>
          <button className="btn" onClick={this.goHome}>
            <FontAwesomeIcon icon={faHome} /> <p>All</p>
          </button>
          <button className="btn" onClick={this.showFeeds}>
            <FontAwesomeIcon icon={faUtensils} /> <p>Feeds</p>
          </button>
          <button className="btn" onClick={this.showDiapers}>
            <FontAwesomeIcon icon={faPoop} /> <p>Diapers</p>
          </button>
          <button className="btn" onClick={this.showSleep}>
            <FontAwesomeIcon icon={faBed} /> <p>Sleep</p>
          </button>
          <button className="btn" onClick={this.newActivity}>
            <p>New Activity</p>
          </button>
        </div>
        <div className="container">
          {this.state.formOpen ? (
            <form className="left" onSubmit={this.handleSubmit}>
              <h2>New Activity</h2>

              <label htmlFor="feed">
                <input
                  value="Feed"
                  id="feed"
                  type="radio"
                  name="title"
                  required
                />
                Feed
              </label>
              <label htmlFor="diaper">
                <input
                  value="Diaper"
                  id="diaper"
                  type="radio"
                  name="title"
                  required
                />
                Diaper Change
              </label>
              <label htmlFor="sleep">
                <input
                  value="Sleep"
                  id="sleep"
                  type="radio"
                  name="title"
                  required
                />
                Sleep
              </label>

              <input
                name="notes"
                id="notes"
                type="text"
                placeholder="Notes"
                required
              />
              <input
                name="date"
                type="date"
                required
                placeholder="Date YYYY-MM-DD"
              />
              <input
                name="time"
                type="time"
                required
                placeholder="Time HH-MM"
              />
              <input type="submit" />
            </form>
          ) : this.state.feedOpen ? (
            feeds
          ) : this.state.sleepOpen ? (
            sleep
          ) : this.state.diaperOpen ? (
            diapers
          ) : (
            all
          )}
        </div>
      </div>
    );
  }
}
