import React, { Component } from 'react';
import jsonwebtoken from 'jsonwebtoken';
import { connect } from 'react-redux';
import { signOut } from '../actions/authActions'

export default (ProtectedRoute) => {
class AuthenticateUser extends Component {
    componentWillMount() {
        const JWT_SECRET = process.env.JWT_SECRET || 'process.env.JWT_SECRET';
        const token = localStorage.getItem('token');
        if (!token) {
          this.props.signOut();
        } else if (token) {
          jsonwebtoken.verify(token, JWT_SECRET, (error, decoded) => {
            if (error || decoded.exp < (new Date().getTime() / 1000)) {
              this.props.signOut();
            }
          });
        }
      }
      render() {
        return (
          <ProtectedRoute {...this.props} />
        );
      }
}
return connect(null, { signOut })(AuthenticateUser);
}

