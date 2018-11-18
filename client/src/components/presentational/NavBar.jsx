import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
  Container,
  Button,
  Modal,
  ModalBody,
  Row,
  Col,
  Input
} from "mdbreact";

import "./styles/LoginForm.css";
class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      modal6: false,
      modal7: false
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.setState({
      collapse: !this.state.collapse
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
        <Navbar color="black" dark expand="sm" scrolling>
          <NavbarBrand href="/">
            <strong>
              <FontAwesomeIcon icon="" size="1x" />
              BISLINK
            </strong>
          </NavbarBrand>
          <NavbarToggler onClick={this.onClick} />
          <Collapse isOpen={this.state.collapse} navbar>
            <NavbarNav left>
              <NavItem active>
                <NavLink to="/"> HOME</NavLink>
              </NavItem>

            </NavbarNav>
            <NavbarNav right>
 
              <NavItem>
                <NavLink to="#" onClick={() => this.toggle(7)}>
                  <FontAwesomeIcon icon="user-plus" /> SIGN UP
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="#" onClick={() => this.toggle(6)}>
                  <FontAwesomeIcon icon="user" /> LOGIN
                </NavLink>
              </NavItem>
            </NavbarNav>
          </Collapse>
        </Navbar>

        <Container className="modal-margin">
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
                    <form
                      className="form-width"
                      onSubmit={this.handleSignUpForm}
                    >
                      <p className="h4 text-center mt-4 mb-4">Sign in</p>
                      <div className="grey-text">
                        <Input
                          label="Type your email"
                          icon="envelope"
                          group
                          type="email"
                          onChange={(event) => {
                            this.props.handleInputChange('email', event.target.value);
                          }}
                        />
                        <Input
                          label="Type your password"
                          icon="lock"
                          group
                          type="password"
                          onChange={(event) => {
                            this.props.handleInputChange('password', event.target.value);
                          }}
                        />
                      </div>
                      <div className="text-center">
                      <Button
                          onClick={this.props.handleSignIn}
                          color="primary"
                        >Login</Button>
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
              <Container>
                <Row>
                  <Col>
                    <form>
                      <p className="h5 text-center">Sign up</p>
                      <div className="grey-text">
                        <Input
                          label="Your fullname"
                          icon="user-plus"
                          group
                          type="text"
                          onChange={(event) => {
                            this.props.handleInputChange('fullname', event.target.value);
                          }}
                        />
                        <Input
                          label="Your username"
                          icon="user"
                          group
                          type="text"
                          onChange={(event) => {
                            this.props.handleInputChange('username', event.target.value);
                          }}
                        />
                        <Input
                          label="Your email"
                          icon="envelope"
                          group
                          type="email"
                          onChange={(event) => {
                            this.props.handleInputChange('email', event.target.value);
                          }}
                        />
                        <Input
                          label="Your password"
                          icon="lock"
                          group
                          type="password"
                          onChange={(event) => {
                            this.props.handleInputChange('password', event.target.value);
                          }}
                        />
                        <Input
                          label="confirm your password"
                          icon="exclamation-triangle"
                          group
                          type="password"
                          onChange={(event) => {
                            this.props.handleInputChange('confirmPassword', event.target.value);
                          }}
                        />
                      </div>
                      <div className="text-center">
                        <Button
                          onClick={this.props.handleSignUp}
                          color="primary"
                        >
                          Register
                        </Button>
                      </div>
                    </form>
                  </Col>
                </Row>
              </Container>
            </ModalBody>
          </Modal>
        </Container>
      </div>
    );
  }
}

export default NavigationBar;
