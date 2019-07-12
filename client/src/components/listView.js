import React, { Component } from 'react';
import { Route, Link, Redirect, BrowserRouter as Router } from 'react-router-dom';

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
        update: null,
        itemChanged: false
    };

    this.handleItemAdd = this.handleItemAdd.bind(this);
    this.handleItemDelete  =this.handleItemDelete.bind(this);
    this.handleListComplete = this.handleListComplete.bind(this);
    this.handleItemUpdate = this.handleItemUpdate.bind(this);
    this.displayUpdate = this.displayUpdate.bind(this);

  }

  componentDidMount() {
    fetch(`/lists/${this.props.listId}/view`, {credentials: "include"})
    .then(res => res.json())
    .then(items => this.setState({items: this.state.items.concat(items), isCompleted: this.props.listComplete}))
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
        this.setState({message: res.data.message.msg, items: this.state.items, isCompleted: this.state.isCompleted})
      } else {
        //updates list with new item
        fetch(`/lists/${this.props.listId}/view`, {credentials: "include"})
        .then(res => res.json())
        .then(items => this.setState({items: items, message: this.state.message, isCompleted: this.state.isCompleted}))
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
      this.setState({items: [...this.state.items], message: this.state.message, isCompleted: change})

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
      fetch(`/lists/${this.props.listId}/view`, {credentials: "include"})
      .then(res => res.json())
      .then(items => this.setState({items: items, message: this.state.message, isCompleted: this.state.isCompleted}))
      //re-renders items with the one removed
    })
    .catch((err) => {
      console.log(err);
    })

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
    this.setState({itemChanged: true});
  }

  render() {
    var isCompleted = this.state.isCompleted;

    return (
      <div>
        {(this.state.itemChanged) && (<Redirect to={"/lists/" + this.props.listId + "/newItem/"}></Redirect>)}
        <div>List Completed: {isCompleted ? (<input type="checkbox"  onChange={(e) => this.handleListComplete(e, this.props.listId)} checked/>) : (<input type="checkbox"  onChange={(e) => this.handleListComplete(e, this.props.listId)}/>)}</div>
        <div>{this.state.message}</div>
          <Router>
            <Link to={"/lists/" + this.props.listId + "/newItem/"}>Add Item</Link>

            <Route path={"/lists/" + this.props.listId + "/newItem/"}
                          render={(props) => 
                              <AddItem {...props}  message={this.state.message} handleItemAdd={this.handleItemAdd} />}>
            </Route>
          </Router>
          <br></br>
          <ul>
            <br></br>
            <h4><strong>Items</strong></h4>
              {this.state.items.map((item, index) =>
              
                  <li> 
                    <Item 
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
