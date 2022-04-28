import React from 'react';

export default class App extends React.Component {
  // initialize state
  constructor(props) {
    super(props);
    
    this.state = {
      balance: '',
      rate: '',
      term: '',
      payment: ''
    };

    // event binding for updating state values
    this.updateBalance = this.updateBalance.bind(this);
    this.updateRate = this.updateRate.bind(this);
    this.updateTerm = this.updateTerm.bind(this);
    this.calculatePayment = this.calculatePayment.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // update state values when input changes
  updateBalance(e) {
    this.setState({
      balance: e.target.value,
    });
  }

  updateRate(e) {
    this.setState({
      rate: e.target.value,
    });
  }

  updateTerm(e) {
    this.setState({
      term: e.target.value,
    });
  }

  // determine monthly mortgage payment
  calculatePayment(balance, rate, term) {
    const r = rate / 100 / 12;
    const n = term * 12;
    const numerator = r * (1 + r) ** n;
    const denominator = (1 + r) ** n - 1;

    return parseFloat(balance * (numerator / denominator)).toFixed(2);
  }

  // amortizationSchedule(balance, rate, term) {
  //   let table = 
  //     `<tr>
  //       <th>Month</th>
  //       <th>Payment</th>
  //       <th>Principal</th>
  //       <th>Interest</th>
  //       <th>Total Interest</th>
  //       <th>Balance</th>
  //     </tr>`
  // }

  // click event handler
  handleClick(e) {
    e.preventDefault();

    let balance = this.state.balance;
    let rate = this.state.rate;
    let term = this.state.term;
    let payment = this.calculatePayment(balance, rate, term);
   
    // update state value
    this.setState({
      payment: `$${payment} is your monthly payment.`
    });
  }

  render() {
    return (
      <div className="container">
        <form className="form-horizontal">
          <div className="col-md-2" />

          {/* header */}
          <div className="page-header">
            <h3>Mortgage Calculator</h3>
          </div>

          {/* balance */}
          <div className="form-group">
            <label htmlFor="balance" className="col-md-2 control-label">Loan Balance</label>
            <div className="col-md-5">
              <input 
                name="balance" 
                value={this.state.balance} 
                onChange={this.updateBalance} 
                placeholder="0" 
                className="form-control input-md" 
                size="1"
              />
            </div>
          </div>

          {/* rate */}
          <div className="form-group">
            <label htmlFor="rate" className="col-md-2 control-label">
              Interest Rate (%)
            </label>
            <div className="col-md-5">
              <input 
                name="rate" 
                step={0.01} 
                value={this.state.rate} 
                onChange={this.updateRate}
                placeholder="0"
                className="form-control input-md"
                size="1"
              />
            </div>
          </div>

          {/* loan term */}
          <div className="form-group">
            <label htmlFor="term" className="col-md-2 control-label">
              Loan Term (years)
            </label>
            <div className="col-md-5">
              <select 
                name="term"
                type="number" 
                value={this.state.term} 
                onChange={this.updateTerm}
                className="form-control"
              >
                <option>--Please select a loan term--</option>
                <option value="15">15</option>
                <option value="30">30</option>
              </select>
            </div>
          </div>

          {/* calculate button */}
          <div className="form-group">
            <div className="col-md-offset-2 col-md-10">
              <button 
                name="submit" 
                onClick={this.handleClick}
                className="btn btn-primary"
              >
                Calculate
              </button>
            </div>
          </div>

          {/* output display */}
          <div id="output" name="output" className="d-print-inline-block">
            {this.state.payment}
          </div>
        </form>
      </div>
    );
  }
}
