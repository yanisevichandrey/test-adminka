import React, { Component } from 'react';
import { BrowserRouter as Router, Route, IndexRoute, browserHistory } from 'react-router-dom';
import './App.css';
import Header from './Header/Header';
import Home from './Home/Home';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import Products from './Products/Products';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import UserInfo from './UserInfo/UserInfo';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';

class App extends Component {

  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.props.setCurrentUser(currentUser);
    const users = JSON.parse(localStorage.getItem('users'));
    this.props.setUsers(users)
  }


  
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/products" component={Products} />
          <Route path="/not-found" component={NotFoundPage} />
          <Route path="/user-info" component={UserInfo} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          {/* <Route path="*" component={NotFoundPage} /> */}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    usr: state.user.users
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: currentUser => dispatch(actionCreators.setCurrentUser(currentUser)),
  setUsers: users => dispatch(actionCreators.setUsers(users))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
