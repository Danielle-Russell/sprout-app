import React from "react";
import "./activity-log.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faPoop } from "@fortawesome/free-solid-svg-icons";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";


import STORE from "../STORE";

export default class ActivityLog extends React.Component {
  state = {
    feedOpen: false,
    diaperOpen: false,
    sleepOpen: false,
  };
  back = () => {
    this.props.history.goBack();
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const newActivity = {
      sproutId: parseInt(this.props.match.params.id),
      title: e.target.title.value,
      notes: e.target.notes.value,
      date: e.target.date.value,
      time: e.target.time.value,
    };
    STORE.activities.push(newActivity);
    this.props.history.goBack();
  };

  showFeeds = () => {
    this.setState({
      feedOpen: true,
      diaperOpen: false,
      sleepOpen: false,
    });
  };

  showDiapers = () => {
    this.setState({
      diaperOpen: true,
      feedOpen: false,
      sleepOpen: false,
    });
  };
  showSleep = () => {
    this.setState({
      sleepOpen: true,
      diaperOpen: false,
      feedOpen: false,
    });
  };

  goHome = () => {
    this.setState({
      sleepOpen: false,
      diaperOpen: false,
      feedOpen: false,
    });
  };
  render() {
    const { id } = this.props.match.params;

    const feeds = STORE.activities.map((act, i) => {
      if (act.title === "Feed" && act.sproutId === Number(id)) {
        return (
          <>
             <span className="date">
                  
                  {act.date} 
                  </span>
                  <br />
                  <span className="time">
                    {act.time}
                </span>
    
            <li key={i}>
              <FontAwesomeIcon icon={faUtensils} />{" "}
              {[act.title, <br />, <span>{act.notes}</span>]}
            </li>
          </>
        );
      }
      return null;
    });

    const diapers = STORE.activities.map((act, i) => {
      if (act.title === "Diaper" && act.sproutId === Number(id)) {
        return (
          <>
        <span className="date">
                  
                  {act.date} 
                  </span>
                  <br />
                  <span className="time">
                    {act.time}
                </span>
    

            <li key={i}>
              <FontAwesomeIcon icon={faPoop} />{" "}
              {[act.title, <br />, <span>{act.notes}</span>]}
            </li>
          </>
        );
      }
      return null;
    });

    const sleep = STORE.activities.map((act, i) => {
      if (act.title === "Sleep" && act.sproutId === Number(id)) {
        return (
          <>
             <span className="date">
                  
                  {act.date} 
                  </span>
                  <br />
                  <span className="time">
                    {act.time}
                </span>
    

            <li key={i}>
              <FontAwesomeIcon icon={faBed} />{" "}
              {[act.title, <br />, <span>{act.notes}</span>]}
            </li>
          </>
        );
      }
      return null;
    });

    const sortedArray = STORE.activities
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .reverse();

    return (
      <>
        <header>
          <span className="heading">
            {" "}
            Sprout <FontAwesomeIcon icon={faLeaf} />
          </span>
          <button className="back" onClick={this.back}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </header>

        <h1> Activity Log</h1>

        <div className="buttons">
        <button onClick={this.goHome}>
            <FontAwesomeIcon icon={faHome} />
          </button>
          <button onClick={this.showFeeds}>
            <FontAwesomeIcon icon={faUtensils} />
          </button>
          <button onClick={this.showDiapers}>
            <FontAwesomeIcon icon={faPoop} />
          </button>
          <button onClick={this.showSleep}>
            <FontAwesomeIcon icon={faBed} />
          </button>
        </div>

        <ul>
          {sortedArray.map((activity, index) => {
            let element;
            if (activity.title === "Sleep") {
              element = <FontAwesomeIcon icon={faBed} />;
            } else if (activity.title === "Feed") {
              element = <FontAwesomeIcon icon={faUtensils} />;
            } else if (activity.title === "Diaper") {
              element = <FontAwesomeIcon icon={faPoop} />;
            }
            if (
              Number(id) === activity.sproutId &&
              !this.state.feedOpen &&
              !this.state.diaperOpen &&
              !this.state.sleepOpen
            ) {
              return (
                <>
                <span className="date">
                  
              {activity.date} 
              </span>
              <br />
              <span className="time">
                {activity.time}
            </span>


                  <li key={index}>
                    {element}{" "}
                    {[activity.title, <br />, <span>{activity.notes}</span>]}
                  </li>
                </>
              );
            }
            return null;
          })}

          {this.state.diaperOpen ? diapers : null}
          {this.state.feedOpen ? feeds : null}
          {this.state.sleepOpen ? sleep : null}
        </ul>

        <form onSubmit={this.handleSubmit}>
          <h2>New Activity</h2>
          <label htmlFor="feed">
            <input value="Feed" id="feed" type="radio" name="title" />
            Feed
          </label>
          <label htmlFor="diaper">
            <input value="Diaper" id="diaper" type="radio" name="title" />
            Diaper Change
          </label>
          <label htmlFor="sleep">
            <input value="Sleep" id="sleep" type="radio" name="title" />
            Sleep
          </label>
          <input name="notes" id="notes" type="text" placeholder="Notes" />
          <input name="date" type="date" />
          <input name="time" type="time" />
          <input className="submit" type="submit" />
        </form>
      </>
    );
  }
}
