
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import './board.css'
import Guest from "../../Guest/Guest"
import SimpleModal from '../../Modal/Modal';


const Card = (props) => {
    const [guest, togGuest] = useState(false)


    const handleOpenGuest = () => {
        togGuest(true)
    }

    const handleCloseGuest = () => {
        togGuest(false)
    }

    const guestBody = <Guest id={props.userId} />

    return (
        <div className='Cardb'>
            <div className='user_datab'>
                <div className='avatarb'>
                    <Avatar alt="Remy Sharp" src={props.avatar} />
                </div>
                <div className='infob'>
                    <p>Name: <b><a href='#' onClick={handleOpenGuest}>{props.name}</a></b></p>
                    <p>PoH: {props.poh}</p>
                    <p style={{ width:"max-content"}}>Posted at: {props.postTime}</p>
                    <SimpleModal
                        handleClose={handleCloseGuest}
                        open={guest}
                        body={guestBody} />
                </div>
            </div>
            <div className='board_contentb'>
                <div className="p1b">To {props.toDo}</div>
                <div className="p2b">Place :{props.place}</div>
                <div className="p3b">Meeting Time:{props.meetingTime}</div>
            </div>
            <div className="Dissapearsecb">
                <p className="caption">Board will disappear in {props.timeOut} hours</p>
            </div>

        </div>
    );
}

export default Card;




