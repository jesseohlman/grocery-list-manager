import React, {Component} from "react";

const axios = require("axios");
class UserSignIn extends Component{
    constructor(props){
        super(props);

        this.state = {

        }

        this.handleSignIn = this.handleSignIn.bind(this);
    }

    /*componentDidMount() {

        fetch('/users/user', {credentials: 'include'})//credentials includes req.user in the request
        .then(res => res.json())
        .then(users => this.setState({users: this.state.users.concat(users)}));
    
    }

    renderUsers(){
        var ele = document.getElementById("users");
        ele.innerHTML = this.state.users.map((user) => {return user.email}).join("\n");
    }*/

    handleSignIn(e){
       e.preventDefault();
        
        axios.post("/users/signIn", {
          email: this.email_sign.value,
          password: this.password_sign.value
        })
        .then((res) => {
          console.log("SignIn attempted");
        })
        .catch((err) => {
          console.log(err);
        })
      }


    render(){
        return(
            <div>
                <div>
                <h2>Sign In</h2>
                <form onSubmit={this.handleSignIn}>
                    <div>
                        <label for="email_sign">Email:</label>
                        <input type="text" name="email_sign" ref={(email_sign) => this.email_sign = email_sign} />
                    </div>
                    
                    <div>
                        <label for="password_sign">Password:</label>
                        <input type="text" name="password_sign" ref={(password_sign) => this.password_sign = password_sign} />
                    </div>

                    <input type="submit" value="Submit" />
                </form>
                </div>
            </div>
        )
    }
}

export default UserSignIn;