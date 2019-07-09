import React, { Component } from 'react';


const axios = require("axios");

class List extends Component {
  constructor() {
    super();
    this.state = {
      message: null
    };

    this.handleCreate = this.handleCreate.bind(this);
  }


  handleCreate(e){
    e.preventDefault();

    axios.post("/lists/create", {
      title: this.title.value,
      store: this.store.value
    })
    .then((res) => {
      if(res.data){
        this.setState({message: res.data.message});
      } else {
        this.setState({message: `List ${this.title.value} has been created`});
      }
    })
    .catch((err) => {
      console.log(err);
    })
    e.target.reset();

  }

  render() {
    return (
      <div>
        <h2>Create List</h2>
        <div>{this.state.message}</div>
        <ul>
        <form onSubmit={this.handleCreate}>
        <div>
            <label for="title">List Title:</label>
            <input type="text" name="title" ref={(title) => this.title = title} />
        </div>

        <div>
            <label for="store">Store Name:</label>
            <input type="text" name="store" ref={(store) => this.store = store} />
        </div>
        
        <input type="submit" value="Submit" />
      </form>

        </ul>
      </div>
    );
  }
}

export default List;
