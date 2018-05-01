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
        message: '',
        allProjects: [],
        fixedHeader: false,
        stripedRows: true,
        showRowHover: true,
        selectable: true,
        multiSelectable: false,
        enableSelectAll: false,
        deselectOnClickaway: true,
        showCheckboxes: true,
        height: '600px'
      };

      this.handleChange = this.handleChange.bind(this);
      this.navigateToProjectInfo = this.navigateToProjectInfo.bind(this);
  }

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

  navigateToProjectInfo = (row_key) => {
    if (row_key.length === 0) {
      return;
    }
    console.log(row_key);
    localStorage.setItem('projectId', this.props.pick.allProjects[row_key].projectId)
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
      var status;
      API.allProjects()
        .then((res) => {
          status = res.status;
          try {
            return res.json();
          } catch(error) {
            console.log("Error in response: " + error);
          }
        }).then((json) => {
          if(status === 201) {
            localStorage.setItem('allProjects', JSON.stringify(json.results));
            this.props.storeAllProjects(JSON.parse(localStorage.getItem('allProjects')));
            this.setState({
              allProjects: JSON.parse(localStorage.getItem('allProjects')),
              message: json.message
            });
          } else if (status === 401) {
              this.setState({
                  message: json.message
              });
          } else {
              const message = "Failed to load all projects ... try again later !!!"
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
                <div className="col-sm-6">
                  <img src="/fl-logo.svg" height="120" width="160" className="left-block" alt="logo"/>
                </div>
                <div className="col-md-12 col-md-offset-2 mx-auto">
                  <Navbar />
                </div>
              </div>
              <div className="col-sm-12">
                  <Table
                      onRowSelection={this.navigateToProjectInfo}
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
                              <h3><b><i>Freelancer Projects</i></b></h3>
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
                          this.props.pick.allProjects.map((project, index) => (
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
        storeAllProjects: (allProjects) => {
            dispatch({
                type: "ALL_PROJECTS",
                payload : {allProjects:allProjects}
            });
        },
    };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Home));
