import React, { Component } from 'react';
import { BrowserRouter as Router, Route, IndexRoute, browserHistory } from 'react-router-dom';
// import { Router, Route, browserHistory } from 'react-router'
import './App.css';
import Header from './Header/Header';
import Home from './Home/Home';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import Products from './Products/Products';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import UserInfo from './UserInfo/UserInfo';
import axios from './axios-users';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';

class App extends Component {

  render() {
    return (
      
      // <div className="App">
      // <Header currentUser={this.props.currentUser}/>
      // <Router >
        
      //     <Route path="/" exact component={Home} />
      //     <Route path="/products" component={Products} />
      //     <Route path="/not-found" component={NotFoundPage} />
      //     <Route path="/user-info" component={UserInfo} />
      //     <Route path="/sign-in" component={SignIn} />
      //     <Route path="/sign-up" component={SignUp} />
      //     <Route path="*" component={NotFoundPage} />
      // </Router>
      // </div>
      
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
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps = dispatch => ({
  
    
  
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
