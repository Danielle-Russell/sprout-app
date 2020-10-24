import React from 'react';
import { NavLink } from 'react-router-dom';

export default class WelcomePage extends React.Component {
    render () {

const { sprouts } = this.props;
        return (
            <>
            <header>
                Sprout
            </header>
            <h1> Welcome, user</h1>
            <div className= "sprouts">
                <ul>
                    My Sprouts:

                    {sprouts.map( (sprout, i) => {
return <NavLink to={`/dashboard/${sprout.id}`}><li key={i}>{sprout.name}</li> </NavLink>
})}
                   <NavLink to="/new-sprout" ><button> Add Sprout</button></NavLink>

                </ul>
            </div>
            </>
        )
    }
}