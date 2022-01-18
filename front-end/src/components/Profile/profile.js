import React, { Component } from 'react';
import './profile.css'
import Head from '../Header/Head';
import { Avatar } from '@material-ui/core';
import Card from './boardprofile/board';

class Profile extends Component {
    state = {
        headCheck: false,
        user: {},
        boards: []
    }

    // fetch my profile

    fetchMe = async () => {
        const token = localStorage.getItem("token");
        const userdata = await fetch("https://boxing-canoe-89626.herokuapp.com/users/profile", {
            method: "GET",
            headers: {
                'auth_token': token
            }
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
    fetchBoards = async () => {
        const token = localStorage.getItem("token");
        const userdata = await fetch("https://boxing-canoe-89626.herokuapp.com/posts/profile", {
            method: "GET",
            headers: {
                'auth_token': token
            }
        });
        const fetchedData = await userdata.json();

        this.setState({
            boards: fetchedData
        })
    }

    componentDidMount() {
        this.fetchMe()
        this.fetchBoards()

    }

    //delete 
    delete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const userdata = await fetch("https://boxing-canoe-89626.herokuapp.com/posts/del/" + id, {
                method: "DELETE",
                headers: {
                    'auth_token': token
                }
            });

            const fetchedData = await userdata.json();
            if (fetchedData.message) {
                console.log(fetchedData.message);
            }
            else {
                this.setState({
                    boards: fetchedData
                })
            }
        } catch (error) {
            console.log(error);
        }
    }


    render() {
        return (
            <div className='profileScreen'>
                <Head head={this.state.headCheck} downHead={() => this.setState({ headCheck: !this.state.headCheck })} />
                <div className={this.state.headCheck ? 'contprofDown' : "contprofUp"}>
                    <div className={this.state.headCheck ? 'prof_panel_down' : "prof_panel"}>
                        <div className="prof_panel_inner">
                            <div className="herku"><h2>My profile</h2></div>
                            <div className="panel_info">
                                <div className="avatar_profile">
                                    <Avatar styles={{
                                        width: "50%",
                                        height: "50%",
                                    }} alt="Travis Howard" src={this.state.user.avatar} />
                                </div>
                                <div className="info_profile">
                                    <p>Name: {this.state.user.name}</p>
                                    <p>Email: {this.state.user.email}</p>
                                    <p>Profession or hobbies: {this.state.user.poh}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="panel_boards">
                                {this.state.boards[0] ? this.state.boards.map((p) => {
                                    return <Card
                                        key={p._id}
                                        avatar={this.state.user.avatar}
                                        toDo={p.toDo}
                                        place={p.place}
                                        postTime={p.postTime}
                                        meetingTime={p.meetingTime}
                                        timeOut={p.timeOut}
                                        delete={() => this.delete(p._id)} />
                                }
                                )
                                    : <h3 style={{ color: "black", textShadow: '4px 4px rgba(247, 247, 247, 0.541)' }}>Oops,seems like you have no boards (</h3>}

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Profile; 
