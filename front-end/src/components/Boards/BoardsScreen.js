import React, { useState, useEffect } from 'react';
import './boards.css'
import Card from './board/board';
import AddBoard from './addBoard/addBoard'
import Head from '../Header/Head';



const BoardsScreen = (props) => {
    const [boardstate, setBoardsState] = useState([])
    const [head, downHead] = useState(false)
    const [side, sideToggle] = useState(false)

  
    const fetchData = async () => {
        try {
            const data = await fetch('https://boxing-canoe-89626.herokuapp.com/posts')
            const fetchedData = await data.json()
            setBoardsState(fetchedData)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(fetchData, [])

    const boards = boardstate.map(p => {
        return <Card
            key={p._id}
            avatar={p.userId.avatar}
            name={p.userId.name}
            poh={p.userId.poh}
            userId={p.userId._id}
            email={p.userId.email}
            meetingTime={p.meetingTime}
            postTime={p.postTime}
            timeOut={p.timeOut}
            toDo={p.toDo}
            place={p.place} />
    }
    )


    return (
        <div className='boardsScreen'>
            <Head head={head} downHead={() => downHead(!head)} />
            <div className={head ? 'contDown' : "contUp"}>
                <div className={side ? 'sideOpened' : 'sideClosed'} onClick={!side ? () => sideToggle(!side) : null}>
                    {
                        side ? (
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <AddBoard side={side} sideToggle={() => sideToggle(!side)} setBoards={setBoardsState}/>
                                <button onClick={() => sideToggle(!side)} style={{ marginLeft: '2%', paddingTop: '10px', paddingBottom: '10px', backgroundColor: '#3b5998' }}>⬅</button>
                            </div>
                        ) : null
                    }
                </div>
                <div className={side ? 'boardsSmall' : 'boardsBig'} >
                    {boardstate[0]? boards:<h1 style={{color:"white",textShadow:'4px 4px rgba(7, 7, 7, 0.541)'}}>Oops,seems like no boards here</h1>}
                </div>
            </div>

        </div>
    );
}

export default BoardsScreen;
