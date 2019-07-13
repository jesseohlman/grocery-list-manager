import React, {Component} from "react";

const axios = require("axios");

class UserSignIn extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: null,
            password: null,
            message: null
       }

        this.handleChange = this.handleChange.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);


    }

    componentDidMount(){
        document.getElementById("email").focus();
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value})
    }

    handleSignIn(e){  
        e.preventDefault();

        axios.post("/users/signIn", {
          email: this.state.email,
          password: this.state.password,
        })
        .then((res) => {
         fetch("/users", {credentials: "include"})
         .then(res => res.json())
         .then((user) => {
           this.setState({message: res.data.message});
           this.props.afterSignIn(user);
         })
        })
        .catch((err) => {
          console.log(err);
        });
        
        e.target.reset();
      }

    render(){
        return(
            <div className="SignInForm">
                <div>
                <h2>Sign In</h2>
                <div>{this.state.message}</div>
                <form onSubmit={this.handleSignIn}>
                    <div className="form-group">
                        <label for="email">Email:</label>
                        <input className="input-small form-control" type="email" id="email" name="email" onChange={this.handleChange} placeholder="email"/>
                    </div>
                    
                    <div className="form-group">
                        <label for="password">Password:</label>
                        <input className="input-small form-control" type="password" id="password" name="password" onChange={this.handleChange} placeholder="password"/>
                    </div>
                    <br></br>
                    <input className="btn btn-primary" type="submit" value="Submit" />
                </form>
                </div>
            </div>
        )
    }
}

export default UserSignIn;