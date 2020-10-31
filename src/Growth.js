import React from "react";
import STORE from "./STORE";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faRuler } from "@fortawesome/free-solid-svg-icons";
import { faWeight } from "@fortawesome/free-solid-svg-icons";

export default class Growth extends React.Component {
  state = {
    heightOpen: false,
    weightOpen: false,
  };

  back = () => {
    this.props.history.goBack();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newGrowth = {
      sproutId: parseInt(this.props.match.params.id),
      title: e.target.title.value,
      notes: e.target.notes.value,
      date: e.target.date.value,
      number: parseInt(e.target.number.value),
      units: e.target.units.value
    };
    STORE.growth.push(newGrowth);
    this.props.history.goBack();
    console.log(newGrowth)
  };

  height = () => {
    this.setState({
      heightOpen: true,
      weightOpen: false
    });
  };
  weight = () => {
    this.setState({
        heightOpen: false,
        weightOpen: true
    });
  };
 

  goHome = () => {
    this.setState({
        heightOpen: false,
        weightOpen: false
    });
  };

  render() {

    const { id } = this.props.match.params;

    const sortedArray = STORE.growth
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .reverse();

    const heights = sortedArray.map((grow, index) => {
      if (grow.title === "Height" && grow.sproutId === Number(id)) {
        return (
          <>
            <span className="date">{grow.date}</span>
            <li key={index}>
              
            <FontAwesomeIcon icon={faRuler} />{[grow.title, " ", <br />, 
              <span>{grow.number} {grow.units}</span>,
              <br />, <span>{grow.notes}</span>]}
            </li>
          </>
        );
      }
      return null;
    });

    const weights = sortedArray.map((grow, index) => {
      if (grow.title === "Weight" && grow.sproutId === Number(id)) {
        return (
          <>
            <span className="date">{grow.date}</span>
           
            <li key={index}>
            
            <FontAwesomeIcon icon={faWeight} /> {[grow.title, " ", <br />,   <span>{grow.number} {grow.units}</span>,
            <br />,<span>{grow.notes}</span>]}
            </li>
          </>
        );
      }
      return null;
    });

  
    return (
      <>
        <header>
          <span className="heading">
            Sprout 
            {" "}
            <FontAwesomeIcon icon={faLeaf} />
          </span>
          <button className="home" onClick={this.back}>
              <FontAwesomeIcon icon={faHome} />
          </button>
        </header>

        <h1> Growth </h1>

        <div className="buttons">
          <button onClick={this.goHome}>
          <FontAwesomeIcon icon={faHome} />
          </button>
          <button onClick={this.height}>
          <FontAwesomeIcon icon={faRuler} />
          </button>
          <button onClick={this.weight}>
          <FontAwesomeIcon icon={faWeight} />

          </button>
         
        </div>

        <ul>
          {sortedArray.map((grow, index) => {
                let icon;
                if (grow.title === "Height") {
                  icon = <FontAwesomeIcon icon={faRuler} />;
                } else if (grow.title === "Weight") {
                  icon = <FontAwesomeIcon icon={faWeight} />;
                }
            if (
              Number(id) === grow.sproutId &&
              !this.state.heightOpen &&
              !this.state.weightOpen 
            ) {
              return (
                <>
                  <span className="date">{grow.date}</span>
               
                  <li key={index}>
                    
                    {icon} {grow.title} 
                    <br />
                    <span>{grow.number} {grow.units}</span>
            <br />
                    <span>{grow.notes}</span>
                  </li>
                </>
              );
            }
            return null;
          })}

          {this.state.heightOpen ? heights : null}
          {this.state.weightOpen ? weights : null}
        
        </ul>

        <form onSubmit={this.handleSubmit}>
          <h2> New Growth Record </h2>
          <label htmlFor="height">
            <input value="Height" type="radio" name="title" />
Height          </label>
          <label htmlFor="weight">
            <input
              value="Weight"
              type="radio"
              name="title"
            />
Weight          </label>
         
          <input name="notes" type="text" placeholder="Notes" />
          <input name="number" type="text" placeholder="Number" />
          <select name="units">
              <option value="lbs">lbs</option>       
                     <option value="inches">inches</option>

          </select>
          <input name="date" type="date" />
         

          <input className="submit" type="submit" />
        </form>
      </>
    );
  }
}
