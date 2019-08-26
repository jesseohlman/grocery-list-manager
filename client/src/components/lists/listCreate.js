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

  componentDidMount(){
    document.getElementById("title").focus();
  }

  handleCreate(e){
    e.preventDefault();

    axios.post("/lists/create", {
      title: this.title.value,
      store: this.store.value
    })
    .then((res) => {
      if(res.data.message){
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
      <div className="create-form">
        <h2>Create List</h2>
        <div>{this.state.message}</div>
          
          <form onSubmit={this.handleCreate}>
            <div className="from-group">
                <label for="title">List Title:</label>
                <input className="input-small form-control" id="title" type="text" name="title" ref={(title) => this.title = title} placeholder="title"/>
            </div>

            <div className="from-group">
                <label for="store">Store Name:</label>
                <input className="input-small form-control" type="text" name="store" ref={(store) => this.store = store} placeholder="store"/>
            </div>
            <br></br>
            
            <input type="submit" className="btn btn-primary" value="Submit" />
          </form>

      </div>
    );
  }
}

export default List;
