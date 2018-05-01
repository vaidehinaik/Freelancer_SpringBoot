import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Octicon from 'react-octicon';
import * as API from '../api/API';

class Signup extends Component {
  constructor (props) {
        super(props)
        this.state = {
          name: '',
          username: '',
          password: '',
          message: ''
        };
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
  }

  componentDidMount() {
    document.getElementById("signupMsg").style.visibility = "hidden";
  }

  handleNameInput(event) {
    this.setState({name: event.target.value});
  }

  handleUsernameInput(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordInput(event) {
    this.setState({password: event.target.value});
  }

  displayMsg() {
    document.getElementById("signupMsg").style.visibility = "visible";
    document.getElementById('signupMsg').style.display="inline-block";
  }

  proceedToLogin() {
    this.props.history.push('/');
  }

  handleSubmit = (signupInfo) => {
    if(signupInfo.name ==="" || signupInfo.username==="" || signupInfo.password==="") {
        this.setState({
            message: "Enter all user details to proceed !!!"
        });
        this.displayMsg();
    } else {
        var status;
        API.doSignup(signupInfo)
            .then((res) => {
                status = res.status;
                return res.json;
            }).then((json) => {
                if (status === 201) {
                    this.setState({
                        message: json.message
                    });
                    this.displayMsg();
                    this.proceedToLogin();
                } else if (status === 200) {
                    this.setState({
                        message: json.message
                    });
                    this.displayMsg();
                } else if (status === 401) {
                    this.setState({
                        message: "Something went wrong. Try signing up again !!!"
                    });
                    this.displayMsg();
                } else {
                    this.setState({
                        message: "Server error... Try signing up later !!!"
                    });
                    this.displayMsg();
                }
        });
      }
  }

  render() {
        return (
          <div className="container-fluid">
            <br></br><br></br><br></br><br></br><br></br>
            <div className="row justify-content-md-center">
                <div className="col-md-12 col-md-offset-2 mx-auto">
                </div>
                <div className="col-md-6 col-sm-12 col-lg-6">
                    <div className="panel panel-primary">
                        <br></br><br></br><br></br><br></br><br></br>
                        <div className="panel-body">
                            <form name="myform">
                                <div className="form-group">
                                    <h1>
                                      <img src="/fl-small.png"
                                           height="50"
                                           width="50"
                                           className="left-block"
                                           alt="logo"
                                      />
                                      <span> SignUp</span>
                                    </h1>
                                </div>
                                <br></br>
                                <div className="form-group">
                                    <div className="panel-heading">
                                      <h5><b><i>Register:</i></b></h5>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        label="Name *"
                                        placeholder="Name"
                                        required="required"
                                        value={this.state.name}
                                        onChange={this.handleNameInput}
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        label="Username *"
                                        placeholder="Username"
                                        required="required"
                                        value={this.state.username}
                                        onChange={this.handleUsernameInput}
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="password"
                                        label="Password *"
                                        placeholder="Password"
                                        required="required"
                                        value={this.state.password}
                                        onChange={this.handlePasswordInput}
                                    />
                                </div>

                                <div className="form-group">
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={() => this.handleSubmit(this.state)}>
                                        SignUp
                                    </button>
                                    <hr></hr>
                                    <p>Already a <i><b>freelancer.com</b></i> member?
                                        <Link to={`/`} className="link">
                                            Login
                                        </Link>
                                    </p>
                                </div>

                                <div className="form-group">
                                    <div id="signupMsg" className="alert alert-warning">
                                        <Octicon name="alert"/> {this.state.message}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default withRouter(Signup);
