import React, {Component} from "react";

import './signIn.css';

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
        e.target.reset();
    }



    render(){
        return(
            <div className="SignInForm">
                <div>
                <h2>Sign In</h2>
                <div>{this.props.message}</div>
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