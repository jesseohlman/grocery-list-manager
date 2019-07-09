import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import ListView from "./listView";

const axios = require("axios");

class ListSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
        lists: [],
        message: null
    };

    this.handleListDelete = this.handleListDelete.bind(this);
    this.afterListComplete = this.afterListComplete.bind(this);

  }

  componentDidMount() {
    fetch("/lists/select", {credentials: "include"})
    .then(res => res.json())
    .then(lists => this.setState({lists: this.state.lists.concat(lists)}))
  }

  renderLists(){
    var ele = document.getElementById("lists");
    ele.innerHTML = this.state.users.map((user) => {return user.email}).join("\n");
  }

  handleListDelete(e, listId){
    e.preventDefault();

    axios.post(`/lists/${listId}/delete`, {
      listId: listId
    })
    .then((res) => {

      if(res.data.message){
        this.setState({message: res.data.message, lists: this.state.lists})
      }
      fetch("/lists/select", {credentials: "include"})
      .then(res => res.json())
      .then(lists => this.setState({lists: lists}))
      //re-renders items with the one list removed
    })
    .catch((err) => {
      console.log(err);
    })

  }

  afterListComplete(){
    fetch("/lists/select", {credentials: "include"})
      .then(res => res.json())
      .then(lists => this.setState({lists: lists}))
  }

  render() {
    return (
      <div>
        <div>{this.state.message}</div>
       <Router>
            <ul>
                {this.state.lists.map(list =>
                    <li key={list.id}><Link to={"/lists/" + list.id + "/view"}>Title: {list.title}<br></br><small>Store: {list.store}</small></Link>
                    <br></br>
                    {list.isCompleted && (<div><small>list completed</small></div>)}
                    <button className="btn btn-danger btn-sm" onClick={(e) => this.handleListDelete(e, list.id)}>Delete</button>

                        <Route path={"/lists/" + list.id + "/view"}
                         render={(props) => 
                             <ListView {...props} listId={list.id} listComplete={list.isCompleted} afterListComplete={this.afterListComplete}/>}>
                        </Route>
                    </li>
                    )}
            </ul>
                    
        </Router>
                
     
      </div>
    );
  }
}

export default ListSelect;
