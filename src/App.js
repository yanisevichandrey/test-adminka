import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
      <Router>
        <div className="App">
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/products" component={Products} />
          <Route path="/not-found" component={NotFoundPage} />
          <Route path="/user-info" component={UserInfo} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          {/* <Route path="/*" component={NotFoundPage} /> */}
          {/* <Products 
            addProduct={this.props.addProduct}
            deleteProduct={this.props.deleteProduct}
            editProduct={this.props.editProduct}/> */}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    isAdd: state.isAdd,
    isDelete: state.isDelete
  }
}

const mapDispatchToProps = dispatch => ({
  
    
  
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
