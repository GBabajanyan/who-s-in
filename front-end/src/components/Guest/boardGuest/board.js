
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import './board.css'
import { Button } from '@material-ui/core';

const Card = (props) => {
    return (
        <div className='Cardg'>
            <div className='user_datag'>
                <div className='avatarg'>
                    <Avatar alt="Remy Sharp" src={props.avatar} />
                </div>
                <div className='infog'>
                    <p>Posted at: {props.postTime}</p>
                </div>
            </div>
            <div className='board_contentg'>
                <p>To {props.toDo}</p>
                <p>Place:{props.place}</p>
                <p>Meeting Time:{props.meetingTime}</p>
            </div>
            <div className="Dissapearsecg">
                <p className="caption">Board will disappear in {props.timeOut} hours</p>
            </div>
        </div>
    );
}

export default Card;




