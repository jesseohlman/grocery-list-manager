import React, { Component } from 'react';

import Item from "./item";

const axios = require("axios");

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        items: []
    };

    this.handleCreate = this.handleCreate.bind(this);
    this.handleDelete  =this.handleDelete.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  }

  componentDidMount() {
    fetch(`/lists/${this.props.listId}/view`, {credentials: "include"})
    .then(res => res.json())
    .then(items => this.setState({items: this.state.items.concat(items)}))
  }



  handleCreate(e){
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
        .then(items => this.setState({items: this.state.items.concat(items[items.length - 1])}))
    })
    .catch((err) => {
      console.log(err);
    })

  }

  handleComplete(e, itemId){
    axios.post(`/lists/${this.props.listId}/completeItem`, {
      itemId: itemId,
      listId: this.props.listId
    })
  }

  handleDelete(e, itemId){
    e.preventDefault();

    axios.post(`/lists/${this.props.listId}/deleteItem`, {
      itemId: itemId
    })
    .then((res) => {

      fetch(`/lists/${this.props.listId}/view`, {credentials: "include"})
      .then(res => res.json())
      .then(items => this.setState({items: items}))
      //re-renders items with the one removed
    })
    .catch((err) => {
      console.log(err);
    })

  }

  render() {
    //MAYBE CONVERT THE ITEMS AND THEIR FUNCTIONS TO DIFFERENT COMPONENT
    return (
      <div>
        <form onSubmit={this.handleCreate}>
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
                  <li key={item.id}> <Item handleDelete={(e) => this.handleDelete(e)} 
                  itemId={item.id}
                  listId={this.props.listId}/>
                  </li>
                  )}
          </ul>


      </div>
    );
  }
}

export default ListView;
