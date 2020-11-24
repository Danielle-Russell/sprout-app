import React from "react";
import config from '../config';
import SproutContext from '../SproutContext';



export default class Milestones extends React.Component {
  
  state = {
    file: null,
    showMilestones: true,
    showLog: false
  }

  static contextType = SproutContext;

  back = () => {
    this.props.history.goBack();
  };

  addNewMilestone = mile => {

    fetch(`${config.API_ENDPOINT}/api/milestones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mile),
    })
      .then(response => {
        return response.json()
      })
      .then(responseJson => this.context.addMilestone(responseJson))
      .catch((error) => {
        console.log(error.message)
        this.setState({hasError: true})
      });
  }

  handleChange = (e) => {
    let reader = new FileReader();
    reader.onload = (e) => {
        this.setState({file: reader.result})
    }
    reader.readAsDataURL(e.target.files[0]);
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
   
    const newMilestone = {
      useremail: localStorage.getItem('user email'),
      sproutid: parseInt(this.props.match.params.id),
      title: e.target.title.value,
      notes: e.target.notes.value,
      date: e.target.date.value,
      image: this.state.file
    };
    console.log(newMilestone)
    this.addNewMilestone(newMilestone)

  }

  close = () => {
    this.showMilestones()
    window.location.reload()
  }

  showForm = () => {
    this.setState({
      showLog: true,
      showMilestones: false
    })
  }

  showMilestones = () => {
    this.setState({
      showLog: false,
      showMilestones: true
    })
  }
  render() {
    let sprouts = [];
    const sproutArray = () => {
      for (var key in this.context.sprouts) {
        if (key.length) {
          sprouts.push(this.context.sprouts[key]);
        }
      }
    };
    sproutArray()
  let milestones = []
    const milestoneArray = () => {
     for (var key in this.context.milestones) {
       milestones.push(this.context.milestones[key])
 }
     }
milestoneArray()

    const { id } = this.props.match.params;

    const sortedArray = milestones
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .reverse();
    const specSprout = sortedArray.filter( spr => Number(id) === spr.sproutid);
    const sproutName = sprouts.map( spr => {
      if (spr.id === Number(id)) {
    return <div>
      <img className="profile-pic" src = {spr.image} />
      <p>{spr.name}</p>
      </div>} return null})
    return (
      <>
      <header>{sproutName}</header>

<div className="sidebar">
  <p className="sidebar-nav" onClick={this.back}>Back to Dashboard</p> 
  <p className="sidebar-nav" onClick={this.showMilestones}>Milestone Gallery</p>  
  <p className="sidebar-nav" onClick={this.showForm}>New Milestone</p>

</div>

{this.state.showMilestones ? specSprout.map( spr => {
        return <div className="gallery">
          <img src={spr.image} />
          <div className="desc"><b>{spr.date}</b> <br /> {spr.notes}</div>

          </div>
          }) : <form id="form" onSubmit={this.handleSubmit}>
          <h2>New Milestone</h2>
          <input name="title" id="title" type="text" placeholder="Name" />

          <input name="notes" id="notes" type="text" placeholder="Notes" />
          <input name="date" type="date" />
          <input type="file" onChange={this.handleChange}/>

          <button className="submit" type="submit">Confirm</button>
          <button className="submit" onClick={this.close}>Submit</button>

        </form>}
     
      </>
    );
  }
}
