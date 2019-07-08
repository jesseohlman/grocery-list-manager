import React, { Component } from 'react';


const axios = require("axios");

class ItemUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: null,
        count: null,
        id: this.props.itemId
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(e){
    this.setState({[e.target.id]: e.target.value, id: this.state.id})
}

  
  handleSubmit(e){
        e.preventDefault();
        this.props.handleItemUpdate( this.state);
        e.target.reset();
  }


  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <div>Update Item</div>
            <label>
            Name:
            <input type="text" id="name" onChange={this.handleChange} />
            </label>
            <label>
            Amount:
            <input type="text" id="count" onChange={this.handleChange} />
            </label>

            <input type="submit" value="Submit" />
      </form>
      </div>
    )
  }
}

export default ItemUpdate;