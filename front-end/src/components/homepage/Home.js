import React from 'react';
import upimg from "../../img/swipeUp.png"
import './Home.css'

class Home extends React.Component {
  state = {
    up: false,
  }
  
  

  clicked=()=>{
    this.setState({up:!this.state.up})
    setTimeout(()=>{
      this.props.history.push('/boards')
    },1000)
  }

  render() {
    return (
      <div className="App">
        <div className={this.state.up ? "Appfrontup" : "Appfront"} ><div><h1 className="home_title"> Who's in?</h1></div>
          <div> <img src={upimg} className="up" onClick={this.clicked} alt="#"/></div>
        </div>
        <div className="Appback">
        <iframe src="https://giphy.com/embed/3o7bu3XilJ5BOiSGic" width="80px" height="80" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                </div>

      </div>
    );
  }
}

export default Home;
