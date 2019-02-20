import React, { Component } from 'react';
import './SignIn.css';
import { connect } from 'react-redux';
import axios from '../axios-users';
import * as actionCreators from '../store/actionCreators';

class SignIn extends Component {

  state = {
    login: '',
    pass: '',
    users: []
  }

  onChangeLogin = (event) => {
    this.setState({ login: event.target.value })
  }

  onChangePass = (event) => {
    this.setState({ pass: event.target.value })
  }

  //  componentDidMount() {
  //   const data =  this.getUsers();
  //   this.props.getUsers()
  //   this.changeUsers(data)
  // }

  // getUsers = () => {
  //   axios.get('/users.json')
  //     .then(res => res.data);
  // }

  changeUsers = (data) => {
    this.setState({users: data})
  }

  login = () => {
    console.log(this.props.usr)
    let currentUser = null;
    this.props.usr && this.props.usr.map(user => {
      if (user.login === this.state.login && user.pass === this.state.pass) {
        currentUser =  Object.assign({}, user);
        console.log(currentUser)
      }
    })

    // axios.post('/currentUser.json', currentUser)
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));

    this.props.login(currentUser);
  }

  render() {
    return (
      <div className="signIn">
        <h2>Sign In</h2>
        <div className="signIn__form">
          <input type="text" value={this.state.login} placeholder="Your login" onChange={this.onChangeLogin} />
          <input type="password" value={this.state.pass} placeholder="Your password" onChange={this.onChangePass} />
          <button onClick={this.login}>Sign in</button>
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
    login: currentUser => dispatch(actionCreators.login(currentUser)),
    getUsers: users => dispatch(actionCreators.getUsers(users))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
