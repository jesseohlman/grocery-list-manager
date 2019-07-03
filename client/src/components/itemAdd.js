import React, { Component } from 'react';
import './items.css';

const axios = require("axios");

class ItemAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*componentDidMount() {
    Item.findAll()
    .then((items) => {
      this.setState({items: items});
    })
    .catch((err) => {
      console.log(err);
      this.setState({items: "error"});
    })
  }*/


  handleSubmit(e){
    e.preventDefault();

    axios.post(`/lists/${this.props.listId}/addItem`, {
      name: this.name.value,
      count: this.count.value,
      listId: this.props.listId
    })
    .then((res) => {
    })
    .catch((err) => {
      console.log(err);
    })

  }

  render() {
    return (
      <div>
        <h2>Items</h2>
        <ul>
        <form onSubmit={this.handleSubmit}>
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

        </ul>
      </div>
    );
  }
}

export default ItemAdd;
