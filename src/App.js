import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

class App extends Component {
  render() {
    return (
      <div className={css(styles.app)}>
        <header className="App-header">
          <p>
            Edit
            {' '}
            <code>src/App.js</code>
            {' '}
and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    background: 'red',
  },
});

export default App;
