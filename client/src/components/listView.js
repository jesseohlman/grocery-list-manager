import React, { Component } from 'react';

import Item from "./item";
import UpdateItem from "./itemUpdate";
import AddItem from "./addItem";

const axios = require("axios");

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        items: [],
        isCompleted: false,
        message: null,
        displayItemUpdate: null,
        itemChanged: false,
        displayAddItem: false
    };

    this.handleItemAdd = this.handleItemAdd.bind(this);
    this.handleItemDelete  =this.handleItemDelete.bind(this);
    this.handleListComplete = this.handleListComplete.bind(this);
    this.handleItemUpdate = this.handleItemUpdate.bind(this);
    this.toggleItemUpdate = this.toggleItemUpdate.bind(this);
    this.toggleItemAdd = this.toggleItemAdd.bind(this);
    this.getItems = this.getItems.bind(this);

  }
  componentDidMount(){
    this.getItems();
    this.timer = setInterval(()=> this.getItems(), 10000);
    //updates state every 10 seconds
  }

  componentWillUnmount(){
    clearInterval(this.timer);
    this.timer = null;
    //stops timer refresh
  }

  getItems() {
    fetch(`/lists/${this.props.listId}/view`, {credentials: "include"})
    .then(res => res.json())
    .then((items) => {
      if(items.length <= 0){
        this.setState({items: items, isCompleted: this.props.listComplete, message: "This list dosen't contain any items"});
      } else {
        this.setState({items: items, isCompleted: this.props.listComplete, message: null})
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleItemAdd(item){
    axios.post(`/lists/${this.props.listId}/addItem`, {
      name: item.name,
      count: item.count,
      listId: this.props.listId,
      isAquired: item.isAquired || false
    })
    .then((res) => {
      if(res.data.message){
        this.setState({message: res.data.message})
      } else {
        this.getItems();
        //updates list with new item
      }
    })
    .catch((err) => {
      console.log(err);
    })

  }

  handleListComplete(e, listId){
    e.persist(); //allows for asynch

    axios.post(`/lists/${this.props.listId}/complete`, {
      listId: listId
    })
    .then((res) => {
      if(res.data.message){
        this.setState({message: res.data.message})
      }
      //changes completed from false to true and vise versa
      var change = this.state.isCompleted ? false : true;
      this.setState({isCompleted: change})

      this.props.afterListComplete(this.state.isCompleted);
      //re-renders lists
    })
  }

  handleItemDelete(itemId){
    axios.post(`/lists/${this.props.listId}/deleteItem`, {
      itemId: itemId
    })
    .then((res) => {
      if(res.data.message){
        this.setState({message: res.data.message});
      } else {
      this.getItems();
      }
      //re-renders items with the one removed
    })
    .catch((err) => {
      console.log(err);
    })
  }

  toggleItemAdd(){
    var change = (this.state.displayAddItem) ? false : true;
    this.setState({displayAddItem: change, message: null});
  }

  toggleItemUpdate(itemId){
    if(itemId === this.state.displayItemUpdate){
      this.setState({displayItemUpdate: null});
    } else {
      this.setState({displayItemUpdate: itemId});
    }
  }

  handleItemUpdate(item){
    this.handleItemDelete(item.id);
    this.handleItemAdd(item);
  }

  render() {
    return (
      <div>
        <div>
          List Completed: {this.state.isCompleted ? 
          (<input type="checkbox"  onChange={(e) => this.handleListComplete(e, this.props.listId)} checked/>) :
          (<input type="checkbox"  onChange={(e) => this.handleListComplete(e, this.props.listId)}/>)}
        </div>
        <br></br>

        <button className="btn btn-primary" onClick={this.toggleItemAdd}>Add Item</button>
          {(this.state.displayAddItem) && (<AddItem handleItemAdd={this.handleItemAdd} />)}
          <br></br>
          <br></br>

          <h4><strong><u>Items:</u></strong></h4>
          <div>{this.state.message}</div>

            <ul>
              
              {this.state.items.map((item, index) =>
                <li> 
                  <Item 
                    key={item.id}
                    handleItemDelete={this.handleItemDelete}
                    item={item}
                    listId={this.props.listId}
                    afterItemComplete={this.afterItemComplete}
                  />
                  <button className="btn btn-danger btn-sm" onClick={() => this.handleItemDelete(item.id)}>Remove</button>
                  <button className="btn btn-warning btn-sm" onClick={() => this.toggleItemUpdate(item.id)}>Update</button>

                  {(this.state.displayItemUpdate === item.id) && 
                    (<UpdateItem key={item.id} 
                      itemId={item.id} 
                      isAquired={item.isAquired} 
                      handleItemUpdate={this.handleItemUpdate}
                    />)}
                </li>
              )}

            </ul>
          <br></br>
      </div>
    );
  }
}

export default ListView;
