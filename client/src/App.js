import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './App.css';


import ListCreate from './components/listCreate';
import ListSelect from './components/listSelect';

import UserSignUp from './components/userSignUp';
import UserSignIn from './components/userSignIn';

import About from "./components/about";


const axios = require("axios");

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: {id: undefined},
      message: null
    }

    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);

  }

  componentDidMount(){
    fetch("/users", {credentials: "include"})
    .then(res => res.json())
    .then((user) => {
      this.setState({user: user, message: null});
    })
  }

  handleSignOut(){
    axios.get("/users/signOut")
    .then((res) => {

      fetch("/users", {credentials: "include"})
      .then(res => res.json())
      .then((user) => {
        this.setState({user: user});
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleSignIn(input){  
     axios.post("/users/signIn", {
       email: input.email,
       password: input.password,
     })
     .then((res) => {
      fetch("/users", {credentials: "include"})
      .then(res => res.json())
      .then((user) => {
        this.setState({user: user, message: res.data.message});
      })
     })
     .catch((err) => {
       console.log(err);
     });

   }



  render() {
    var currentUser = this.state.user.id === undefined ? false : true;
    return (
      <div className="App">
      
        <header className="App-header">
          <h1 className="App-title">Grocery List</h1>
        </header>
        <Router>
          <div>
            
            {currentUser ? (<ul className="list-inline">
                <li className="nav-piece list-inline-item"><Link to="/lists/new/">New List</Link></li>
                <li className="nav-piece list-inline-item"><Link to="/lists/select/">Select List</Link></li>
                <li className="nav-piece list-inline-item"><Link to="/about/">About</Link></li>
                <li className="nav-piece list-inline-item"><a href="#" onClick={this.handleSignOut}>Sign Out</a></li>
              </ul>) : (<ul className="list-inline">
                <li className="nav-piece list-inline-item"><Link to="/users/new/">Create Account</Link></li>
                <li className="nav-piece list-inline-item"><Link to="/users/signIn/">Sign In</Link></li>
                <li className="nav-piece list-inline-item"><Link to="/about/">About</Link></li>

              </ul>)}
    
            <Route path="/about/" component={About} />

            <Route path="/lists/new/" component={ListCreate} />
            <Route path="/lists/select/" component={ListSelect} />

            <Route path="/users/new/" component={UserSignUp}/>
            <Route path="/users/signIn/" render={(props) => <UserSignIn {...props} currentUser={this.state.user} handleSignIn={this.handleSignIn} message={this.state.message}/>}/>


          </div>
        </Router>
      </div>
    );
  }
}

export default App;
