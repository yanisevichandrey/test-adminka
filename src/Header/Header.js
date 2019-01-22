import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';

class Header extends Component {



    render() {

        let loged = null;
        if (this.props.currentUser) {
            loged = <div>
                <Link className="links" to="/products">Products</Link>
                <Link className="links" to="/user-info">User info</Link>
                <Link className="links" onClick={this.props.onLogout} to="/sign-in">Logout</Link>
            </div>
        } else {
            loged = <div>
                <Link className="links" to="/sign-in">Sign in</Link>
                <Link className="links" to="/sign-up">Sign up</Link>
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
                    {loged}
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
        onLogout: () => dispatch({ type: actionTypes.LOGOUT })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);