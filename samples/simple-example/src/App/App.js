import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { restActions } from 'robs-fetch';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  render() {
    const { ping, fetchPeople, error, people } = this.props;
    const peopleContent = this.renderPeople(people);

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <button onClick={ping}>Send PING action.</button>
          <button onClick={fetchPeople}>Fetch people.</button>
        </p>
        <div>
          {error ? <p className='error'>{error}</p> : null}
          {peopleContent}
        </div>
      </div>
    );
  }

  renderPeople(people) {
    if (!people) { return null; }
    const content = people.map(this.renderPerson);

    return (
      <ul>
        {content}
      </ul>
    );
  }

  renderPerson(person) {
    return (
      <li key={person.id}>
        {person.firstname}&nbsp;{person.lastname}
      </li>
    )
  }
}

function fetchPeople() {
  return restActions.fetchGet({
    url: '/api/people',
    onCompleteAction: 'PEOPLE_RETRIEVED' 
  });
}

function mapStateToProps(store) {
  const { people, error } = store;

  return {
    people,
    error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ping: bindActionCreators(() => { return { type: 'PING' }; }, dispatch),
    fetchPeople: bindActionCreators(fetchPeople, dispatch)
  };
}

export const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App);
