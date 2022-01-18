import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/homepage/Home'
import BoardsScreen from './components/Boards/BoardsScreen'
import './App.css'
import { Switch, Route } from 'react-router';
import Profile from './components/Profile/profile';

class App extends React.Component {


  
  state = {
    cards:  [
      {
        id: '1',          
        userId:{
          avatar: 'https://c7.hotpng.com/preview/980/886/491/computer-icons-icon-design-avatar-flat-face-icon.jpg',
          userName: 'David',
          poh:'actor',
          _id:"fefadcac"
        },
       toDo:'go scateboarding',
        postTime: '8:30',
        place:'Opera,Freedom Square',
        time:'12:30',
        timeOut:'2h'
      },
      {
        id: '2',          
        userId:{
           avatar: 'https://c7.hotpng.com/preview/980/886/491/computer-icons-icon-design-avatar-flat-face-icon.jpg',
          userName: 'Vazgen',
          poh:'Programmer',
          _id:"kakaxaksd",
        },
       toDo:'go to code',
        postTime: '17:30',
        place:'Metronome,Eritasardakan',
        time:'18:00',
        timeOut:'4h'
      },
    ]
  }

  render() { 
    return ( 
      <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/boards' render={() => <BoardsScreen/>} />
          <Route path='/profile' render={() => <Profile/>} />
        </Switch>
     );
  }
}
 
export default App;
