import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import * as API from '../api/API';
import { ToastContainer, toast } from 'react-toastify';
import cookie from 'react-cookies';
import {connect} from 'react-redux';
import PowerSettingsNewIcon from 'material-ui-icons/PowerSettingsNew';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactTooltip from 'react-tooltip';
import HomeIcon from 'material-ui-icons/Home';
import DashboardIcon from 'material-ui-icons/Dashboard';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import AccountBalanceWallet from 'material-ui-icons/AccountBalanceWallet';
import AddCircleIcon from 'material-ui-icons/AddCircle';
import {blue500, red500, green600} from 'material-ui/styles/colors';

class Navbar extends Component {

  constructor (props) {
      super(props)
      this.state = {
        username: this.props.pick.username,
        message: ''
      };
      this.logout = this.logout.bind(this);
  }

  notify = (message) => {
    toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000
    });
  }

  notifySuccess = (message) => {
    toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
    });
  }

  performLogoutActions = () => {
      console.log("Logging out ...");
      this.props.reset();
      localStorage.clear();
      if (cookie.load('token') !== undefined) {
          console.log("Removing cookie token");
          cookie.remove('token', { path: '/' });
      }
      this.props.history.push('/');
  }

  componentDidMount() {
    if (localStorage.getItem('username') === null) {
        localStorage.setItem('username', this.props.pick.username);
    }
    this.setState({username: localStorage.getItem('username')});
  }

  sleep = (time) => {
      return new Promise((resolve) => setTimeout(resolve, time));
  }

  logout = (event) => {
    event.preventDefault();
    var status;
    API.doLogout({username:this.state.username})
        .then((res) => {
            status = res.status;
            try{
                return res.json();
            }
            catch(error) {
              console.log("Error in response: " + error);
            }
        }).then((json) => {
              if (status === 201) {
                this.setState({
                    message: json.message
                });
                this.notifySuccess(json.message);
            } else if (status === 401) {
                const message = "Failed to Log out... !!!"
                this.setState({
                    message: message
                });
                this.notify(message);
            } else {
                const message = "Server error... Try again later !!!"
                this.setState({
                    message: message
                });
                this.notify(message);
            }
        });
        this.sleep(3000).then(() => {
          console.log("sleep & log out");
          this.performLogoutActions();
        });
  }

  render() {
      return (
      <MuiThemeProvider>
        <div className="container-fluid">
          <nav className="navbar navbar-expand-md bg-light navbar-light">
            <a className="navbar-brand">
              <img src="/fl-small.png"
                 height="40"
                 width="40"
                 className="left-block"
                 alt="logo"/>
              <p><i>{this.props.pick.username}</i></p>
            </a>
            <ul className="navbar-nav">
              <li className="nav-item active">
                <ReactTooltip />
                <Link to={`/home`} className="nav-link" >
                    <HomeIcon color={blue500} hoverColor={green600} style={{width:50, height:50}} data-tip="Home"/>
                </Link>
              </li>
              <li className="nav-item active">
                <ReactTooltip />
                <Link to={`/profile`} className="nav-link">
                    <AccountCircleIcon color={blue500} hoverColor={green600} style={{width:50, height:50}} data-tip="Profile"/>
                </Link>
              </li>
              <li className="nav-item active">
                <Link to={`/dashboard`} className="nav-link">
                  <ReactTooltip />
                  <DashboardIcon color={blue500} hoverColor={green600} style={{width:50, height:50}} data-tip="Dashboard"/>
                </Link>
              </li>
              <li className="nav-item active">
                <ReactTooltip />
                <Link to={`/postproject`} className="nav-link">
                  <AddCircleIcon color={blue500} hoverColor={green600} style={{width:50, height:50}} data-tip="Post Project"/>
                </Link>
              </li>
              <li className="nav-item active">
                <ReactTooltip />
                <Link to={`/transactions`} className="nav-link">
                  <AccountBalanceWallet color={blue500} hoverColor={green600} style={{width:50, height:50}} data-tip="Transactions"/>
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <ReactTooltip />
                <div onClick={this.logout}>
                    <PowerSettingsNewIcon color={red500} hoverColor={green600} style={{width:50, height:50}} data-tip="Logout"/>
                </div>
              </li>
            </ul>
          </nav>
          <ToastContainer />
        </div>
      </MuiThemeProvider>
      );
  }
}

const mapStateToProps = (state) => {
    return{
        pick: state.reducers
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => {
        dispatch({
          type: "RESET"
      });
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
