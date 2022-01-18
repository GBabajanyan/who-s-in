import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import './board.css'
import { Button } from '@material-ui/core';

const Card = (props) => {
    return (
        <div className='Cardprofile'>
            <div className='user_data'>
                <div className='avatar'>
                    <Avatar alt="Remy Sharp" src={props.avatar} />
                </div>
                <div className='info'>
                    <p>Posted at: {props.postTime}</p>
                </div>
            </div>
            <div className='board_content'>
                <p>To {props.toDo}</p>
                <p>Place:{props.place}</p>
                <p>Meeting Time:{props.meetingTime}</p>
            </div>
            <div className="Dissapearsec">
                <p className="caption">Board will disappear in {props.timeOut} hours</p>
                <button style={{ padding: '2px', backgroundColor: "red", overflow: 'hidden', marginLeft: '5px', color: 'white' }} onClick={props.delete} >Delete</button>
            </div>
        </div>
    );
}

export default Card;




