import React, { Component } from 'react';
import { Route, Link, Redirect, BrowserRouter as Router } from 'react-router-dom';

import ListView from "./listView";
import ListUpdate from "./listUpdate";


const axios = require("axios");

class ListSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
        lists: [],
        message: null,
        updated: false,
        update: null
    };

    this.handleListDelete = this.handleListDelete.bind(this);
    this.afterListComplete = this.afterListComplete.bind(this);
    this.handleListUpdate = this.handleListUpdate.bind(this);
    this.displayUpdate = this.displayUpdate.bind(this);

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

  handleListDelete(listId){

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

  handleListUpdate(list){

    axios.post(`/lists/${list.id}/update`, {
      title: list.title,
      store: list.store,
      id: list.id
    })
    .then((result) => {
      fetch("/lists/select", {credentials: "include"})
      .then(res => res.json())
      .then(lists => this.setState({lists: lists, updated: true, update: null}))
    })
  }

  displayUpdate(listId){
    if(listId === this.state.update){
      this.setState({update: null})
    } else {
      this.setState({update: listId});
    }
  }

  render() {
    return (
      <div>
        <div>{this.state.message}</div>
        <div>{(this.state.updated) && <Redirect to="/lists/select"></Redirect>}</div>
        <Router>
            <ul>
                {this.state.lists.map(list =>
                    <li key={list.id}><Link to={"/lists/" + list.id + "/view"}>Title: {list.title}<br></br><small>Store: {list.store}</small></Link>
                      <br></br>
                      {list.isCompleted && (<div><small>list completed</small></div>)}
                      <button className="btn btn-danger btn-sm" onClick={(e) => this.handleListDelete(e, list.id)}>Delete</button>
                      <button className="btn btn-warning btn-sm" onClick={() => this.displayUpdate(list.id)}>Update</button>

                              {(this.state.update === list.id) && (<ListUpdate listId={list.id} handleListUpdate={this.handleListUpdate}/>)}
                          

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
