import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {Pie} from 'react-chartjs-2';
import {CardColumns, Card, CardHeader, CardBody} from 'reactstrap';
import cookie from 'react-cookies';
import Octicon from 'react-octicon';
import * as API from '../api/API';
import {connect} from 'react-redux';
import Navbar from './Navbar';
import * as zoom from 'chartjs-plugin-zoom';

var options= {
  pan:{
      enabled:true,
      mode:'x'
   },
  zoom:{
      enabled:true,
      mode:'xy'
  }
}

class TransactionManager extends Component {

    constructor (props) {
          super(props)
          this.state = {
            username: localStorage.getItem("username"),
            total_funds: '',
            transactions: '',
            input_fund: '',
            message: '',
            pieData:{
                labels: ['Incoming','Outgoing'],
                data: [0,0]
            }
          };
          this.handleInputFunds = this.handleInputFunds.bind(this);
    }

    componentWillMount() {
      console.log("component will mount of transaction manager");
      if(cookie.load('token') === undefined) {
        /*Redirect to login page if cookie not found*/
        this.props.history.push('/');
      }
    }

    componentDidMount() {
      console.log("component did mount called of transaction manager");
      var status;
      document.getElementById("inputErr").style.visibility = "hidden";
      API.allTransactions(localStorage.getItem("username"))
         .then((res) => {
             status = res.status;
             try {
                 return res.json();
              }
              catch(error) {
                console.log("Error in response: " + error);
              }
          }).then((json) => {
             console.log("transaction data: " + JSON.stringify(json));
             if (status === 201) {
                var incoming_amt = 0;
                var outgoing_amt = 0;
                this.props.udpateTotalFunds({"total_funds": json.totalFunds});
                this.props.updateTransactions({"transactions": json.transactions});
                localStorage.setItem('total_funds', json.totalFunds);
                localStorage.setItem('transactions', JSON.stringify(json.transactions));
                json.transactions.forEach(function(transaction) {
                    if (transaction.amountType === "deposit" || transaction.amountType === "received") {
                      incoming_amt =  incoming_amt + transaction.amount;
                    }
                    if (transaction.amountType === "withdraw" || transaction.amountType === "paid") {
                      outgoing_amt =  outgoing_amt + transaction.amount;
                    }
                });
                var data = [incoming_amt, outgoing_amt];
                this.setState({
                   ...this.state,
                   message: json.message,
                   pieData: {
                     labels: ['Incoming','Outgoing'],
                     data: data
                   }
                });
              } else if (status === 401) {
                  const message = "Something went wrong. Try again !!!"
                  this.setState({
                     message: json.message
                  });
                  this.displayErrMsg();
                  this.notify(json.message);
              } else {
                  const message = "Server error... Try again later !!!"
                  this.setState({
                     message: json.message
                  });
                  this.displayErrMsg();
                  this.notify(json.message);
             }
          });
    }

    sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    handleInputFunds = (event) => {
      this.setState({input_fund: event.target.value});
    }

    displayErrMsg() {
      document.getElementById("inputErr").style.visibility = "visible";
      document.getElementById('inputErr').style.display = "inline-block";
    }

