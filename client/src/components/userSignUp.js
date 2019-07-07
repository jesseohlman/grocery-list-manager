import React, {Component} from "react";

const axios = require("axios");
class UserSignUp extends Component{
    constructor(props){
        super(props);

        this.state = {
            users: []
        }

        this.handleSignUp = this.handleSignUp.bind(this);
    }

    componentDidMount() {

        fetch('/users/user', {credentials: 'include'})//credentials includes req.user in the request
        .then(res => res.json())
        .then(users => this.setState({users: this.state.users.concat(users)}));
    
    }

      handleSignUp(e){
        e.preventDefault();
        console.log("submitted");

        axios.post("/users/submit", {
            name: this.name.value,
            email: this.email.value,
            password: this.password.value
        })
        .then((res) => {
            console.log("user submitted")
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render(){
        return(
            <div>
                <h2>Create your account</h2>
                <form onSubmit={this.handleSignUp}>
                    <div>
                        <label for="name">Name:</label>
                        <input type="text" name="name" ref={(name) => this.name = name} />
                    </div>

                    <div>
                        <label for="email">Email:</label>
                        <input type="text" name="email" ref={(email) => this.email = email} />
                    </div>
                    
                    <div>
                        <label for="password">Password:</label>
                        <input type="text" name="password" ref={(password) => this.password = password} />
                    </div>

                    <input type="submit" value="Submit" />
                </form>
        </div>
        )
    }
}

export default UserSignUp;