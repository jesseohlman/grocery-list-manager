import React, {Component} from "react";
import './signUp.css';
const axios = require("axios");
class UserSignUp extends Component{
    constructor(props){
        super(props);

        this.state = {
            errors: null
        }

        this.handleSignUp = this.handleSignUp.bind(this);
    }

      handleSignUp(e){
        e.preventDefault();

        axios.post("/users/submit", {
            name: this.name.value,
            email: this.email.value,
            password: this.password.value
        })
        .then((errors) => {
            if(errors){
                this.setState({errors: errors.data.errors[0].msg});
            }
        })
        .catch((err) => {
            console.log(err);
        })
        e.target.reset();
    }

    render(){
        return(
            <div>
                <h2>Create your account</h2>
                <div id="err">{this.state.errors}</div>
                <form onSubmit={this.handleSignUp}>
                    <div>
                        <label for="name">Name:</label>
                        <input type="text" name="name" ref={(name) => this.name = name} />
                    </div>

                    <div>
                        <label for="email">Email:</label>
                        <input type="text" name="email" ref={(email) => this.email = email} /><br></br>
                        <small className="reqs">must be a valid email</small>
                    </div>
                    
                    <div>
                        <label for="password">Password:</label>
                        <input type="text" name="password" ref={(password) => this.password = password} /><br></br>
                        <small className="reqs">must be at least 6 characters in length</small>
                    </div>

                    <input type="submit" value="Submit" />
                </form>
        </div>
        )
    }
}

export default UserSignUp;