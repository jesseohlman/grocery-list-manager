import React, {Component} from "react";

const axios = require("axios");

class UserSignUp extends Component{
    constructor(props){
        super(props);

        this.state = {
            message: null
        }

        this.handleSignUp = this.handleSignUp.bind(this);

    }

    componentDidMount(){
        document.getElementById("name").focus();
        this.setState({message: null});
    }

    handleSignUp(e){
        e.preventDefault();

        axios.post("/users/submit", {
            name: this.name.value,
            email: this.email.value,
            password: this.password.value
        })
        .then((res) => {
            if(res.data.errors){
                this.setState({message: res.data.errors[0].msg});
            }
            else if(res.data.message){
                this.setState({message: res.data.message});
            } 
        })
        .catch((err) => {
            console.log(err);
        })
        e.target.reset();
    }

    render(){
        return(
            <div className="SignInForm">
                <h2>Create your account</h2>
                <div id="err">{this.state.message}</div>
                <form onSubmit={this.handleSignUp}>
                    <div className="form-group">
                        <label for="name">Name:</label>
                        <input className="input-small form-control" type="text" id="name" name="name" ref={(name) => this.name = name} placeholder="your name"/>
                    </div>

                    <div className="form-group">
                        <label for="email">Email:</label>
                        <input className="input-small form-control" type="email" name="email" ref={(email) => this.email = email} placeholder="valid email"/>
                        <small className="form-text text-muted">must be a valid email</small>
                    </div>
                    
                    <div className="form-group">
                        <label for="password">Password:</label>
                        <input className="input-small form-control" type="password" name="password" ref={(password) => this.password = password} placeholder="password"/>
                        <small className="form-text text-muted">must be at least 6 characters in length</small>
                    </div>

                    <input className="btn btn-primary" type="submit" value="Submit" />
                </form>
        </div>
        )
    }
}

export default UserSignUp;