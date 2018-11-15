import React, { Component } from 'react';
import './RegisterBusinessPage.css'
import RegisterBusinessForm from './RegisterBusinessForm'
class RegisterBusinessPage extends Component{
    render () {
        return (
          <div>
            <div className="register-business-header">
            <div className="hero-text">
              <h1>
                Register your business now and let your customers connect with
                you.
              </h1>
            </div>
          </div>
          <RegisterBusinessForm />
          </div>
        )
    }
}
export default RegisterBusinessPage