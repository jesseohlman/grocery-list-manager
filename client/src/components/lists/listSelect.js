import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';

import "../../css/listSelect.css";

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
        displayUpdate: null,
        displayList: null
    };

    this.handleListDelete = this.handleListDelete.bind(this);
    this.afterListComplete = this.afterListComplete.bind(this);
    this.handleListUpdate = this.handleListUpdate.bind(this);
    this.toggleListUpdate = this.toggleListUpdate.bind(this);
    this.toggleList = this.toggleList.bind(this);
    this.getLists = this.getLists.bind(this);

  }
  componentDidMount(){
    this.getLists();
    this.timer = setInterval(()=> this.getLists(), 20000);
    //updates lists every 20 seconds
  }

  componentWillUnmount(){
    clearInterval(this.timer);
    this.timer = null;
    //stops timer
  }

  getLists() {
    fetch("/lists/select", {credentials: "include"})
    .then(res => res.json())
    .then((lists) => {
      if(lists.length <= 0){
        this.setState({lists: lists, message: "You haven't created any lists yet"});
      } else {
        this.setState({lists: lists})
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleListDelete(e, listId){
    e.persist(); //allows for function called in an asynchronus way
    
    axios.post(`/lists/${listId}/delete`, {
      listId: listId
    })
    .then((res) => {
      if(res.data.message){
        this.setState({message: res.data.message})
      } else {
        this.getLists();
      }
      //re-renders lists with the one list removed
    })
    .catch((err) => {
      console.log(err);
    })
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
      .then((lists) => {
        if(lists.message){
          this.setState({message: lists.message})
        } else {
          this.setState({lists: lists, updated: true, displayUpdate: null})
        }
      })
      //updated == true will re-render page
      //update == null
    })
    .catch((err) => {
      console.log(err);
    })
  }

  afterListComplete(isCompleted){
    this.getLists();
    if(isCompleted){
      this.setState({displayList: null});
      //toggles list view off if list has been completed
    }
  }
  
  toggleListUpdate(listId){
    if(listId === this.state.displayUpdate){
      this.setState({displayUpdate: null})
    } else {
      this.setState({displayUpdate: listId});
    }
  }

  toggleList(listId){
    if(listId === this.state.displayList){
      this.setState({displayList: null})
    } else {
      this.setState({displayList: listId});
    }
  }

  render() {
    return (
      <div>
        <div>{this.state.message}</div>
        <div>{(this.state.updated) && <Redirect to="/lists/select"></Redirect>}</div>
            <ul className="list-select">
                {this.state.lists.map(list =>
                    <li key={list.id}>
                      <Link className="list-link" to="/lists/select" onClick={() => this.toggleList(list.id)}>
                        Title: {list.title}
                        <br></br>
                        <small>Store: {list.store}</small>
                      </Link>
                      <br></br>

                      {list.isCompleted && (<div><small>list completed</small></div>)}
                      <button className="btn btn-danger btn-sm" onClick={(e) => this.handleListDelete(e, list.id)}>Delete</button>
                      <button className="btn btn-warning btn-sm" onClick={() => this.toggleListUpdate(list.id)}>Update</button>

                      {(this.state.displayUpdate === list.id) && 
                        (<ListUpdate 
                          listId={list.id} 
                          handleListUpdate={this.handleListUpdate}
                        />)}
                          
                      {(this.state.displayList === list.id) && 
                        (<ListView 
                          listTitle={list.title}
                          listId={list.id} 
                          listComplete={list.isCompleted} 
                          afterListComplete={this.afterListComplete}
                        />)}

                    </li>
                )}
            </ul>
      </div>
    );
  }
}

export default ListSelect;
