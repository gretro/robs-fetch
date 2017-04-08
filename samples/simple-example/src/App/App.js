import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <button onClick={this.props.ping}>Send PING action.</button>
        </p>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ping: bindActionCreators(() => { return { type: 'PING' }; }, dispatch)
  };
}

export const AppConnected = connect(undefined, mapDispatchToProps)(App);
