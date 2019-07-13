import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

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
        update: null,
        displayList: null
    };

    this.handleListDelete = this.handleListDelete.bind(this);
    this.afterListComplete = this.afterListComplete.bind(this);
    this.handleListUpdate = this.handleListUpdate.bind(this);
    this.displayUpdate = this.displayUpdate.bind(this);

  }

  componentDidMount() {
    fetch("/lists/select", {credentials: "include"})
    .then(res => res.json())
    .then((lists) => {
      if(lists.length <= 0){
        this.setState({message: "You haven't created any lists yet"});
      } else {
        this.setState({lists: this.state.lists.concat(lists)})
      }
    })
  }

  handleListDelete(e, listId){
    e.persist();
    
    axios.post(`/lists/${listId}/delete`, {
      listId: listId
    })
    .then((res) => {

      if(res.data.message){
        this.setState({message: res.data.message, lists: this.state.lists})
      }
      fetch("/lists/select", {credentials: "include"})
      .then(res => res.json())
      .then((lists) => {
        if(lists.length <= 0){
          this.setState({lists: lists, message: "You haven't created any lists yet"});
        } else {
          this.setState({lists: lists})
        }
      })
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

  displayList(listId){
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
            <ul>
                {this.state.lists.map(list =>
                    <li key={list.id}><a href="#" onClick={() => this.displayList(list.id)}>Title: {list.title}<br></br><small>Store: {list.store}</small></a>
                      <br></br>
                      {list.isCompleted && (<div><small>list completed</small></div>)}
                      <button className="btn btn-danger btn-sm" onClick={(e) => this.handleListDelete(e, list.id)}>Delete</button>
                      <button className="btn btn-warning btn-sm" onClick={() => this.displayUpdate(list.id)}>Update</button>

                              {(this.state.update === list.id) && (<ListUpdate listId={list.id} handleListUpdate={this.handleListUpdate}/>)}
                          
                              {(this.state.displayList === list.id) && (<ListView listId={list.id} listComplete={list.isCompleted} afterListComplete={this.afterListComplete}/>)}

                    </li>
                  )}
            </ul>
      </div>
    );
  }
}

export default ListSelect;
