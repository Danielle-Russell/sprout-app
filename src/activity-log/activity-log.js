import React from "react";
import "./activity-log.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faPoop } from "@fortawesome/free-solid-svg-icons";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import SproutContext from '../SproutContext';
import config from '../config';

export default class ActivityLog extends React.Component {
  state = {
    feedOpen: false,
    diaperOpen: false,
    sleepOpen: false,
  };

  static contextType = SproutContext;

  back = () => {
    this.props.history.goBack();
  };

  addNewActivity = activity => {

    fetch(`${config.API_ENDPOINT}/api/activities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activity),
    })
      .then(response => {
        return response.json()
      })
      .then(responseJson => this.context.addActivity(responseJson))
      .catch((error) => {
        this.setState({hasError: true})
      });
  }
  handleSubmit = (e) => {
    e.preventDefault();

    const newActivity = {
      useremail: localStorage.getItem('user email'),
      sproutid: parseInt(this.props.match.params.id),
      title: e.target.title.value,
      notes: e.target.notes.value,
      date: e.target.date.value,
      time: e.target.time.value,
    };
this.addNewActivity(newActivity)
    window.location.reload()

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

    let activities = []
    const activityArray = () => {
     for (var key in this.context.activities) {
       activities.push(this.context.activities[key])
 }
     }
activityArray()

   const { id } = this.props.match.params;

    const feeds = activities.map((act, i) => {
      if (act.title === "Feed" && act.sproutid === Number(id)) {
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

    const diapers = activities.map((act, i) => {
      if (act.title === "Diaper" && act.sproutid === Number(id)) {
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

    const sleep = activities.map((act, i) => {
      if (act.title === "Sleep" && act.sproutid === Number(id)) {
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

    const sortedArray = activities
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .reverse();
    return (
      <div>
        <header className="landing-header">
          <span className="heading">
            {" "}
            Sprout <FontAwesomeIcon icon={faLeaf} />
          </span>
          <button className="back" onClick={this.back}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </header>

<div className="wrapper2">
        <form className="left" onSubmit={this.handleSubmit}>
          <h2>New Activity</h2>
          <div className="inputs">
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
          </div>

          <input name="notes" id="notes" type="text" placeholder="Notes" />
          <input name="date" type="date" />
          <input name="time" type="time" />
          <input className="submit" type="submit" />
        </form>
        

        <ul className="right">
        <div className="buttons">
        <button className="btn" onClick={this.goHome}>
            <FontAwesomeIcon icon={faHome} />
          </button>
          <button className="btn" onClick={this.showFeeds}>
            <FontAwesomeIcon icon={faUtensils} />
          </button>
          <button className="btn" onClick={this.showDiapers}>
            <FontAwesomeIcon icon={faPoop} />
          </button>
          <button className="btn" onClick={this.showSleep}>
            <FontAwesomeIcon icon={faBed} />
          </button>
        </div>
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
              Number(id) === activity.sproutid &&
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
              {activity.time}
 <li className="act-list" key={index}>
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

       </div>
      </div>
    );
  }
}
