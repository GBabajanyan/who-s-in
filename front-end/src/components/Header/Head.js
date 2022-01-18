import React, { useState, useEffect } from 'react';
import "./Head.css"
import { Link } from 'react-router-dom';
import SimpleModal from '../Modal/Modal';
import LoginBody from './auth/signUp/login/LoginBody';
import RegBody from './auth/signUp/reg/RegBody';

const Head = (props) => {

    const [login, handleLogin] = useState(false)
    const [reg, handleReg] = useState(false)

    const handleOpenLogIn = () => {
        handleLogin(true)
    }

    const handleCloseLogIn = () => {
        handleLogin(false)
    }

    const handleOpenReg = () => {
        handleReg(true)
    }

    const handleCloseReg = () => {
        handleReg(false)
    }

    const loginBody = <LoginBody close={() => handleLogin(!login)} />
    const regBody = <RegBody close={() => handleReg(!reg)} />



    return (
        <div
            onClick={!props.head ? props.downHead : null}
            className={props.head ? 'headerDown' : 'headerUp'}>
            {
                props.head ? (
                    <div className="inner">
                        <div className="whosin">
                            <h1><i>Who's In?</i></h1>
                        </div>
                        <div className="btnsstart">
                            <a href="#" className="btn" onClick={props.downHead}>⬆</a>
                            {localStorage.getItem('token') ? (<Link to="/profile" className="btn"><i>My Profile</i></Link>) : null}
                            <Link to="./boards" className="btn"><i>Boards</i></Link>
                        </div>
                        {localStorage.getItem('token') ?
                            (
                                <div className="btnsend">
                                    <a href="#" onClick={() => localStorage.removeItem('token')} className="btn"><i>Log Out</i></a>
                                </div>
                            )
                            :
                            (
                                <div className="btnsend">
                                    <SimpleModal
                                        handleClose={handleCloseLogIn}
                                        open={login}
                                        body={loginBody} />
                                    <SimpleModal
                                        handleClose={handleCloseReg}
                                        open={reg}
                                        body={regBody} />
                                    <a href="#" onClick={handleOpenLogIn} className="btn" ><i>Log in</i></a>
                                    <a href="#" onClick={handleOpenReg} className="btn"><i>Sign Up</i></a>
                                </div>
                            )}


                    </div>
                ) : null
            }

        </div>
    )
}

export default Head;
