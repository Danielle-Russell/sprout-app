import React from "react";
import "./activity-log.css";
import SproutContext from "../SproutContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBaby } from "@fortawesome/free-solid-svg-icons";

export default class ActivityLog extends React.Component {
  static contextType = SproutContext;

  handleSubmit = (e) => {
      e.preventDefault();
      this.setState({
          activities: {
              
              notes : [...e.target.notes.value]
          }
      })
      console.log('FORM submitted')
  }

  
  render() {
    const { id } = this.props.match.params;
    const element = <FontAwesomeIcon icon={faBaby} />;

    return (
      <>
        <header> Sprout </header>

        <h1> Activity Log</h1>

        <ul>
          {this.context.activities.map((activity, index) => {
            if (Number (id) === activity.sproutId) {
              return (
                <li key={index}>
                  {element}{" "}
                  {[activity.title, <br />, <span>{activity.notes}</span>]}
                </li>
              );
            }
            return null;
          })}
        </ul>

        <form
          onSubmit={(e) => {
            this.handleSubmit(e);
          }}
        >
          New Activity
          <label htmlFor="feed">
            <input id="feed" type="radio" name="activity" />
            Feed
          </label>
          <label htmlFor="diaper">
            <input id="diaper" type="radio" name="activity" />
            Diaper Change
          </label>
          <label htmlFor="sleep">
            <input id="sleep" type="radio" name="activity" />
            Sleep
          </label>
          <input name="notes" id="notes" type="text" placeholder="notes" />
          <input type="datetime-local" />
          <input type="submit" />
        </form>
      </>
    );
  }
}
