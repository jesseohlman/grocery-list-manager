import React, { Component } from 'react';


class ListUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: null,
        store: null,
        id: this.props.listId
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(e){
    this.setState({[e.target.id]: e.target.value, id: this.state.id})
}

  
  handleSubmit(e){
        e.preventDefault();
        this.props.handleListUpdate(this.state);
        e.target.reset();
  }


  render() {
    return (
      <div>
     <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <small><label for="title">Title:</label></small>
              <input className="input-small form-control" id="title" type="text" name="title" onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <small><label for="store">Store:</label></small>
              <input className="input-small form-control" id="store" type="text" name="store"  onChange={this.handleChange} />
            </div>
              <input type="submit" className="btn btn-primary btn-sm" value="Submit" />
        </form>
      </div>
    )
  }
}

export default ListUpdate;