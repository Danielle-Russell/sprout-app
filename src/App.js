import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './landing-page/landing-page';
import Dashboard from './dashboard/dashboard';
import SignUp from './signup';
import WelcomePage from './welcome-page/welcome-page';
import ActivityLog from './activity-log/activity-log';
import Health from './health/health';
import AddSprout from './Add-Sprout/Add-Sprout';
import Milestones from './Milestones/Milestones';
import Growth from './Growth';


class App extends React.Component {
    
render() {

  return (

    <div className="App">
  <Route exact path='/' component={LandingPage} />
  <Route path='/sign-up' component={SignUp} />
  <Route path='/account/:id' component={WelcomePage} />
  <Route path='/activity-log/:id' component={ActivityLog} />
  <Route path='/dashboard/:id' component={Dashboard} />
  <Route path='/health/:id' component={Health} />
  <Route path='/new-sprout' component={AddSprout} />
  <Route path='/milestones/:id' component={Milestones} />
  <Route path='/growth/:id' component={Growth} />




    </div>

  )
}
}

export default App;
