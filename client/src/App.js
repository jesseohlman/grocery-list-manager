import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Items from './components/items';
import List from './components/list';
import UserSignUp from './components/userSignUp';
import UserSignIn from './components/userSignIn';


const axios = require("axios");

class App extends Component {
  constructor(props){
    super(props);

    this.state = {}

    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut(){
    axios.get("/users/signOut")
    .then((res) => {

    })
    .catch((err) => {
      console.log(err);
    })
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Express Starter</h1>
        </header>
        <Router>
          <div>
            <ul>
              <li><Link to="/lists/items/add/">Add Items</Link></li>
              <li><Link to="/lists/new/">New List</Link></li>
              <li><Link to="/users/new/">Create Account</Link></li>
              <li><Link to="/users/SignIn/">Sign In</Link></li>
              <button onClick={this.handleSignOut}>Sign Out</button>

            </ul>
            <Route path="/lists/items/add/" component={Items} />
            <Route path="/lists/new/" component={List} />
            <Route path="/users/new/" component={UserSignUp}/>
            <Route path="/users/signIn/" component={UserSignIn}/>


          </div>
        </Router>

      </div>
    );
  }
}

export default App;
