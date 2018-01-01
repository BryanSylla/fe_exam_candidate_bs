import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Main from './components/Main';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider >
      <div className="App">
      <AppBar title="Dog Image Generator" iconClassNameLeft=" " />
      <Main />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
