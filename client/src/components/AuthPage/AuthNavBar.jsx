import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Container,
  Modal,
  ModalBody,
  Row,
  Col,
  Input,
  Button
} from "mdbreact";
/* import "./styles/LoginForm.css"; */
import { connect } from 'react-redux';
import {signIn, signUp} from "../../actions/authActions";
import { validateUser } from "../../utils/validator";
class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      modal6: false,
      modal7: false,
      fullname: "",
      username: "",
      email: "",
      password: "",
      usernameOrEmail: "",
      confirmPassword: ""
    };
    this.onClick = this.onClick.bind(this);
    this.saveToState = this.saveToState.bind(this);
  }
  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }
  saveToState(key, value) {
    this.setState({ [key]: value });
    console.log(value);
  }
  handleSignUp = () => {
    const validateSignupError = validateUser(this.state);
    if (validateSignupError) {
      alert(validateSignupError);
    } else if (this.state.password !== this.state.confirmPassword) {
      alert("passwords does not match");
    } else {
      alert('saving...')
      this.props.signUp(this.state).then(
        () => {
          alert(`Welcome <br/><em>${this.state.username}</em>`);
          setTimeout(() => {
            window.location = "/businesses/";
          }, 300);
        },
        error => {
          /*         this.setState({
          isLoading: false
        }); */
          alert(error.response.data.message);
        }
      );
    }
  };

  handleSignIn = () => {
/*     this.setState({
      isLoading: true
    }); */
alert('signing in... ')
    this.props.signIn(this.state)
      .then(() => {
        alert('success', `Welcome back <br/><em>${this.state.authName}</em>`);
        setTimeout(() => {
          window.location = '/businesses/';
        }, 300);
      },
      (error) => {
/*         this.setState({
          isLoading: false
        }); */
        alert(error.response.data.message);
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
        <Navbar color="black" dark className="zindex" expand="md" scrolling>
          <NavbarBrand href="/">
            <strong>
              <FontAwesomeIcon icon="" size="1x" />
              BISLINK
            </strong>
          </NavbarBrand>
          <NavbarToggler onClick={this.onClick} />
          <Collapse isOpen={this.state.collapse} navbar>
            <NavbarNav left>
              <NavItem>
                <NavLink to="/">
                  <FontAwesomeIcon icon="home" />
                  HOME
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/businesses">
                  <FontAwesomeIcon icon="briefcase" />
                  CATALOGUE
                </NavLink>
              </NavItem>
            </NavbarNav>
            <NavbarNav right>
              <NavItem>
                <NavLink to="#">
                  <FontAwesomeIcon icon="search" />
                  SEARCH
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="register-business">
                  <FontAwesomeIcon icon="folder-plus" />
                  ADD BUSINESS
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="#" onClick={() => this.toggle(7)}>
                  <FontAwesomeIcon icon="user-plus" />
                  SIGN UP
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="#" onClick={() => this.toggle(6)}>
                  <FontAwesomeIcon icon="user" />
                  LOGIN
                </NavLink>
              </NavItem>
            </NavbarNav>
          </Collapse>
        </Navbar>
        <div className="modal-margin">
          <Modal
            className="mt-5 "
            isOpen={this.state.modal6}
            toggle={() => this.toggle(6)}
            side
            position="top-right"
          >
            <ModalBody>
              <Container>
                <Row>
                  <Col md="">
                    <form className="form-width">
                      <p className="h4 text-center mt-4 mb-4">Sign in</p>
                      <div className="grey-text">
                        <Input
                          label="Type your username or email"
                          icon="envelope"
                          group
                          type="text"
                          default={this.state.usernameOrEmail}
                          onChange={event => {
                            this.saveToState(
                              "usernameOrEmail",
                              event.target.value
                            );
                          }}
                        />
                        <Input
                          label="Type your password"
                          icon="lock"
                          group
                          type="password"
                          onChange={event => {
                            this.saveToState("password", event.target.value);
                          }}
                        />
                      </div>
                      <div className="text-center">
                        <Button onClick={this.handleSignIn}> Login</Button>
                      </div>
                    </form>
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
                    <form>
                      <p className="h5 text-center">Sign up</p>
                      <div className="grey-text">
                        <Input
                          label="Your fullname"
                          icon="user-plus"
                          name="fullname"
                          default={this.state.fullname}
                          onChange={event => {
                            this.saveToState("fullname", event.target.value);
                          }}
                        />
                        <Input
                          label="Your username"
                          icon="user"
                          name="username"
                          default={this.state.username}
                          onChange={event => {
                            this.saveToState("username", event.target.value);
                          }}
                        />
                        <Input
                          label="Your email"
                          icon="envelope"
                          name="email"
                          default={this.state.email}
                          onChange={event => {
                            this.saveToState("email", event.target.value);
                          }}
                        />
                        <Input
                          type="password"
                          label="Your password"
                          name="password"
                          default={this.state.password}
                          icon="lock"
                          onChange={event => {
                            this.saveToState("password", event.target.value);
                          }}
                        />
                        <Input
                          type="password"
                          label="confirm your password"
                          default={this.state.confirmPassword}
                          icon="exclamation-triangle"
                          name="confirmPassword"
                          onChange={event => {
                            this.saveToState(
                              "confirmPassword",
                              event.target.value
                            );
                          }}
                        />
                      </div>
                      <div className="text-center">
                        <Button color="primary" onClick={this.handleSignUp}>
                          Register
                        </Button>
                      </div>
                    </form>
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
