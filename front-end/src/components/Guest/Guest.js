import React, { Component } from 'react';
import './Guest.css'
import { Avatar } from '@material-ui/core';
import Card from './boardGuest/board';

class Guest extends Component {
  state = {
    headCheck: false,
    user: {},
    boards: []
  }

  // fetch guest profile info

  fetchMe = async (id) => {
    const token = localStorage.getItem("token");
    const userdata = await fetch("https://boxing-canoe-89626.herokuapp.com/users/guestInfo/" + id, {
      method: "GET",
    });
    const fetchedData = await userdata.json();

    if (fetchedData.message) {
      console.log(fetchedData.message);
    }
    else {
      this.setState({
        user: fetchedData[0]
      })
    }
  }


  //fetch boards 
  fetchBoards = async (id) => {
    const token = localStorage.getItem("token");
    const userdata = await fetch("https://boxing-canoe-89626.herokuapp.com/posts/guestPosts/" + id, {
      method: "GET",
      headers: {
        'auth_token': token
      }
    });
    const fetchedData = await userdata.json();
    console.log(fetchedData);

    this.setState({
      boards: fetchedData
    })
  }

  componentDidMount() {
    this.fetchMe(this.props.id)
    this.fetchBoards(this.props.id)

  }


  render() {
    return (
      <div className='modalWrapGuest'>
        <div className="herku"><h1>{this.state.user.name}'s profile</h1></div>
        <div className="panel_info">
          <div className="avatar_guest">
            <Avatar styles={{
              width: "100%",
              height: "100%",
            }} alt="Travis Howard" src={this.state.user.avatar} />
          </div>
          <div className="info_guest">
            <p>Name: {this.state.user.name}</p>
            <p>Email: {this.state.user.email}</p>
            <p>Profession or hobbies: {this.state.user.poh}</p>

          </div>
        </div>
        <hr />
        <div className="panel_guest">
        {this.state.boards[0]? 
        this.state.boards.map(p => {

          return <Card
            key={p.id}
            avatar={p.userId.avatar}
            name={p.userId.name}
            poh={p.userId.poh}
            userId={p.userId._id}
            postTime={p.postTime}
            meetingTime={p.meetingTime}
            timeOut={p.timeOut}
            toDo={p.toDo}
            place={p.place} />
        }
        )        
        :<h3 style={{color:"white",textShadow:'4px 4px rgba(7, 7, 7, 0.541)'}}>Oops,seems like no boards here(</h3>}
        </div>
      </div>
    );
  }
}

export default Guest;
