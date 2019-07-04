import React, { Component } from 'react';


const axios = require("axios");

class List extends Component {
  constructor() {
    super();
    this.state = {
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
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })

  }

  render() {
    return (
      <div>
        <h2>List</h2>
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
