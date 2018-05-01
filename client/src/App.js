import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import PostProject from './components/PostProject';
import EditProfile from './components/EditProfile';
import ProjectAndBids from './components/ProjectAndBidDetails';
import TransactionManager from './components/TransactionManager';

class App extends Component {

  render() {
    return (
      <div className="App">
          <BrowserRouter>
              <div>
                  <Route exact path="/" component={Login}/>
                  <Route exact path="/signup" component={Signup}/>
                  <Route exact path="/home" component={Home}/>
                  <Route exact path="/postproject" component={PostProject}/>
                  <Route exact path="/profile" component={Profile}/>
                  <Route exact path="/editprofile" component={EditProfile}/>
                  <Route exact path="/projectinfo" component={ProjectAndBids}/>
                  <Route exact path="/dashboard" component={Dashboard}/>
                  <Route exact path="/transactions" component={TransactionManager}/>
              </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
