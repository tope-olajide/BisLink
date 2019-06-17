import React, {Component}  from"react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toastNotification from './../../utils/toastNotification'
import {Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Container,
  Modal,
  ModalBody,
  Row,
  Col,
  Input,
  Button
} from "mdbreact";
import { connect } from 'react-redux';
import { signIn, signUp } from "../../actions/authActions";
import { validateUser } from "../../utils/validator";
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      modal6: false,
      modal7: false,
      isLoggingIn:false,
      isSigningUp: false,
      fullname: "",
      username: "",
      email: "",
      password: "",
      usernameOrEmail: "",
      confirmPassword: ""
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }
  saveToState = (key, value)=> {
    this.setState({ [key]: value });
    console.log(value);
  }

  handleSignUp = () => {
    const validateSignupError = validateUser(this.state);
    if (validateSignupError) {
      toastNotification(["error"],validateSignupError);
    } else if (this.state.password !== this.state.confirmPassword) {
      toastNotification(["error"],"passwords does not match");
    } else {
      this.setState({isSigningUp:true})
      toastNotification(["info"],'Signing you up...')
      this.props.signUp(this.state).then(
        () => {
          toastNotification(["success"],`Welcome <br/><em>${this.state.username}</em>`);
          setTimeout(() => {
            window.location = "/";
          }, 300);
        },
        error => {
          this.setState({isSigningUp:false})
          if(!error.response){
            toastNotification(["error"], 'Network Error');
            
          }
          else{
            toastNotification(["error"], error.response.data.message);
          }
        }
      );
    }
  };

  handleSignIn = () => {
    this.setState({
      isLoggingIn: true,
    });
    toastNotification(["info"],('logging in... '))
    this.props.signIn(this.state)
      .then(() => {
        toastNotification(['success'], `Welcome back <br/><em>${this.state.usernameOrEmail}</em>`);
        setTimeout(() => {
          window.location = '/';
        }, 300);
      },
      (error) => {
        this.setState({
          isLoggingIn: false
      });
      if(!error.response){
        toastNotification(["error"], 'Network Error');
      }
      else{
        toastNotification(["error"], error.response.data.message);
      }
      });
  }
  toggle(nr) {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }
  render() {
    return (
      <div>
        <Navbar color="black" dark expand="md" scrolling>
          <NavbarBrand href="/">
            <strong>
              BISLINK
            </strong>
          </NavbarBrand>
          <NavbarToggler onClick={this.onClick} />
          <Collapse isOpen={this.state.collapse} navbar>
            <NavbarNav right>
              <NavItem>
                <NavLink to="#" onClick={() => this.toggle(7)}>
                  <FontAwesomeIcon icon="user-plus" /> SIGN UP
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="#" onClick={() => this.toggle(6)}>
                  <FontAwesomeIcon icon="sign-in-alt" /> LOGIN </NavLink>
              </NavItem>
            </NavbarNav>
          </Collapse>
        </Navbar>
        <div>
          <Modal
            className="mt-5 pt-2"
            isOpen={this.state.modal6}
            toggle={() => this.toggle(6)}
            side
            position="top-right"
          >
            <ModalBody>
              <Container>
                <Row>
                  <Col md="">
                    <SignInForm 
                    isLoggingIn={this.state.isLoggingIn}
                    usernameOrEmail={this.state.usernameOrEmail}
                    saveToState = {this.saveToState}
                    isLoggingIn = {this.state.isLoggingIn}
                    handleSignIn = {this.handleSignIn}
                    />
                  </Col>
                </Row>
              </Container>
            </ModalBody>
          </Modal>
          <Modal
            className="mt-5 "
            isOpen={this.state.modal7}
            toggle={() => this.toggle(7)}
            side
            position="top-right"
          >
            <ModalBody>
              <div>
                <Row>
                  <Col>
                    <SignUpForm
                    fullname={this.state.fullname}
                    username={this.state.username}
                    email = {this.state.email}
                    password = {this.state.password}
                    confirmPassword = {this.state.confirmPassword}
                    saveToState = {this.saveToState}
                    isSigningUp = {this.state.isSigningUp}
                    handleSignUp = {this.handleSignUp}
                    />
                  </Col>
                </Row>
              </div>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}
export default connect(null, {signUp, signIn})(NavigationBar);
