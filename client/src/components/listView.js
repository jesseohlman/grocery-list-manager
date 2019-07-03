import React, { Component } from 'react';


const axios = require("axios");

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        items: [],
        currentListId: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(`/lists/${this.props.listId}/view`, {credentials: "include"})
    .then(res => res.json())
    .then(items => this.setState({items: this.state.items.concat(items)}))
  }



  handleSubmit(e){
      console.log("handleSubmit");
    e.preventDefault();

    axios.post(`/lists/${this.props.listId}/addItem`, {
      name: this.name.value,
      count: this.count.value,
      listId: this.props.listId
    })
    .then((res) => {
        //updates list with new item
        fetch(`/lists/${this.props.listId}/view`, {credentials: "include"})
        .then(res => res.json())
        .then(items => this.setState({items: this.state.items.concat(items)}))
    })
    .catch((err) => {
      console.log(err);
    })

  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <div>Add Item</div>
            <label>
            Name:
            <input type="text" ref={(name) => this.name = name} />
            </label>
            <label>
            Count:
            <input type="text" ref={(count) => this.count = count} />
            </label>

            <input type="submit" value="Submit" />
      </form>

        <ul>
            {this.state.items.map(item =>
                <li key={item.id}>name: {item.name}<br></br><small>count: {item.count}</small></li>
                )}
        </ul>

      </div>
    );
  }
}

export default ListView;
