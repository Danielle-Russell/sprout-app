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
import config from './config';
import SproutContext from './SproutContext'



class App extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    sprouts: {},
    activities: {},
    health: {},
    milestones: {},
    growth: {},
    modalShown: false,
  }
}
showModal = () => {
  this.setState({
    modalShown: true
  })
}

closeModal = () => {
  this.setState({
    modalShown: false
  })
}

  componentDidMount() {
    const email = localStorage.getItem('user email');
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/sprouts/${email}`),
      fetch(`${config.API_ENDPOINT}/api/activities/${email}`),
      fetch(`${config.API_ENDPOINT}/api/health/${email}`),
      fetch(`${config.API_ENDPOINT}/api/milestones/${email}`),
      fetch(`${config.API_ENDPOINT}/api/growth/${email}`),
    ])
      .then(([sproutsRes, activitiesRes, healthRes, milestoneRes, growthRes]) => {
        if (!sproutsRes.ok) return sproutsRes.json().then((e) => Promise.reject(e));
        if (!activitiesRes.ok)
          return activitiesRes.json().then((e) => Promise.reject(e));
          if (!healthRes.ok)
          return healthRes.json().then((e) => Promise.reject(e));
          if (!milestoneRes.ok)
          return milestoneRes.json().then((e) => Promise.reject(e));
          if (!growthRes.ok)
          return growthRes.json().then((e) => Promise.reject(e));
        return Promise.all([sproutsRes.json(), activitiesRes.json(), healthRes.json(), milestoneRes.json(), growthRes.json()]);
      })
      .then(([sprouts, activities, health, milestones, growth]) => {
        this.setState({ sprouts, activities, health, milestones, growth });
      })
      .catch((e) => {
        this.setState({
          hasError: true
        })
      });
  }

  addSprout = (newSprout) => {
    this.setState({
      sprouts: [...this.state.sprouts, newSprout],
    });
  };

  addHealth= (health) => {
    this.setState({
      health: [...this.state.health, health],
    });
  };


  addGrowth= (growth) => {
    this.setState({
      growth: [...this.state.growth, growth],
    });
  };

  addMilestone= (mile) => {
    this.setState({
      milestones: [...this.state.milestones, mile],
    });
  };

  addActivity= (activity) => {
    this.setState({
      activities: [...this.state.activities, activity],
    });
  };

go = () => {
  console.log('works')
  this.setState({
    modalShown: false
  })
  return <Route path='/account/:id'>
    <WelcomePage />
  </Route>

}
  
render() {
  const contextValue = {
    sprouts: this.state.sprouts,
    activities: this.state.activities,
    health: this.state.health,
    milestones: this.state.milestones,
    growth: this.state.growth,
    addSprout: this.addSprout,
    addHealth: this.addHealth,
    src: this.state.src,
    preview: this.state.preview,
    addGrowth: this.addGrowth,
    addMilestone: this.addMilestone,
    addActivity: this.addActivity,
    showModal: this.showModal,
    closeModal: this.closeModal,
    modalShown: this.state.modalShown,
    go: this.go
  }

  return (

    <div className="App">
        <SproutContext.Provider value={contextValue}>

  <Route exact path='/' component={LandingPage} />
  <Route path='/activity-log/:id' component={ActivityLog} />
  <Route path='/dashboard/:id' component={Dashboard} />
  <Route path='/account/:id' component={WelcomePage} />

  <Route path='/health/:id' component={Health} />

  <Route path='/new-sprout' component={AddSprout} />
  <Route path='/milestones/:id' component={Milestones} />
  <Route path='/growth/:id' component={Growth} />
  </SproutContext.Provider>

</div>


  )
}
}

export default App;
