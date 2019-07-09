import React, { Component } from 'react';


class ItemUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: null,
        count: null,
        id: this.props.itemId,
        isAquired: this.props.isAquired
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
            <div className="form-group">
              <small><label for="name">Name:</label></small>
              <input className="input-small form-control" id="name" type="text" name="name" onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <small><label for="count">Amount:</label></small>
              <input className="input-small form-control" id="count" type="text" name="count"  onChange={this.handleChange} />
            </div>
              <input type="submit" className="btn btn-primary btn-sm" value="Submit" />
        </form>
      </div>
    )
  }
}

export default ItemUpdate;