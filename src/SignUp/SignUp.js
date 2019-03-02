import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import axios from '../axios-users';
import * as actionCreators from '../store/actionCreators';

class SignUp extends Component {

  state = {
    firstName: '',
    lastName: '',
    login: '',
    email: '',
    pass: ''
  }

  componentDidUpdate(prevState, prevProps) {
    if(prevProps.usr !== this.props.usr) {
      this.saveToLocalStorage()
    }
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

  addUser = () => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
  };
  const dateOfCreation = new Date().toLocaleDateString('ru', options);

    const newUser = {
      id: Date.now(),
      dateOfCreation: dateOfCreation,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      login: this.state.login,
      email: this.state.email,
      pass: this.state.pass
    }

    let users = this.props.usr;
    let newUsers = [...users, newUser]

    this.props.addUser(newUsers);
    this.saveToLocalStorage(newUsers);
  }

  saveToLocalStorage = () => {
    const users = JSON.stringify(this.props.usr)

    localStorage.setItem('users', users)
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
            <button onClick={this.addUser}>Sign up</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    usr: state.user.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: newUser => dispatch(actionCreators.addUser(newUser)),
    setUsers: users => dispatch(actionCreators.setUsers(users))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);