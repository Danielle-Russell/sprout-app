import React from "react";
import STORE from "../STORE";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

export default class Milestones extends React.Component {
  back = () => {
    this.props.history.goBack();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newMilestone = {
      sproutId: parseInt(this.props.match.params.id),
      title: e.target.title.value,
      notes: e.target.notes.value,
      date: e.target.date.value,
    };
    STORE.milestones.push(newMilestone);
    this.props.history.goBack();
  };

  render() {
    const { id } = this.props.match.params;

    const milestone = <FontAwesomeIcon icon={faFlag} />;

    const sortedArray = STORE.milestones
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .reverse();

    const findMilestone = sortedArray.map((mile, index) => {
      if (Number(id) === mile.sproutId) {
        return (
          <li key={index}>
            {milestone} {mile.title} <span>{mile.date}</span>
            <br /> <span>{mile.notes}</span>{" "}
          </li>
        );
      }
      return null;
    });
    return (
      <>
        <header>
          <span className="heading">
            Sprout <FontAwesomeIcon icon={faLeaf} />
          </span>
          <button className="home" onClick={this.back}><FontAwesomeIcon icon={faHome} /></button>
        </header>

        <h1> Milestones </h1>

        <ul>{findMilestone}</ul>

        <form onSubmit={this.handleSubmit}>
          <h2>New Milestone</h2>
          <input name="title" id="title" type="text" placeholder="Name" />

          <input name="notes" id="notes" type="text" placeholder="Notes" />
          <input name="date" type="date" />

          <input className="submit" type="submit" />
        </form>
      </>
    );
  }
}
