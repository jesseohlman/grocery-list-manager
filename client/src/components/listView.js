import React, { Component } from 'react';

import Item from "./item";

const axios = require("axios");

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        items: [],
        isCompleted: false
    };

    this.handleItemAdd = this.handleItemAdd.bind(this);
    this.handleItemDelete  =this.handleItemDelete.bind(this);
    this.handleListComplete = this.handleListComplete.bind(this);
  }

  componentDidMount() {
    fetch(`/lists/${this.props.listId}/view`, {credentials: "include"})
    .then(res => res.json())
    .then(items => this.setState({items: this.state.items.concat(items), isCompleted: this.props.listComplete}))
  }



  handleItemAdd(e){
    e.preventDefault();

    axios.post(`/lists/${this.props.listId}/addItem`, {
      name: this.name.value,
      count: this.count.value,
      listId: this.props.listId
    })
    .then((res) => {
        //updates list with new item
        fetch(`/lists/${this.props.listId}/view`, {credentials: "include"})
        .then(res => res.json())
        .then(items => this.setState({items: items, isCompleted: this.state.isCompleted}))
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
      var change = this.state.isCompleted ? false : true;
      this.setState({items: [...this.state.items], isCompleted: change})
    })
  }

  handleItemDelete(e, itemId){
    e.preventDefault();

    axios.post(`/lists/${this.props.listId}/deleteItem`, {
      itemId: itemId
    })
    .then((res) => {

      fetch(`/lists/${this.props.listId}/view`, {credentials: "include"})
      .then(res => res.json())
      .then(items => this.setState({items: items, isCompleted: this.state.isCompleted}))
      //re-renders items with the one removed
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

        <form onSubmit={this.handleItemAdd}>
        <div>Add Item</div>
            <label>
            Name:
            <input type="text" ref={(name) => this.name = name} />
            </label>
            <label>
            Count:
            <input type="text" ref={(count) => this.count = count} />
            </label>

            <input type="submit" value="Submit" />
      </form>


          <ul>
              {this.state.items.map(item =>
              
                  <li key={item.id}> <Item handleItemDelete={(e) => this.handleItemDelete(e)} 
                  item={item}
                  listId={this.props.listId}/>
                  <button onClick={(e) => this.handleItemDelete(e, item.id)}>Remove</button>

                  </li>
                  )}
          </ul>


      </div>
    );
  }
}

export default ListView;
