import React, { Component } from 'react';

const axios = require("axios");

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isCompleted: false
    };

    this.handleComplete = this.handleComplete.bind(this);

  }

  componentDidMount(){
    this.setState({isCompleted: this.props.item.isAquired});
  }
  
  handleComplete(e, itemId){
    e.persist();

    axios.post(`/lists/${this.props.listId}/completeItem`, {
      itemId: itemId,
      listId: this.props.listId
    })
    .then((res) => {
      //changes completed to true if false and vise versa
      var change = this.state.isCompleted ? false : true;
      this.setState({isCompleted: change})
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
          {this.state.isCompleted ? 
          (<input type="checkbox" name="complete" onChange={(e) => this.handleComplete(e, this.props.item.id)} checked/>) : 
          (<input type="checkbox" name="complete" onChange={(e) => this.handleComplete(e, this.props.item.id)}/>)} 
        </div>     
      </div>
    )
  }
}

export default Item;