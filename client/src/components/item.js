import React, { Component } from 'react';

const axios = require("axios");

class Item extends Component {
  constructor(props) {
    super(props);

    this.handleComplete = this.handleComplete.bind(this);

  }
  
  handleComplete(e, itemId){
    e.persist();

    axios.post(`/lists/${this.props.listId}/completeItem`, {
      itemId: itemId,
      listId: this.props.listId
    })
    .then((res) => {
      //changes completed to true if false and vise versa
      this.props.afterItemAdd();
    })
    .catch((err) => {
      console.log(err);
    })
  }


  render() {
    return (
      <div>
        <div className="name-display">
          <strong>Name:</strong> {this.props.item.name}
        </div>
        
        <small className="amount-display">
          <strong>Amount:</strong> {this.props.item.count}
        </small>

        <div className="complete-box">
          <label for="complete">Item Aquired: </label>
          {this.props.item.isAquired ? 
          (<input type="checkbox" name="complete" onChange={(e) => this.handleComplete(e, this.props.item.id)} checked/>) : 
          (<input type="checkbox" name="complete" onChange={(e) => this.handleComplete(e, this.props.item.id)}/>)} 
        </div>     
      </div>
    )
  }
}

export default Item;