import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import config from '../config';
import SproutContext from '../SproutContext';



export default class Milestones extends React.Component {
  
  state = {
    file: null
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

  window.location.reload()
  }


  render() {
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

    const specSprout = sortedArray.filter( spr => Number(id) === spr.sproutid)

    return (
      <>
        <header className="landing-header">
          <span className="heading">
            Sprout <FontAwesomeIcon icon={faLeaf} />
          </span>
          <button className="home" onClick={this.back}><FontAwesomeIcon icon={faHome} /></button>
        </header>
        <h1> Milestones </h1>

        {specSprout.map( spr => 
        <div className="gallery">
          <img src={spr.image} />
          <div class="desc">{spr.notes}</div>

          </div>)}
        <form onSubmit={this.handleSubmit}>
          <h2>New Milestone</h2>
          <input name="title" id="title" type="text" placeholder="Name" />

          <input name="notes" id="notes" type="text" placeholder="Notes" />
          <input name="date" type="date" />
          <input type="file" onChange={this.handleChange}/>

          <input className="submit" type="submit" />
        </form>
     
      </>
    );
  }
}
