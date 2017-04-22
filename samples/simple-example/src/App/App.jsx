import React from 'react';
import { connect } from 'react-redux';
import { restActions } from 'robs-fetch'; // Importing restActions.
import './App.css';
import reactLogo from './logo.svg';
import robsLogo from './logo-small.gif';


class App extends React.Component {
  render() {
    const { ping, fetchPeople, error, people } = this.props;
    const peopleContent = this.renderPeople(people);

    return (
      <div className="App">
        <div className="App-header">
          <img src={reactLogo} className="App-logo" alt="React Logo" />
          <img src={robsLogo} className="App-logo" alt="Redux-Observable logo" />
          <h2>Redux-Observable Fetch example</h2>
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
  // This will dispatch an action to execute a REST Action
  // with the GET method.
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

const dispatcher = {
  ping: () => ({ type: 'PING' }),
  fetchPeople
};

export const AppConnected = connect(mapStateToProps, dispatcher)(App);
