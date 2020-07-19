import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import i18n from 'services/i18n';
import { routes, paths } from 'helpers/routes';
import Article from 'components/article';
import Statistic from 'sources/admin';
import time from 'sources/time';
import CurrentUser from 'services/currentUser';
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Row,
  Col,
  Grid
} from 'react-bootstrap';

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rollback_time: null,
      is_admin: false,
      statistic: {},
    }
    this.setup();
  }

  async setup() {
    let rollback_time = (await time.get()).rollback_time;
    let is_admin = false;
    try{
      await Statistic.user(CurrentUser.currentUser().email);
      is_admin = true;
    } catch (err) {
      is_admin = false;
    }
    this.setState({
      rollback_time: rollback_time,
      is_admin: is_admin
    });
  }

  setRollback = () => {
    const val = document.getElementById("set_rollback").value;
    let num = Number(val);
    if (num.toString() != "NaN") {
      time.set({rollback_time: num});
      this.setState({
        rollback_time: num
      });
    }
  }

  findCountryStat = async () => {
    const val = document.getElementById("find_country").value;
    const result = await Statistic.country(val);
    const statistic = this.state.statistic;
    statistic.country = result;
    this.setState({
      statistic: statistic
    });
  }

  findCityStat = async () => {
    const val = document.getElementById("find_city").value;
    const result = await Statistic.city(val);
    const statistic = this.state.statistic;
    statistic.city = result;
    this.setState({
      statistic: statistic
    });
  }

  findUserStat = async () => {
    const val = document.getElementById("find_user").value;
    let result = null;
    try {
      result = await Statistic.user(val);
    } catch (err) {
      result = {allCellsCount: 0, cellsCount: 0}
    }
    const statistic = this.state.statistic;
    statistic.user = result;
    this.setState({
      statistic: statistic
    });
  }

  
  render() {
    
    let rollback_time = "loading...";
    if (this.state.rollback_time != null) {
      rollback_time = (
      <div><h3>Rollback time: {this.state.rollback_time}</h3></div>
    );
    }

    let rollback_form = "";
    if (this.state.is_admin) {
      rollback_form = (
        <div>
          <FormGroup>
            <ControlLabel>Set rollback time</ControlLabel>
            <FormControl
              type="text"
              id="set_rollback"
              onChange={this.setValue}
            />
          </FormGroup>
          <Button
            bsStyle="primary"
            onClick={this.setRollback}
          >
            Submit
          </Button>
        </div>)
    }

    let country_statistic_form = "";
    if (this.state.is_admin) {
      let stat = "";
        if (this.state.statistic.country != null) {
          const data = this.state.statistic.country;
          console.log(stat);
          stat = (
            <div><h4>Cells by all time: {data.allCellsCount}</h4>
            <h4>Current cells: {data.cellsCount}</h4>
            <h4>Users from this country: {data.usersCount}</h4></div>
          )
        }
      country_statistic_form = (
        <div>
          <FormGroup>
            <ControlLabel>Find country statistic</ControlLabel>
            <FormControl
              type="text"
              id="find_country"
              onChange={this.setValue}
            />
          </FormGroup>
          <Button
            bsStyle="primary"
            onClick={this.findCountryStat}
          >
            Submit
          </Button>
          { stat }
          
        </div>)
    }

    let city_statistic_form = "";
    if (this.state.is_admin) {
      let stat = "";
        if (this.state.statistic.city != null) {
          const data = this.state.statistic.city;
          console.log(stat);
          stat = (
            <div><h4>Cells by all time: {data.allCellsCount}</h4>
            <h4>Current cells: {data.cellsCount}</h4>
            <h4>Users from this country: {data.usersCount}</h4></div>
          )
        }
        city_statistic_form = (
        <div>
          <FormGroup>
            <ControlLabel>Find city statistic</ControlLabel>
            <FormControl
              type="text"
              id="find_city"
              onChange={this.setValue}
            />
          </FormGroup>
          <Button
            bsStyle="primary"
            onClick={this.findCityStat}
          >
            Submit
          </Button>
          { stat }
          
        </div>)
    }

    let user_statistic_form = "";
    if (this.state.is_admin) {
      let stat = "";
        if (this.state.statistic.user != null) {
          const data = this.state.statistic.user;
          console.log(stat);
          stat = (
            <div><h4>Cells by all time: {data.allCellsCount}</h4>
            <h4>Current cells: {data.cellsCount}</h4></div>
          )
        }
        user_statistic_form = (
        <div>
          <FormGroup>
            <ControlLabel>Find user statistic (fill in Email)</ControlLabel>
            <FormControl
              type="text"
              id="find_user"
              onChange={this.setValue}
            />
          </FormGroup>
          <Button
            bsStyle="primary"
            onClick={this.findUserStat}
          >
            Submit
          </Button>
          { stat }
          
        </div>)
    }
    
    return (
      <Grid>
        { rollback_time }
        <Row>
          <Col md={3}>
            { rollback_form }
          </Col>
          <Col md={3}>
            { country_statistic_form }
          </Col>
          <Col md={3}>
            { city_statistic_form }
          </Col>
          <Col md={3}>
            { user_statistic_form  }
          </Col>
        </Row>
      </Grid>
    );
  }
};

export default Info;
