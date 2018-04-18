import React, { Component } from 'react';
import { Grid, Navbar } from 'react-bootstrap';

class HeaderBar extends Component {
  render() {
    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            DUNGEONS & DRAGONS
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}

export default HeaderBar;
