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
              <NavItem active ={this.props.nactive}> 
                <NavLink to="/">
                  <FontAwesomeIcon icon="home" />
                  HOME
                </NavLink>
              </NavItem>
              <NavItem active ={this.props.business}> 
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
                <NavLink to="#">
                  <FontAwesomeIcon icon="user-plus" />
                  SIGN UP
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="#">
                  <FontAwesomeIcon icon="user" />
                  LOGOUT
                </NavLink>
              </NavItem>
            </NavbarNav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default connect(null, {signUp, signIn})(NavigationBar);
