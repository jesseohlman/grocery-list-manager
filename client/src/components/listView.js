import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import Item from "./item";
import UpdateItem from "./updateItem";
import AddItem from "./addItem";




const axios = require("axios");

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        items: [],
        isCompleted: false,
        message: null
    };

    this.handleItemAdd = this.handleItemAdd.bind(this);
    this.handleItemDelete  =this.handleItemDelete.bind(this);
    this.handleListComplete = this.handleListComplete.bind(this);
    this.handleItemUpdate = this.handleItemUpdate.bind(this);

  }

  componentDidMount() {
    fetch(`/lists/${this.props.listId}/view`, {credentials: "include"})
    .then(res => res.json())
    .then(items => this.setState({items: this.state.items.concat(items), isCompleted: this.props.listComplete}))
  }



  handleItemAdd(item){
    //e.preventDefault();

    axios.post(`/lists/${this.props.listId}/addItem`, {
      name: item.name,
      count: item.count,
      listId: this.props.listId
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
    //e.target.reset();

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

  handleItemDelete(e, itemId){
    e.preventDefault();

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

  
  handleItemUpdate(item){
    axios.post(`/lists/${this.props.listId}/updateItem`, {
      itemId: item.id,
      name: item.name,
      count: item.count
    })
    .then((result) => {
      if(result.data.message){
        this.setState({message: result.data.message, items: this.state.items, isCompleted: this.state.isCompleted});
      }

      fetch(`/lists/${this.props.listId}/view`, {credentials: "include"})
      .then(res => res.json())
      .then(items => this.setState({items: items, message: this.state.message, isCompleted: this.state.isCompleted}))
      //re-adds the item at the end of the array but it isn't updated
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    var isCompleted = this.state.isCompleted;

    return (
      <div>

        <div>List Completed: {isCompleted ? (<input type="checkbox"  onChange={(e) => this.handleListComplete(e, this.props.listId)} checked/>) : (<input type="checkbox"  onChange={(e) => this.handleListComplete(e, this.props.listId)}/>)}</div>
        <Router>
          <Link to={"/lists/" + this.props.listId + "/newItem/"}>Add Item</Link>

          <Route path={"/lists/" + this.props.listId + "/newItem/"}
                         render={(props) => 
                             <AddItem {...props}  message={this.state.message} handleItemAdd={this.handleItemAdd} />}></Route>
        </Router>

          <ul>
              {this.state.items.map((item, index) =>
              
                  <li key={item.id}> <Item handleItemDelete={(e) => this.handleItemDelete(e)} 
                  item={item}
                  listId={this.props.listId}/>
                  <button className="btn btn-danger btn-sm" onClick={(e) => this.handleItemDelete(e, item.id)}>Remove</button>
                  <div></div>
                  <Router>
                    <Link to={"/lists/" + this.props.listId + "/updateItem/"} >Update</Link>
                    <Route path={"/lists/" + this.props.listId + "/updateItem/"}
                         render={(props) => 
                             <UpdateItem {...props} key={index} itemId={item.id} handleItemUpdate={this.handleItemUpdate}/>}></Route>
                  </Router>
                  </li>
                  )}
          </ul>


      </div>
    );
  }
}

export default ListView;
