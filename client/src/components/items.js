const sequelize  = require("../../../src/db/models").Sequelize;
const Item  = require("../../../src/db/models").Item;
const User  = require("../../../src/db/models").User;


import React, { Component } from 'react';
import './items.css';

class Items extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    Item.findAll()
    .then((items) => {
      this.setState({items: items});
    })
    .catch((err) => {
      console.log(err);
      this.setState({items: "error"});
    })
  }

  render() {
    return (
      <div>
        <h2>Items</h2>
        <ul>
        {this.state.items.map((item) => 
          <li key={item.id}>name: {item.name} aquired:{item.isAquired}</li>
        )}
        </ul>
      </div>
    );
  }
}

export default Items;
