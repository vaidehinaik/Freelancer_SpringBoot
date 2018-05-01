import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import * as API from '../api/API';
import Navbar from './Navbar';
import cookie from 'react-cookies';
import {connect} from 'react-redux';
import ReactTooltip from 'react-tooltip';
import EditIcon from 'material-ui-icons/Edit';
import HomeIcon from 'material-ui-icons/Home';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {blue500, red500, green600} from 'material-ui/styles/colors';

class Profile extends Component {
  constructor (props) {
      super(props)
      this.state = {
        userId: null,
        username: this.props.pick.username,
        name: '',
        contact: '',
        aboutMe: '',
        skills: [],
        message: ''
      };
  }

  componentWillMount() {
    console.log("Profile will mount called ... ");
    if(cookie.load('token') === undefined) {
      // Redirect to login page if cookie not found
      this.props.history.push('/');
    }
    var status;
    if (this.props.pick.username !== "") {
      API.userInfo({username: this.props.pick.username})
        .then((res) => {
          status = res.status;
          try {
            return res.json();
          } catch(error) {
            console.log("Error in response: " + error);
          }
        }).then((json) => {
          console.log("my josn resp: " + JSON.stringify(json));
          if (status === 201) {
            if (json.skills === "null") {
              json.skills = ["Add skills to your profile"];
            } else {
              json.skills = json.skills.split(',');
            }
            this.setState({
              userId: json.userId,
              username: json.username,
              name: json.name,
              contact: json.contact,
              aboutMe: json.aboutMe,
              skills: json.skills,
              message: 'Got user data'
            });
            localStorage.setItem('userinfo', JSON.stringify(json));
            console.log("localstorage:" + localStorage.getItem('userinfo'));
            let jsondata = JSON.parse(localStorage.getItem('userinfo'));
            this.props.updateUserInfo(jsondata);
          } else if (status === 401) {
            this.setState({
              message: "Something went wrong. Try again !!!"
            });
          } else {
            this.setState({
              message: "Something went wrong. Try again !!!"
            });
          }
        });
    } else {
      this.setState({message: "Cannot get user details"});
    }
  }

  componentDidMount() {
    if (localStorage.getItem('userinfo') !== null) {
      let jsonData = JSON.parse(localStorage.getItem('userinfo'));
      this.setState({
        userId: jsonData.userId,
        username: jsonData.username,
        name: jsonData.name,
        contact: jsonData.contact,
        aboutMe: jsonData.aboutMe,
        skills: jsonData.skills,
        message: ''
      });
    }
  }

  render() {
      let i = 0;
      let disp_skills = this.state.skills.map((skill) => {
          i += 1;
          let key = "skill_" + i;
          return <i key={key} value={skill}>{skill}<br/></i>
      })
      return (
        <MuiThemeProvider>
          <div className="container-fluid">
            <div className="offset-md-5 col-md-12">
                <img src="/fl-logo.svg" height="80" width="160" className="left-block" alt="logo"/>
            </div>
            <div className="col-md-12 ">
              <Navbar />
              <div className="panel panel-primary">
                <div className="panel-body">
                  <div className="float-right">
                    <Link to={`/editprofile`} className="link">
                    <ReactTooltip />
                      <EditIcon color={blue500} hoverColor={green600} style={{width:30, height:30}} data-tip="Edit Profile"/>
                    </Link>
                  </div>

                  <h4><i>User Name:</i></h4>
                  <p><i>{this.props.pick.userinfo.username}</i></p>
                  <hr/>

                  <h4><i>Name:</i></h4>
                  <p>{this.props.pick.userinfo.name!=="null" ? this.props.pick.userinfo.name: "NA"}</p>
                  <hr/>

                  <h4><i>Contact:</i></h4>
                  <p>{this.props.pick.userinfo.contact!=="null" ? this.props.pick.userinfo.contact: "NA"}</p>
                  <hr/>

                  <h4>About:</h4>
                  <p>{this.props.pick.userinfo.aboutMe!=="null" ? this.props.pick.userinfo.aboutMe: "NA"}</p>
                  <br/><hr/>

                  <h4>Skills:</h4>
                  <p>{disp_skills}</p>
                  <hr/>
                </div>
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      );
    }
}

const mapStateToProps = (state) => {
    return {
      pick: state.reducers
    };
};

const mapDispatchToProps = (dispatch) => {
  return{
      updateUserInfo: (userinfo) => {
          dispatch({
              type: "USERINFO",
              payload : {userinfo:userinfo}
          });
      },
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Profile));
