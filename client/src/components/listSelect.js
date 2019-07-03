import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import ListView from "./listView";

const axios = require("axios");

class ListSelect extends Component {
  constructor() {
    super();
    this.state = {
        lists: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("/lists/select", {credentials: "include"})
    .then(res => res.json())
    .then(lists => this.setState({lists: this.state.lists.concat(lists)}))
  }

  renderLists(){
    var ele = document.getElementById("lists");
    ele.innerHTML = this.state.users.map((user) => {return user.email}).join("\n");
  }

  handleSubmit(e){
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

       <Router>
            <ul>
                {this.state.lists.map(list =>
                    <li key={list.id}><Link to={"/lists/" + list.id + "/view"}>Title: {list.title}<br></br><small>Store: {list.store}</small></Link>

                        <Route path={"/lists/" + list.id + "/view"}
                         render={(props) => 
                             <ListView {...props} listId={list.id}/>}>
                        </Route>
                    </li>
                    )}
            </ul>
                    
        </Router>
                
     
      </div>
    );
  }
}

export default ListSelect;
