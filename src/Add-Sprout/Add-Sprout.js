import React from "react";
import Avatar from "react-avatar-edit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import config from '../config'



export default class AddSprout extends React.Component {

  constructor(props) {
    super(props);
    const src = "./example/einshtein.jpg";
    this.state = {
      preview: null,
      src,
    };
  }

  back = () => {
      this.props.history.goBack();
  }
  onCrop = (preview) => {
    this.setState({ preview });
  };

  addNewSprout = sprout => {

    fetch(`${config.API_ENDPOINT}/api/sprouts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sprout),
    })
      .then(response => {
        return response.json()
      })
      .then(responseJson => this.context.addSprout(responseJson))
      .catch((error) => {
        this.setState({hasError: true})
      });
  }

  handleSubmit = (e) => {
    let user = localStorage.getItem('user email')
    e.preventDefault();
    const newSprout = {
      useremail: user,
      name: e.target.name.value,
      age: e.target.age.value,
      image: this.state.preview
    };
    this.addNewSprout(newSprout)
    this.props.history.push(`/account/${newSprout.id}`);
    window.location.reload()

  };

  
  render() {
    return (
      <>
        <header className="landing-header"> 
            <span className = "heading">
            Sprout 
            {" "}
            <FontAwesomeIcon icon={faLeaf} />
                </span>
                <button className="home" onClick={this.back}><FontAwesomeIcon icon={faHome} /></button>

                </header>
        <h1 className="landing-title"> Add Sprout</h1>

        <form onSubmit={this.handleSubmit}>
          <input name="name" type="text" placeholder="Name" />
          <input name="age" type="text" placeholder="Age" />
          Upload a profile picture
         
          <div className="avatar">
            <Avatar
              width={200}
              height={200}
              onCrop={this.onCrop}
              onClose={this.onClose}

              onBeforeFileLoad={this.onBeforeFileLoad}
              
            />
            <img src={this.state.preview} alt="Preview" className="preview" />
          </div>
         
          <input type="submit" />
        </form>
      </>
    );
  }
}