    notify = (message) => {
      toast.error(message, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2000
      });
    }

    notifySuccess = (message) => {
      toast.success(message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000
      });
    }

    handleSubmit = (input_fund, fund_type) => {
      console.log("sending funds: " + input_fund);
      console.log("fund type: " + fund_type);
      input_fund = parseInt(input_fund);
      if(input_fund === 0) {
          const message = "Input fund cannot be 0"
          this.setState({
              message: message
          });
          this.displayErrMsg();
          this.notify(message);
      } else {
          var status;
          var payload = {username: this.props.pick.username,
                         amount: input_fund,
                         amountType: fund_type};
          API.doTransaction(payload)
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
                      this.sleep(2000).then(() => {
                        console.log("time to sleep");
                        window.location.reload();
                      });
                  } else if (status === 401) {
                      const message = "Something went wrong. Try again !!!"
                      this.setState({
                          message: json.message
                      });
                      this.displayErrMsg();
                      this.notify(json.message);
                  } else {
                      const message = "Server error... Try again later !!!"
                      this.setState({
                          message: json.message
                      });
                      this.displayErrMsg();
                      this.notify(json.message);
                  }
              });
        }
    }

    render() {
      const chartData = {
                      labels: this.state.pieData.labels,
                      datasets: [{
                      data: this.state.pieData.data,
                      backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'],
                      hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56']
                      }]
                  };

          return (
            <div className="container">
                <div className="row justify-content-md-center">
                    <img src="/fl-logo.svg" height="150" width="200" className="left-block" alt="logo"/>
                    <div className="col-md-12 col-md-offset-2 mx-auto">
                      <Navbar />
                    </div>
                </div>
                <br/>
                <div className="row">
                  <div className="col">
                    <div className="panel panel-primary">
                      <div className="panel-body">
                        <form>
                            <div className="form-group">
                                <h4><i>USER: {this.props.pick.username} - Current Funds: ${localStorage.getItem("total_funds")}</i></h4>
                                <br/>
                                <h3><i>Make Transactions</i></h3>
                                <br/>
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    label="amount"
                                    placeholder="Input Amount"
                                    value={this.state.input_fund}
                                    onChange={this.handleInputFunds}
                                />
                            </div>
                            <div className="form-group">
                                <button
                                    className="btn btn-success"
                                    type="button"
                                    onClick={() => this.handleSubmit(this.state.input_fund, "deposit")}>
                                        Add Money
                                </button>
                                <span>&nbsp;&nbsp;&nbsp;</span>
                                <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={() => this.handleSubmit(this.state.input_fund, "withdraw")}>
                                        Withdraw
                                </button>
                                <hr></hr>
                            </div>
                            <div className="form-group">
                                <div id="inputErr" className="alert alert-danger">
                                    <Octicon name="alert"/>
                                </div>
                                <ToastContainer />
                            </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="panel panel-primary">
                      <div className="panel-body">
                        <Card>
                          <CardHeader>
                              <label className="h4">Pie Chart</label>
                          </CardHeader>
                          <Card>
                            <CardHeader>
                                Incoming Outgoing Income
                                <div className="card-actions">
                                    <a href="#">
                                        <small className="text-muted">Zoom In</small>
                                    </a>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="chart-wrapper">
                                  <Pie data={chartData} options={options}/>
                                </div>
                            </CardBody>
                          </Card>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="panel panel-primary">
                  <div className="panel-body">
                    <div className="panel-body">
                        <h2 className="text-center"><b>*** TRANSACTION HISTORY ***</b></h2>
                        <hr/><br/>
                        <UserTransactions transactions={JSON.parse(localStorage.getItem("transactions"))}/>
                    </div>
                  </div>
                </div>
            </div>
          );
      }
  }

  class UserTransactions extends Component {

    render () {
      let transactions = <h2><i>
                          "No Transactions History Yet ..."
                          <span>&nbsp;&nbsp;&nbsp;</span>
                        </i></h2>;
      let my_trans;
      if (this.props.transactions === null) {
        my_trans = [];
      } else {
        my_trans = this.props.transactions;
      }
      if (my_trans.length !== 0) {
          transactions = this.props.transactions.map((transaction, index) => {
              let type_of_amount = "";
              let name = transaction.userId.name;
              if (transaction.amountType === 'deposit') {
                type_of_amount = "deposited by";
              } else if(transaction.amountType === 'withdraw') {
                type_of_amount = "withdrawn by";
              } else if(transaction.amountType === 'funded') {
                type_of_amount = "paid to";
              } else if(transaction.amountType === 'received') {
                type_of_amount = "credited by";
              } else {
                type_of_amount = "Unknown";
              }
              if(transaction.userId.username === localStorage.getItem("username")) {
                name = "you";
              }
              return <div key={index} className="row">
                        <p>
                          Transaction Time: {transaction.transactionEntryTime}
                          Amount <b>${transaction.amount}</b> was {type_of_amount} {name}
                        </p>
                     </div>
        });
      }
      return (
        <div className="container-fluid">
          <h3><i><b>
            TOTAL TRANSACTIONS: {my_trans.length}
          </b></i></h3>
          <br/><hr/>
          {transactions}
        </div>
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
          udpateTotalFunds: (payload) => {
              dispatch({
                  type: "TOTAL_FUNDS",
                  payload: {total_funds: payload.total_funds}
              });
          },
          updateTransactions: (payload) => {
            dispatch({
                type: "TRANSACTIONS",
                payload: {transactions : payload.transactions}
            });
          }
      };
  };

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(TransactionManager));
