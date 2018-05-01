import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import cookie from 'react-cookies';
import * as API from '../api/API';
import {connect} from 'react-redux';
import Navbar from './Navbar';
import ReactTooltip from 'react-tooltip';
import InfoIcon from 'material-ui-icons/InfoOutline';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

class Home extends Component {

  constructor (props) {
      super(props)
      this.state = {
        name: '',
        username: '',
        userProjects: [],
        userBidProjects: [],
        message: '',
        fixedHeader: false,
        stripedRows: true,
        showRowHover: true,
        selectable: true,
        multiSelectable: false,
        enableSelectAll: false,
        deselectOnClickaway: true,
        showCheckboxes: true,
        height: '400px'
      };

      this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

  navigateToPostedProject = (row_key) => {
    if (row_key.length === 0) {
      return;
    }
    console.log(row_key);
    console.log(this.props.pick.userProjects[row_key].projectId)
    localStorage.setItem('projectId', this.props.pick.userProjects[row_key].projectId)
    this.sleep(1000).then(() => {
      this.props.history.push('/projectinfo');
    });
  }

  navigateToBidProject = (row_key) => {
    if (row_key.length === 0) {
      return;
    }
    console.log(row_key);
    console.log(this.props.pick.userBidProjects[row_key].projectId)
    localStorage.setItem('projectId', this.props.pick.userBidProjects[row_key].projectId)
    this.sleep(1000).then(() => {
      this.props.history.push('/projectinfo');
    });
  }

  sleep = (time) => {
      return new Promise((resolve) => setTimeout(resolve, time));
  }

  componentDidMount() {
    console.log("willmount Home called ... ");
    if(cookie.load('token') === undefined) {
      /*Redirect to login page if cookie not found*/
      this.props.history.push('/');
    } else {
      var resp_status_1;
      var resp_status_2;
      API.userProjects(localStorage.getItem('username'))
        .then((res) => {
          resp_status_1 = res.status;
          try {
            return res.json();
          } catch(error) {
            console.log("Error in response: " + error);
          }
        }).then((json) => {
          if(resp_status_1 === 201) {
            localStorage.setItem('userProjects', JSON.stringify(json.results));
            this.props.storeUserProjects(JSON.parse(localStorage.getItem('userProjects')));
            this.setState({
              userProjects: JSON.parse(localStorage.getItem('userProjects')),
              message: json.message
            });
          } else if (resp_status_1 === 401) {
              this.setState({
                  message: json.message
              });
          } else {
              const message = "Failed to load user projects ... try again later !!!"
              this.setState({
                  message: message
              });
          }
        });

      API.userBidProjects(localStorage.getItem('username'))
        .then((res) => {
          resp_status_2 = res.status;
          try {
            return res.json();
          } catch(error) {
            console.log("Error in response: " + error);
          }
        }).then((json) => {
          if(resp_status_2 === 201) {
            localStorage.setItem('userBidProjects', JSON.stringify(json.results));
            this.props.storeUserBidProjects(JSON.parse(localStorage.getItem('userBidProjects')));
            this.setState({
              userBidProjects: JSON.parse(localStorage.getItem('userBidProjects')),
              message: json.message
            });
          } else if (resp_status_2 === 401) {
              this.setState({
                  message: json.message
              });
          } else {
              const message = "Failed to load user bid projects ... try again later !!!"
              this.setState({
                  message: message
              });
          }
      });
    }
  }

  render() {
      return (
        <MuiThemeProvider>
          <div className="container">
              <div className="row mx-auto">
                <div className="col-sm-6 col-sm-offset-3">
                  <img src="/fl-logo.svg" height="120" width="160" className="left-block" alt="logo"/>
                </div>
                <div className="col-md-12 col-md-offset-2 mx-auto">
                  <Navbar />
                </div>
              </div>
              <div className="col-sm-12">
                  <Table
                    onRowSelection={this.navigateToPostedProject.bind(this)}
                    height={this.state.height}
                    fixedHeader={this.state.fixedHeader}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}>
                      <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}>
                          <TableRow>
                            <TableHeaderColumn colSpan="7" tooltip="" style={{textAlign: 'left'}}>
                              <h3><b><i>{this.props.pick.username} Projects</i></b></h3>
                            </TableHeaderColumn>
                          </TableRow>
                          <TableRow>
                            <TableHeaderColumn tooltip="Project Number">#</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Project">Project</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Project Owner">Employer</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Total Bids">Bids Count</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Average Bid Amount">Avg Bid ($)</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Low Budget ($)">Lower Budget ($)</TableHeaderColumn>
                            <TableHeaderColumn tooltip="High Budget ($)">Higher Budget ($)</TableHeaderColumn>
                          </TableRow>
                      </TableHeader>
                      <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}>
                        {
                          this.props.pick.userProjects.map((project, index) => (
                            <TableRow key={index}>
                              <TableRowColumn>{index+1}</TableRowColumn>
                              <TableRowColumn style={{whiteSpace: 'normal',wordWrap: 'break-word'}}>{project.title}</TableRowColumn>
                              <TableRowColumn>{project.employer}</TableRowColumn>
                              <TableRowColumn>{project.bidsCount}</TableRowColumn>
                              <TableRowColumn>{project.averageBidAmount}</TableRowColumn>
                              <TableRowColumn>{project.budgetLow}</TableRowColumn>
                              <TableRowColumn>{project.budgetHigh}</TableRowColumn>
                            </TableRow>
                        ))}
                      </TableBody>
                  </Table>
              </div>

