import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
class NonFixedNavbarExample extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          collapse: false,
          modal6: false,
      };
  this.onClick = this.onClick.bind(this);
}
onClick(){
  this.setState({
      collapse: !this.state.collapse,
    });
}
toggle(nr) {
    let modalNumber = 'modal' + nr
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }
render() {
  const container = {height: 1300}
    return (
        <div>
          <Router>
            <Navbar color="black" dark expand="md" scrolling>
                <NavbarBrand href="/">
                    <strong><FontAwesomeIcon icon="" size="1x" />BISLINK</strong>
                </NavbarBrand>
                <NavbarToggler onClick={this.onClick } />
                <Collapse isOpen = { this.state.collapse } navbar>
                    <NavbarNav left>
                      <NavItem active>
                          <NavLink to="#"><FontAwesomeIcon icon="home" />HOME</NavLink>
                      </NavItem>
                      <NavItem>
                          <NavLink to="#"><FontAwesomeIcon icon="briefcase" />CATALOGUE</NavLink>
                      </NavItem>

                    </NavbarNav>
                    <NavbarNav right>
                    <NavItem>
                          <NavLink to="#"><FontAwesomeIcon icon="search" />SEARCH</NavLink>
                      </NavItem>
                      <NavItem>
                          <NavLink to="#"><FontAwesomeIcon icon="folder-plus" />ADD BUSINESS</NavLink>
                      </NavItem>
                      <NavItem>
                          <NavLink to="#" onClick={() => this.toggle(6)} ><FontAwesomeIcon icon="folder-plus" />SIGN UP</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink to="#">LOGIN</NavLink>
                      </NavItem>
                    </NavbarNav>
                </Collapse>
            </Navbar>
        </Router>
        <Container style={container} className=" ">
        <Modal className="mt-5 " isOpen={this.state.modal6} toggle={() => this.toggle(6)} side position="top-right">
          <ModalHeader toggle={() => this.toggle(6)}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.toggle(6)}>Close</Button>
            <Button color="primary">Save changes</Button>
          </ModalFooter>
        </Modal>
        </Container>
      </div>
    );
  }
}

export default NonFixedNavbarExample;