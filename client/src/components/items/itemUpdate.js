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
    document.getElementById("name-update").focus();
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.handleItemUpdate({name: this.state.name, count: this.state.count, id: this.props.itemId, isAquired: this.props.isAquired});
    e.target.reset();
  }


  render() {
    return (
      <div>
        <form name="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <small><label for="name-update">Name:</label></small>
              <input className="input-small form-control" id="name-update" type="text" name="name" onChange={this.handleChange} placeholder="update name"/>
            </div>

            <div className="form-group">
              <small><label for="count-update">Amount:</label></small>
              <input className="input-small form-control" id="count-update" type="text" name="count"  onChange={this.handleChange} placeholder="update amount"/>
            </div>

            <input type="submit" className="btn btn-primary btn-sm" value="Submit" />
        </form>
      </div>
    )
  }
}

export default ItemUpdate;