import React, { Component } from 'react';


class ItemUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: null,
        count: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount(){
    document.getElementById("name").focus();
  }

  handleChange(e){
    this.setState({[e.target.id]: e.target.value})
}

  
  handleSubmit(e){
        e.preventDefault();
        this.props.handleItemAdd( this.state);
        e.target.reset();
  }


  render() {
    return (
      <div>
       <form onSubmit={this.handleSubmit}>
          <div>{this.props.message}</div>
            <div className="form-group">
              <small><label for="name">Name:</label></small>
              <input className="input-small form-control" id="name" type="text" name="name" onChange={this.handleChange} placeholder="name"/>
            </div>
            <div className="form-group">
              <small><label for="count">Amount:</label></small>
              <input className="input-small form-control" id="count" type="text" name="count" onChange={this.handleChange} placeholder="amount"/>
            </div>
              <input type="submit" className="btn btn-primary btn-sm" value="Submit" />
        </form>
      </div>
    )
  }
}

export default ItemUpdate;