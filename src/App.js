import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import jsYaml from 'js-yaml';
import opertationToPropType from './util/operationToPropType';
import Operation from './components/operation';

class App extends Component {
  state = {
    operation: null,
  };

  async componentDidMount() {
    const response = await fetch('/openapi-with-required.yaml');
    const openApiText = await response.text();
    const openapiJson = jsYaml.safeLoad(openApiText);
    const firstPathName = Object.keys(openapiJson.paths)[0];
    const operation = opertationToPropType(openapiJson, firstPathName, 'get');
    this.setState({
      operation,
    });
  }

  render() {
    const { operation } = this.state;
    return (
      <div className={css(styles.app)}>
        {!operation && <div>Loading...</div>}
        {operation && <Operation operation={operation} />}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    maxWidth: 700,
    margin: 'auto',
  },
});

export default App;
