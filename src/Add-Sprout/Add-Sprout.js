import React from "react";
import Avatar from "react-avatar-edit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import config from '../config'
import moment from "moment";




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

  close = () => {
    this.props.history.push('/account/1')
    window.location.reload()
  }

  goBack = () => {
    setTimeout(function(){ window.location.reload() }, 1000);
    this.props.history.goBack()
  }

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
      .then(this.goBack())
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
  };



  render() {
    const yearsAgo = moment().subtract(100, 'years');
    const now = moment().format('YYYY-MM-DD');
    const hundredYears = yearsAgo.format('YYYY-MM-DD');
    
    return (
      <>
        <header className="landing-header"> 
                <button className="home" onClick={this.back}><FontAwesomeIcon icon={faHome} /></button>

                </header>
        <form style={{margin: "auto"}} onSubmit={this.handleSubmit}>
          <button className="close" onClick={this.close}>X</button>
          <h2> ADD SPROUT</h2>
          <input name="name" type="text" placeholder="Name" required />
          <label htmlFor="age">
            Date of Birth
          <input name="age" type="date" placeholder="Birthday YYYY-MM-DD" min={hundredYears} max={now} />
          </label>
          Upload a profile picture
         
          <div className="avatar">
            <Avatar
              width={200}
              height={200}
              onCrop={this.onCrop}
              onClose={this.onClose}

              onBeforeFileLoad={this.onBeforeFileLoad}
              
            />
            <img src={this.state.preview ? this.state.preview : "https://www.flaticon.com/svg/static/icons/svg/2919/2919600.svg"} alt="Preview" className="preview" />
          </div>
         
          <input type="submit" />
         

        </form>
      </>
    );
  }
}
