import React from 'react';
import './health.css';
import SproutContext from '../SproutContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClinicMedical } from '@fortawesome/free-solid-svg-icons'

export default class Health extends React.Component {
    static contextType = SproutContext;
    render () {
        const { id } = this.props.match.params;
        const element = <FontAwesomeIcon icon={faClinicMedical} />

        return (
            <>
            <h1>Health Records</h1>
            <ul>
            {this.context.health.map( (apt, index) => {
             if (Number (id) === apt.sproutId  ) {
return <li key={index}>{element} {[apt.title, " ", <br />, <span>{apt.notes}</span>]}</li>
             }
             return null
            })}
            </ul>
            
            <form onSubmit= {e => {this.handleSubmit(e)}}>
                New Record
                <label htmlFor = "apt">
                <input id="apt" type = "radio" name="health"/>
                Appointment
                </label>
                <label htmlFor = "Vaccination">
                <input id="Vaccination" type = "radio" name="health"/>
                Vaccination
                </label>
                

                <input name="notes" id="notes" type="text" placeholder="notes" />
                <input type="datetime-local" />
                

                <input type="submit" />

            </form>

            </>
        )
    }
}