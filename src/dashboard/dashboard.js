import React from "react";
import "./dashboard.css";
import { Link } from 'react-router-dom';
import SproutContext from '../SproutContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby } from '@fortawesome/free-solid-svg-icons'
import { faClinicMedical } from '@fortawesome/free-solid-svg-icons'

export default class Dashboard extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = SproutContext;

  render() {
    const { id } = this.props.match.params;
    const medical = <FontAwesomeIcon icon={faClinicMedical} />
    const baby = <FontAwesomeIcon icon={faBaby} />
   const findActivities = this.context.activities.map((activity, index) => {
     if (Number (id) === activity.sproutId) {
       return <li key={index}>{baby} {activity.title} <span>{activity.date} {activity.time} </span><br /><span>{activity.notes}</span></li>
     } return null
   })
    const findSprout = this.context.sprouts.map( (sprout, index) => {
      
     if (Number (id) === sprout.id) {
       return <li key={index}>{sprout.name} <br />{sprout.age} </li>
     } return null
    })
 
    const findApt = this.context.health.map((apt, index) => {
      if (Number (id) === apt.sproutId) {
       return <li key={index}>{medical} {apt.title} <span>{apt.date}</span> <br /> <span>{apt.notes}</span> </li> 
      } return null
    })

    const findMilestone = this.context.milestones.map( (mile, index) => {
      if (Number (id) === mile.sproutId) {
       return <li key={index}>{baby} {mile.title} <span>{mile.date}</span><br /> <span>{mile.notes}</span> </li> 
      } return null
    })
    return (
      <>
      
        <header>
         
          <br />

          {findSprout}
          
        </header>

        <div className="activity-log">
          <ul>
            {this.context.sprouts.map( (sprout, index) => {
              if (Number (id) === sprout.id) {
            return <Link className="link" to={`/activity-log/${sprout.id}`} > Activity Log </Link> }
            return null}) }
            {findActivities}
          </ul>
        </div>
      
        <div className="records">
          <ul>
          {this.context.sprouts.map( (sprout, index) => {
              if (Number (id) === sprout.id) {
            return <Link className="link" to={`/health/${sprout.id}`} > Health Records </Link> }
            return null}) }
            {findApt}
          </ul>
          </div>
          <ul>
          
          {this.context.sprouts.map( (sprout, index) => {
              if (Number (id) === sprout.id) {
            return <Link className="link" to={`/account/${sprout.id}`} > Milestones </Link> }
            return null}) }
            {findMilestone}
          
          </ul>
      </>
    );
  }
}
