import React, { Component } from 'react';
import './items.css';





class Items extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
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
  componentDidMount() {
    fetch('/')
      //.then(res => res.json())
      //.then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));
  }

  handleSubmit(e){
    e.preventDefault;

    
    const data = new FormData(e.target);


    fetch("/items/submit", {
      method: 'POST',
      body: "cookies"
    })
    .then((response)=>{
      alert(response.json())})
  }

  render() {
    return (
      <div>
        <h2>Items</h2>
        <ul>
          <form onSubmit={this.handleSubmit}>
            <label for="name">name:</label>
            <input type="text" name="name"/>
           
            <button type="submit">submit</button>
          </form>

        </ul>
      </div>
    );
  }
}

export default Items;
