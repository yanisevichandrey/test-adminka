import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import axios from '../axios-users';

class SignUp extends Component {

  state = {
    firstName: '',
    lastName: '',
    login: '',
    email: '',
    pass: ''
  }

  onChangeFirstName = (event) => {
    this.setState({ firstName: event.target.value })
  }

  onChangeLastName = (event) => {
    this.setState({ lastName: event.target.value })
  }

  onChangeLogin = (event) => {
    this.setState({ login: event.target.value })
  }

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value })
  }

  onChangePass = (event) => {
    this.setState({ pass: event.target.value })
  }

  request = () => {
    const dateOfCreation = new Date().toLocaleDateString('ru');

    const newUser = {
      id: Date.now(),
      dateOfCreation: dateOfCreation,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      login: this.state.login,
      email: this.state.email,
      pass: this.state.pass
    }

    axios.post('/users.json', newUser)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="signIn">
          <h2>Sign Up</h2>
          <div className="signIn__form">
            <input type="text" value={this.state.firstName} placeholder="First name" onChange={this.onChangeFirstName} />
            <input type="text" value={this.state.lastName} placeholder="Last name" onChange={this.onChangeLastName} />
            <input type="text" value={this.state.login} placeholder="Login" onChange={this.onChangeLogin} />
            <input type="text" value={this.state.email} placeholder="E-mail" onChange={this.onChangeEmail} />
            <input type="password" value={this.state.pass} placeholder="Password" onChange={this.onChangePass} />
            <button onClick={() => this.props.onAddUser(this.state.firstName, this.state.lastName, this.state.login, this.state.email, this.state.pass)}>Sign up</button>
            <button onClick={this.request}>Send</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    usr: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddUser: (firstName, lastName, login, email, pass) => dispatch({ type: actionTypes.ADD_USER, userData: { firstName: firstName, lastName: lastName, login: login, email: email, pass: pass } })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);