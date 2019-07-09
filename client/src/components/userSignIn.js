import React, {Component} from "react";

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
                    <div className="form-group">
                        <label for="email_sign">Email:</label>
                        <input className="input-small form-control" type="email" id="email" onChange={this.handleChange} />
                    </div>
                    
                    <div className="form-group">
                        <label for="password_sign">Password:</label>
                        <input className="input-small form-control" type="password" id="password" onChange={this.handleChange} />
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