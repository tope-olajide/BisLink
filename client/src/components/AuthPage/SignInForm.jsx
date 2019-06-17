import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, Button } from "mdbreact";
class SignInForm extends Component {
  render() {
    return (
      <>
        <form className="form-width">
          <p className="h4 text-center mt-4 mb-4">Sign in</p>
          <div className="grey-text">
            <Input
              label="Type your username or email"
              icon="envelope"
              group
              type="text"
              default={this.props.usernameOrEmail}
              onChange={event => {
                this.props.saveToState("usernameOrEmail", event.target.value);
              }}
            />
            <Input
              label="Type your password"
              icon="lock"
              group
              type="password"
              onChange={event => {
                this.props.saveToState("password", event.target.value);
              }}
            />
          </div>
          <div className="text-center">
            <Button
              disabled={this.props.isLoggingIn ? true : false}
              onClick={this.props.handleSignIn}
            >
              {" "}
              {this.props.isLoggingIn ? (
                <FontAwesomeIcon icon="spinner" spin size="2x" />
              ) : (
                "Sign In"
              )}{" "}
            </Button>
          </div>
        </form>
      </>
    );
  }
}
export default SignInForm;
