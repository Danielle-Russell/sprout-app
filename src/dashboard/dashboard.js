import React from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClinicMedical } from "@fortawesome/free-solid-svg-icons";
import { faSyringe } from "@fortawesome/free-solid-svg-icons";
import { faPrescriptionBottle } from "@fortawesome/free-solid-svg-icons";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faPoop } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faRuler } from "@fortawesome/free-solid-svg-icons";
import { faWeight } from "@fortawesome/free-solid-svg-icons";

import STORE from "../STORE";

export default class Dashboard extends React.Component {


  back = () => {
    this.props.history.goBack();
  };

 
  render() {

    const sortedActivities = STORE.activities
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .reverse();

      const sortedHealth = STORE.health
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .reverse();

      const sortedMilestones = STORE.milestones
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .reverse();

      const sortedGrowth = STORE.growth
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .reverse();


    const { id } = this.props.match.params;

  const arrow = <FontAwesomeIcon icon={faChevronRight} />

    const milestone = <FontAwesomeIcon icon={faFlag} />;

    const findActivities = sortedActivities.map((activity, index) => {
      let element;
      if (activity.title === "Sleep") {
        element = <FontAwesomeIcon icon={faBed} />;
      } else if (activity.title === "Feed") {
        element = <FontAwesomeIcon icon={faUtensils} />;
      } else if (activity.title === "Diaper") {
        element = <FontAwesomeIcon icon={faPoop} />;
      }
      if (Number(id) === activity.sproutId) {
        return (
          <li key={index}>
            {element} {activity.title}{" "}
            <span>
              {activity.date} {activity.time}{" "}
            </span>
            <br />
            <span>{activity.notes}</span>
          </li>
        );
      }
      return null;
    });
    const findSprout = STORE.sprouts.map((sprout, index) => {
      if (Number(id) === sprout.id) {
        return (
          <li className="name" key={index}>
            {sprout.name} <br />
            {sprout.age}{" "}
          </li>
        );
      }
      return null;
    });

    const findApt = sortedHealth.map((apt, index) => {
      let medical;
      if (Number(id) === apt.sproutId) {
        if (apt.title === "Appointment") {
          medical = <FontAwesomeIcon icon={faClinicMedical} />;
        } else if (apt.title === "Vaccination") {
          medical = <FontAwesomeIcon icon={faSyringe} />;
        } else if (apt.title === "Medication") {
          medical = <FontAwesomeIcon icon={faPrescriptionBottle} />;
        }
        return (
          <li key={index}>
            {medical} {apt.title} <span>{apt.date}</span> <br />{" "}
            <span>{apt.notes}</span>{" "}
          </li>
        );
      }
      return null;
    });

    const findMilestone = sortedMilestones.map((mile, index) => {
      
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

    const findGrowth = sortedGrowth.map((grow, index) => {
      let icon;
      if (grow.title === "Height") {
        icon = <FontAwesomeIcon icon={faRuler} />;
      } else if (grow.title === "Weight") {
        icon = <FontAwesomeIcon icon={faWeight} />;
      }
      if (Number(id) === grow.sproutId) {
        return (
          <li key={index}>
            {icon} {grow.title}{" "}
            <span>
              {grow.date} {grow.time}{" "}
            </span>
            <br />
            <span>{grow.number} {grow.units}</span>
            <br />
            <span>{grow.notes}</span>
          </li>
        );
      }
      return null;
    });

    const picture = STORE.pics.find((pic) => pic.id === Number(id));

    return (
      <>
        <header>
          <br />

          {findSprout}
          <img src={picture.src} alt="profile" className="profile-pic" />

          <button className="home" onClick={this.back}> <FontAwesomeIcon icon={faHome} /></button>
        </header>

        <div className="activity-log">
          <ul>
            {STORE.sprouts.map((sprout, index) => {
              if (Number(id) === sprout.id) {
                return (
                  <Link className="link" to={`/activity-log/${sprout.id}`}>
  
                   Activity Log {arrow}{arrow}
                  </Link>
                );
              }
              return null;
            })}
            {findActivities}
          </ul>
        </div>

        <div className="records">
          <ul>
            {STORE.sprouts.map((sprout, index) => {
              if (Number(id) === sprout.id) {
                return (
                  <Link className="link" to={`/health/${sprout.id}`}>
                    
                    Health Records {arrow}{arrow}
                  </Link>
                );
              }
              return null;
            })}
            {findApt}
          </ul>
        </div>
        <ul>
          {STORE.sprouts.map((sprout, index) => {
            if (Number(id) === sprout.id) {
              return (
                <Link className="link" to={`/milestones/${sprout.id}`}>
            
                  Milestones {arrow}{arrow}
                </Link>
              );
            }

            return null;
          })}
          {findMilestone}
        </ul>

        <ul>
          {STORE.sprouts.map((sprout, index) => {
            if (Number(id) === sprout.id) {
              return (
                <Link className="link" to={`/growth/${sprout.id}`}>
            
                  Growth {arrow}{arrow}
                </Link>
              );
            }

            return null;
          })}
          {findGrowth}
        </ul>


        
      </>
    );
  }
}
