// TODO:
// * rename repo to coin-pouch
// * format coin display
// * add animations (alerts, progress bars, etc.)
// * break into components
// * save to/download from cookies,]
// * empty pouch
// * general cleanup

import React, { Component } from 'react';
import {
  Jumbotron,
  Grid, Row, Col,
  ButtonToolbar, ToggleButtonGroup, ToggleButton, Button, InputGroup, MenuItem, DropdownButton,
  Glyphicon,
  Form, FormGroup, FormControl, ControlLabel,
} from 'react-bootstrap';

class Body extends Component {
  constructor(props) {
    super(props);

    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleMetalSelect = this.handleMetalSelect.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
    this.handleShowChange = this.handleShowChange.bind(this);
    this.calculateCoins = this.calculateCoins.bind(this);

    this.state = {
      metal: 'Gold',
      value: undefined,
      total: 0,
      show: ['gold', 'copper']
    };
  }

  handleValueChange(e) {
    this.setState({ value: e.target.value });
  }

  handleMetalSelect(metal) {
    this.setState({ metal });
  }

  handleUpdateClick() {
    if (this.state.value) {
      let multiplier;
      switch(this.state.metal) {
        case 'Platinum':
          multiplier = 1000; break;
        case 'Gold':
          multiplier = 100; break;
        case 'Electrum':
          multiplier = 50; break;
        case 'Silver':
          multiplier = 10; break;
        default:
          multiplier = 1; break;
          break;
      }
      let total = this.state.total + (multiplier * parseInt(this.state.value));

      this.setState({ total });
    }
  }

  handleShowChange(e) {
    this.setState({ show: e })
  }

  calculateCoins() {
    let copper = this.state.total;
    let platinum, gold, electrum, silver;

    if (this.state.show.includes('platinum')) {
      platinum = Math.floor(copper / 1000);
      copper = copper % 1000;
    }

    if (this.state.show.includes('gold')) {
      gold = Math.floor(copper / 100);
      copper = copper % 100;
    }

    if (this.state.show.includes('electrum')) {
      electrum = Math.floor(copper / 50);
      copper = copper % 50;
    }

    if (this.state.show.includes('silver')) {
      silver = Math.floor(copper / 10);
      copper = copper % 10;
    }

    return {
      platinum,
      gold,
      electrum,
      silver,
      copper
    }
  }

  renderForm() {
    return (
      <form>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="number"
              value={ this.state.value }
              placeholder="Enter coin amount"
              onChange={ this.handleValueChange }
            />
            <DropdownButton
              componentClass={InputGroup.Button}
              title={ this.state.metal }
            >
              <MenuItem key="Platinum" onSelect={() => this.handleMetalSelect("Platinum")} active={this.state.metal === "Platinum"}>Platinum</MenuItem>
              <MenuItem key="Gold" onSelect={() => this.handleMetalSelect("Gold")} active={this.state.metal === "Gold"}>Gold</MenuItem>
              <MenuItem key="Electrum" onSelect={() => this.handleMetalSelect("Electrum")} active={this.state.metal === "Electrum"}>Electrum</MenuItem>
              <MenuItem key="Silver" onSelect={() => this.handleMetalSelect("Silver")} active={this.state.metal === "Silver"}>Silver</MenuItem>
              <MenuItem key="Copper" onSelect={() => this.handleMetalSelect("Copper")} active={this.state.metal === "Copper"}>Copper</MenuItem>
            </DropdownButton>
          </InputGroup>
        </FormGroup>
        <Button bsStyle="info" onClick={() => this.handleUpdateClick()} block>
          <Glyphicon glyph="ok" /> Update
        </Button>
      </form>
    );
  }

  renderCoins() {
    return (
      <div>
        <Grid>
          { this.state.show.includes('platinum') &&
            <Row>
              <Col xs={6} className="text-right">{ this.calculateCoins().platinum }</Col>
              <Col xs={6}>Platinum</Col>
            </Row>
          }
          { this.state.show.includes('gold') &&
            <Row>
              <Col xs={6} className="text-right">{ this.calculateCoins().gold }</Col>
              <Col xs={6}>Gold</Col>
            </Row>
          }
          { this.state.show.includes('electrum') &&
            <Row>
              <Col xs={6} className="text-right">{ this.calculateCoins().electrum }</Col>
              <Col xs={6}>Electrum</Col>
            </Row>
          }
          { this.state.show.includes('silver') &&
            <Row>
              <Col xs={6} className="text-right">{ this.calculateCoins().silver }</Col>
              <Col xs={6}>Silver</Col>
            </Row>
          }
          <Row>
            <Col xs={6} className="text-right">{ this.calculateCoins().copper }</Col>
            <Col xs={6}>Copper</Col>
          </Row>
        </Grid>
        <ButtonToolbar>
          <ToggleButtonGroup
            type="checkbox"
            value={this.state.show}
            onChange={this.handleShowChange}
          >
            <ToggleButton value={'platinum'}>Platinum</ToggleButton>
            <ToggleButton value={'gold'}>Gold</ToggleButton>
            <ToggleButton value={'electrum'}>Electrum</ToggleButton>
            <ToggleButton value={'silver'}>Silver</ToggleButton>
            <ToggleButton value={'copper'} disabled>Copper</ToggleButton>
          </ToggleButtonGroup>
        </ButtonToolbar>
      </div>
    );
  }

  render() {
    return (
      <Jumbotron>
        <Grid>
          <h1>Coin Pouch</h1>
          <Row>
            <Col md={8}>
              { this.renderCoins() }
            </Col>
            <Col md={4}>
              { this.renderForm() }
            </Col>
          </Row>
        </Grid>
      </Jumbotron>
    );
  }
}

export default Body;
