import React, { Component } from 'react';
import { Grid, Row, Navbar, Jumbotron, Button } from 'react-bootstrap';

import Body from './components/Body';
import HeaderBar from './components/HeaderBar';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderBar />
        <Body />
      </div>
    );
  }
}

export default App;
