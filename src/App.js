import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './landing-page/landing-page';
import Dashboard from './dashboard/dashboard';
import SignUp from './signup';
import WelcomePage from './welcome-page/welcome-page';
import ActivityLog from './activity-log/activity-log';
import SproutContext from './SproutContext';
import Health from './health/health';
import AddSprout from './Add-Sprout/Add-Sprout';

class App extends React.Component {
  state = {
    sprouts: [
    {
    id: 1,
    name: "Christian",
    age: "12 months"
    },
    {
    id: 2,
    name: "Elizabeth",
    age: "3 months"
    }
    ],
    
    activities: [
    {
    sproutId: 1,
    title: "Diaper",
    date: "10/01/20",
    time: "10:00am",
    notes: "Solid"
    },
    {
    sproutId: 2,
    title: "Diaper",
    date: "10/01/20",
    time: "10:00am",
    notes: "Wet"
    },
    {
    sproutId: 1,
    title: "Feed",
    date: "10/01/20",
    time: "05:00am",
    notes: "Right Breast 10 minutes"
    }
    ],
    
    milestones: [
    {
    sproutId: 1,
    title: "First walked",
    date: "09/30/20",
    notes: "Took a few steps, smiling baby!"
    },
    {
    sproutId: 2,
    title: "First day of school",
    date: "08/05/20",
    notes: "Excited"
    }
    ],
    health: [
    {
    sproutId: 1,
    title: "Appointment",
    date: "10/13/20",
    notes: "Christian was in the 17th percentile for height but the 40th for weight. The doctor said he was doing very well, he even waved bye-bye!"
    },
    {
    sproutId: 2,
    title: "Vaccination",
    date: "10/13/20",
    notes: "Flu shot"
    },
    {
      sproutId: 1,
      title: "Appointment",
      date: "07/06/20",
      notes: "The doctor noticed Christian's flat spot but said it was getting a lot better. He didn't cry, but he would not lie down for the doctor"
      },
      {
        sproutId: 1,
        title: "Vaccination",
        date: "10/13/20",
        notes: "Flu shot"
        },
    ]
    }


render() {

const contextValue = {
    sprouts: this.state.sprouts,
    activities: this.state.activities,
    health: this.state.health,
    milestones: this.state.milestones
  }
  return (
<SproutContext.Provider value={contextValue}>
    <div className="App">
  <Route exact path='/' component={LandingPage} />
  <Route path='/sign-up' component={SignUp} />
  <Route path='/account' component={() => <WelcomePage sprouts={this.state.sprouts} />} />
  <Route path='/activity-log/:id' component={ActivityLog} />
  <Route path='/dashboard/:id' component={Dashboard} />
  <Route path='/health/:id' component={Health} />
  <Route path='/new-sprout' component={AddSprout} />


    </div>
    </SproutContext.Provider>

  )
}
}

export default App;
