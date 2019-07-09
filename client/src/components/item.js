import React, { Component } from 'react';


const axios = require("axios");

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
        item: {},
        isCompleted: false
    };

    this.handleComplete = this.handleComplete.bind(this);
  }

  componentDidMount(){
    this.setState({item: this.props.item, isCompleted: this.props.item.isAquired});
  }

  
  handleComplete(e, itemId){
    axios.post(`/lists/${this.props.listId}/completeItem`, {
      itemId: itemId,
      listId: this.props.listId
    })
    .then((res) => {
      var change = this.state.isCompleted ? false : true;
      this.setState({item: this.state.item, isCompleted: change})
    })
  }


  render() {
    var isAquired = this.state.isCompleted;
    return (
      <div>
        <strong>Item:</strong> {this.state.item.name}<br></br><small><strong>Amount:</strong> {this.state.item.count}</small>
        <div><label for="complete">Item Aquired: </label>{isAquired ? (<input type="checkbox" name="complete" onChange={(e) => this.handleComplete(e, this.state.item.id)} checked/>) : (<input type="checkbox" name="complete" onChange={(e) => this.handleComplete(e, this.state.item.id)}/>)} </div>     
      </div>
    )
  }
}

export default Item;