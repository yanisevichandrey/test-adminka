import React, {Component} from 'react';
import './UserInfo.css'
import {connect} from 'react-redux';

class UserInfo extends Component {
    render(){
        return(
            <div className="userInfo">
                <h2 className="userInfo__title">Your profile</h2>
                <div className="userInfo__first"><span className="bold">First name:</span> {this.props.currentUser.firstName}</div>
                <div className="userInfo__last"><span className="bold">Last name:</span> {this.props.currentUser.lastName}</div>
                <div className="userInfo__login"><span className="bold">Login:</span> {this.props.currentUser.login}</div>
                <div className="userInfo__email"><span className="bold">Email:</span> {this.props.currentUser.email}</div>
                <div className="userInfo__date"><span className="bold">Date of creation:</span> {this.props.currentUser.dateOfCreation}</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      currentUser: state.user.currentUser
    }
  }
  
  export default connect(mapStateToProps)(UserInfo);