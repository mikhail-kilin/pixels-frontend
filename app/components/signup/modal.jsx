/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';
import i18n from 'services/i18n';
import Modal from 'components/modal';
import Form from 'components/form';

class SignupModal extends Component {
  state = {
    name: '',
    email: '',
    country: '',
    city: '',
    password: '',
    passwordConfirmation: '',
    errors: {},
  };

  setValue = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  isFormValid = () => {
    const {
      name,
      email,
      country,
      city,
      password,
      passwordConfirmation,
    } = this.state;
    var emailReg = /.+@.+\..+/;

    return (
      country.trim().length &&
      city.trim().length &&
      name.trim().length &&
      emailReg.test(email) &&
      password.length > 5 &&
      passwordConfirmation.length > 5 &&
      this.isValidPassword()
    );
  };

  isValidPassword = () => {
    const { password, passwordConfirmation } = this.state;

    return password === passwordConfirmation;
  };

  validationState = (value) => {
    const { length } = value;

    if (!length) return null;

    return length > 5 ? 'success' : 'error';
  };

  emailValidState = (value) => {
    const { length } = value;
    if (!length) return null;
    var emailReg = /.+@.+\..+/;
    return emailReg.test(value) ? 'success' : 'error';
  }

  nameValidationState = (value) => {
    const { length } = value.trim();

    return length ? 'success' : null;
  };

  passwordValidationState = (value) => {
    const { length } = value;

    if (!length) return null;

    return (this.isValidPassword() && length > 5) ? 'success' : 'error';
  };

  signUp = async (event) => {
    event.preventDefault();

    const {
      name,
      email,
      country,
      city,
      password,
      passwordConfirmation,
    } = this.state;
    const { signupUser, closeModal } = this.props;

    if (this.isFormValid()) {
      try {
        await signupUser({
          name, email, country, city, password, passwordConfirmation,
        });
        this.setState({
          name: '',
          email: '',
          country: '',
          city: '',
          password: '',
          passwordConfirmation: '',
        });
        closeModal();
      } catch ({ errors }) {
        this.setState({ errors });
      }
    }
  };

  render() {
    const {
      name,
      email,
      country,
      city,
      password,
      passwordConfirmation,
    } = this.state;
    const {
      isOpen,
      closeModal,
      session: {
        isLoading,
      },
    } = this.props;

    return (
      <Modal
        title={i18n.t('modal:signup')}
        isOpen={isOpen}
        closeModal={closeModal}
      >
        <Form onSubmit={this.signUp}>
          <FormGroup
            controlId="name"
            validationState={this.nameValidationState(name)}
          >
            <ControlLabel>{ i18n.t('session:name') }</ControlLabel>
            <FormControl
              type="text"
              name="name"
              onChange={this.setValue}
            />
          </FormGroup>
          <FormGroup
            controlId="email"
            validationState={this.emailValidState(email)}
          >
            <ControlLabel>{ i18n.t('session:email') }</ControlLabel>
            <FormControl
              type="text"
              name="email"
              onChange={this.setValue}
            />
          </FormGroup>
          <FormGroup
            controlId="country"
            validationState={this.nameValidationState(country)}
          >
            <ControlLabel>{ i18n.t('session:country') }</ControlLabel>
            <FormControl
              type="text"
              name="country"
              onChange={this.setValue}
            />
          </FormGroup>
          <FormGroup
            controlId="city"
            validationState={this.nameValidationState(city)}
          >
            <ControlLabel>{ i18n.t('session:city') }</ControlLabel>
            <FormControl
              type="text"
              name="city"
              onChange={this.setValue}
            />
          </FormGroup>
          <FormGroup
            controlId="password"
            validationState={this.validationState(password)}
          >
            <ControlLabel>{ i18n.t('session:password') }</ControlLabel>
            <FormControl
              type="password"
              name="password"
              onChange={this.setValue}
            />
          </FormGroup>
          <FormGroup
            controlId="passwordConfirmation"
            validationState={this.passwordValidationState(passwordConfirmation)}
          >
            <ControlLabel>{ i18n.t('session:passwordConfirmation') }</ControlLabel>
            <FormControl
              type="password"
              name="passwordConfirmation"
              onChange={this.setValue}
            />
          </FormGroup>
          <Button
            bsStyle="primary"
            type="submit"
          >
            { i18n.t('session:submit') }
          </Button>
        </Form>
      </Modal>
    );
  }
}

SignupModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  session: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

export default SignupModal;
