import React from 'react';
import PropTypes from 'prop-types';
import TodoContainer from 'containers/todo';
import Home from 'components/home';
import Place from 'components/grid/Place'

const Main = ({ loggedIn }) => (
  loggedIn ? <Place/> : <Home />
);

Main.propTypes = {
  loggedIn: PropTypes.bool,
};

export default Main;
