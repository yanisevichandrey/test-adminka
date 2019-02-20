import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actionCreators';

class Header extends Component {

onLogout = () => {
    const currentUser = null;

    localStorage.setItem('currentUser', currentUser);
    this.props.onLogout();
}

    render() {

        let loged = null;
        if (this.props.currentUser) {
            loged = <div>
                
            </div>
        } else {
            loged = <div>
                
            </div>
        }
        return (
            <div className="header">
                <div className="logo">
                    <Link className="links" to="/">Adminka</Link>
                </div>
                <div className="menu">
                    <div>
                        <Link className="links" to="/">Home</Link>
                        
                    </div>
                    {/* {loged} */}
                    <Link className="links" to="/products">Products</Link>
                    <Link className="links" to="/user-info">User info</Link>
                    <Link className="links" onClick={this.onLogout} to="/sign-in">Logout</Link>
                    <Link className="links" to="/sign-in">Sign in</Link>
                    <Link className="links" to="/sign-up">Sign up</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actionCreators.onLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);