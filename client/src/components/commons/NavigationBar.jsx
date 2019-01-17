import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse,Button, NavItem, NavLink,Modal, ModalBody, ModalHeader, ModalFooter
} from "mdbreact";

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
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
              <NavItem active = {this.props.homePage} > 
                <NavLink to="/"> 
                  <FontAwesomeIcon icon="home" /> HOME </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="#" onClick = {(evt) => {evt.preventDefault(); this.toggle()}}>
                  <FontAwesomeIcon icon="search" /> SEARCH
                </NavLink>
              </NavItem>
            </NavbarNav>
            <NavbarNav right>
              <NavItem active ={this.props.addBusiness}>
                <NavLink to="/register-business">
                  <FontAwesomeIcon icon="folder-plus" /> ADD BUSINESS
                </NavLink>
              </NavItem>
              <NavItem active ={this.props.myProfile}>
                <NavLink to="/view-profile">
                  <FontAwesomeIcon icon="folder-plus" /> MY PROFILE
                </NavLink>
              </NavItem>
              <NavItem active ={this.props.notifications}>
                <NavLink to="/notifications">
                  <FontAwesomeIcon icon="folder-plus" /> NOTIFICATIONS
                </NavLink>
              </NavItem>
              <NavItem>
              </NavItem>
              <NavItem>
                <NavLink to="/auth">
                  <FontAwesomeIcon icon="user" /> LOGOUT
                </NavLink>
              </NavItem>
            </NavbarNav>
          </Collapse>
        </Navbar>
        <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg"className="mt-5" >
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody >
            (...)
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onclick={(e) => {this.toggle(e); }}>Close</Button>{' '}
            <Button color="primary">Save changes</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default NavigationBar
