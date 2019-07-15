import React, { Component } from 'react';

import Item from "./item";
import UpdateItem from "./itemUpdate";
import AddItem from "./addItem";

const AbortController = require("abort-controller");
const axios = require("axios");


class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        items: [],
        isCompleted: false,
        message: null,
        update: null,
        itemChanged: false,
        addItem: false
    };

    this.handleItemAdd = this.handleItemAdd.bind(this);
    this.handleItemDelete  =this.handleItemDelete.bind(this);
    this.handleListComplete = this.handleListComplete.bind(this);
    this.handleItemUpdate = this.handleItemUpdate.bind(this);
    this.displayUpdate = this.displayUpdate.bind(this);
    this.displayItemAdd = this.displayItemAdd.bind(this);
    this.getItems = this.getItems.bind(this);


  }
  componentDidMount(){
    this.getItems();
    this.timer = setInterval(()=> this.getItems(), 6000);
    //updates state every 6 seconds
  }

  componentWillUnmount(){
    clearInterval(this.timer);
    this.timer = null;
  }


  getItems() {
    const controller = new AbortController();
    const signal = controller.signal;

    setTimeout(() => controller.abort(), 5000);

    fetch(`/lists/${this.props.listId}/view`, {credentials: "include", signal})
    .then(res => res.json())
    .then((items) => {
      if(items.length <= 0){
        this.setState({items: items, message: "This list dosen't contain any items"});
      } else {
        this.setState({items: items, isCompleted: this.props.listComplete, message: null})
      }
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
        this.setState({message: res.data.message, items: this.state.items, isCompleted: this.state.isCompleted})
      } else {
        //updates list with new item
        this.getItems();
      }
    })
    .catch((err) => {
      console.log(err);
    })

  }

  handleListComplete(e, listId){
    axios.post(`/lists/${this.props.listId}/complete`, {
      listId: listId
    })
    .then((res) => {
      if(res.data.message){
        this.setState({message: res.data.message, items: this.state.items, isCompleted: this.state.isCompleted})
      }
      var change = this.state.isCompleted ? false : true;
      this.setState({ isCompleted: change, items: this.state.items, message: this.state.message, update: this.state.update})

      this.props.afterListComplete();
    })
  }

  handleItemDelete(itemId){

    axios.post(`/lists/${this.props.listId}/deleteItem`, {
      itemId: itemId
    })
    .then((res) => {
      if(res.data.message){
        this.setState({message: res.data.message, items: this.state.items, isCompleted: this.state.isCompleted});
      }
      this.getItems();
      //re-renders items with the one removed
    })
    .catch((err) => {
      console.log(err);
    })

  }

  displayItemAdd(){
    var change = (this.state.addItem) ? false : true;
    this.setState({addItem: change, message: null});
  }

  displayUpdate(itemId){
    if(itemId === this.state.update){
      this.setState({update: null});
    } else {
      this.setState({update: itemId});
    }
    
  }

  
  handleItemUpdate(item){

    this.handleItemDelete(item.id);

    this.handleItemAdd(item);
  }

  render() {
    var isCompleted = this.state.isCompleted;

    return (
      <div>
        <div>List Completed: {isCompleted ? (<input type="checkbox"  onChange={(e) => this.handleListComplete(e, this.props.listId)} checked/>) : (<input type="checkbox"  onChange={(e) => this.handleListComplete(e, this.props.listId)}/>)}</div>
        <br></br>
        <button className="btn btn-primary" onClick={this.displayItemAdd}>Add Item</button>
          {(this.state.addItem) && (<AddItem handleItemAdd={this.handleItemAdd} />)}
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
                    <button className="btn btn-warning btn-sm" onClick={() => this.displayUpdate(item.id)}>Update</button>
                    {(this.state.update === item.id) && (<UpdateItem key={index} itemId={item.id} isAquired={item.isAquired} handleItemUpdate={this.handleItemUpdate}/>)}
                  </li>

                )}
          </ul>
          <br></br>
      </div>
    );
  }
}

export default ListView;
