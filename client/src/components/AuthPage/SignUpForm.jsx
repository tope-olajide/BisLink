import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, Button } from "mdbreact";
class SignUpForm extends Component {
  render() {
    return (
      <>
        <form>
          <p className="h5 text-center">Sign up</p>
          <div className="grey-text">
            <Input
              label="Your fullname"
              icon="user-plus"
              name="fullname"
              default={this.props.fullname}
              onChange={event => {
                this.props.saveToState("fullname", event.target.value);
              }}
            />
            <Input
              label="Your username"
              icon="user"
              name="username"
              default={this.props.username}
              onChange={event => {
                this.props.saveToState("username", event.target.value);
              }}
            />
            <Input
              label="Your email"
              icon="envelope"
              name="email"
              default={this.props.email}
              onChange={event => {
                this.props.saveToState("email", event.target.value);
              }}
            />
            <Input
              type="password"
              label="Your password"
              name="password"
              default={this.props.password}
              icon="lock"
              onChange={event => {
                this.props.saveToState("password", event.target.value);
              }}
            />
            <Input
              type="password"
              label="confirm your password"
              default={this.props.confirmPassword}
              icon="exclamation-triangle"
              name="confirmPassword"
              onChange={event => {
                this.props.saveToState("confirmPassword", event.target.value);
              }}
            />
          </div>
          <div className="text-center">
            <Button
              color="primary"
              disabled={(this.props.isSigningUp)?true:false}
              onClick={this.props.handleSignUp}
            >
              {(this.props.isSigningUp)?<FontAwesomeIcon icon="spinner" spin size="2x" />:"Sign Up"}
            </Button>
          </div>
        </form>
      </>
    );
  }
}
export default SignUpForm;
