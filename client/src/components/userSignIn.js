import React, {Component} from "react";

const axios = require("axios");
class UserSignIn extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: null,
            password: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault();

        this.props.handleSignIn(this.state);
    }



    render(){
        return(
            <div>
                <div>
                <h2>Sign In</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label for="email_sign">Email:</label>
                        <input type="text" id="email" onChange={this.handleChange} />
                    </div>
                    
                    <div>
                        <label for="password_sign">Password:</label>
                        <input type="text" id="password" onChange={this.handleChange} />
                    </div>

                    <input type="submit" value="Submit" />
                </form>
                </div>
            </div>
        )
    }
}

export default UserSignIn;