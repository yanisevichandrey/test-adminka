import React, { Component } from 'react';
import './SignIn.css';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';

class SignIn extends Component {

  state = {
    login: '',
    pass: ''
  }

  onChangeLogin = (event) => {
    this.setState({login: event.target.value})
  }

  onChangePass = (event) => {
    this.setState({pass: event.target.value})
  }

  render() {
    return (
      <div className="signIn">
        <h2>Sign In</h2>
        <div className="signIn__form">
          <input type="text" value={this.state.login} placeholder="Your login" onChange={this.onChangeLogin}/>
          <input type="password" value={this.state.pass} placeholder="Your password" onChange={this.onChangePass}/>
          <button onClick={() => this.props.onLogin(this.state.login, this.state.pass)}>Sign in</button>
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
    onLogin: (login, pass) => dispatch({type: actionTypes.LOGIN, userData: {login: login, pass: pass}})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