              <div className="col-sm-12">
                  <Table
                    onRowSelection={this.navigateToBidProject.bind(this)}
                    height={this.state.height}
                    fixedHeader={this.state.fixedHeader}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}>
                      <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}>
                          <TableRow>
                            <TableHeaderColumn colSpan="8" tooltip="" style={{textAlign: 'left'}}>
                              <h3><b><i>{this.props.pick.username} Bids</i></b></h3>
                            </TableHeaderColumn>
                          </TableRow>
                          <TableRow>
                            <TableHeaderColumn tooltip="Project Number">#</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Project">Project</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Project Owner">Employer</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Your Bid Amount">Bid Amount</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Your project completion estimation in days">Estimated Days</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Average Bid Amount of project">Avg Bid ($)</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Lower Budget of project">Lower Budget ($)</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Higher Budget of project">Higher Budget ($)</TableHeaderColumn>
                          </TableRow>
                      </TableHeader>
                      <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}>
                        {
                          this.props.pick.userBidProjects.map((project, index) => (
                            <TableRow key={index}>
                              <TableRowColumn>{index+1}</TableRowColumn>
                              <TableRowColumn style={{whiteSpace: 'normal',wordWrap: 'break-word'}}>{project.title}</TableRowColumn>
                              <TableRowColumn>{project.employer}</TableRowColumn>
                              <TableRowColumn>{project.bidAmount}</TableRowColumn>
                              <TableRowColumn>{project.periodInDays}</TableRowColumn>
                              <TableRowColumn>{project.averageBidAmount}</TableRowColumn>
                              <TableRowColumn>{project.budgetLow}</TableRowColumn>
                              <TableRowColumn>{project.budgetHigh}</TableRowColumn>
                            </TableRow>
                        ))}
                      </TableBody>
                  </Table>
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
    return {
        updateProjectId: (projectId) => {
            dispatch({
                type: "PROJECT_ID",
                payload : {projectId:projectId}
            });
        },
        storeUserProjects: (userProjects) => {
            dispatch({
                type: "USER_PROJECTS",
                payload : {userProjects:userProjects}
            });
        },
        storeUserBidProjects: (userBidProjects) => {
            dispatch({
                type: "USER_BID_PROJECTS",
                payload : {userBidProjects:userBidProjects}
            });
        },
    };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Home));
