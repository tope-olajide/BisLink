import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import LoginForm from '../presentation/LoginForm'
import SignUpForm from '../presentation/SignUpForm'
import './styles/LoginForm.css'
import './navBar.css'
import { BrowserRouter as Router } from 'react-router-dom';
class NavigationBar extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          collapse: false,
          modal6: false,
          modal7: false
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
    return (
        <div>
          <Router>
            <Navbar color="black" dark className = 'zindex' expand="md" scrolling>
                <NavbarBrand href="/">
                    <strong><FontAwesomeIcon icon="" size="1x" />BISLINK</strong>
                </NavbarBrand>
                <NavbarToggler onClick={this.onClick } />
                <Collapse isOpen = { this.state.collapse } navbar>
                    <NavbarNav left>
                      <NavItem  >
                          <NavLink to="/"><FontAwesomeIcon icon="home" />HOME</NavLink>
                      </NavItem>
                      <NavItem>
                          <NavLink to="/businesses"><FontAwesomeIcon icon="briefcase" />CATALOGUE</NavLink>
                      </NavItem>

                    </NavbarNav>
                    <NavbarNav right>
                    <NavItem>
                          <NavLink to="#"><FontAwesomeIcon icon="search" />SEARCH</NavLink>
                      </NavItem>
                      <NavItem>
                          <NavLink to="register-business"><FontAwesomeIcon icon="folder-plus" />ADD BUSINESS</NavLink>
                      </NavItem>
                      <NavItem>
                          <NavLink to="#"onClick={() => this.toggle(7)} ><FontAwesomeIcon icon="user-plus" />SIGN UP</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink to="#"onClick={() => this.toggle(6)} ><FontAwesomeIcon icon="user" />LOGIN</NavLink>
                      </NavItem>
                    </NavbarNav>
                </Collapse>
            </Navbar>
        </Router>
        <Container  className="modal-margin">
        <Modal className="mt-5 " isOpen={this.state.modal6} toggle={() => this.toggle(6)} side position="top-right">
        
          <ModalBody>
            <LoginForm />
          </ModalBody>
 
        </Modal>
        <Modal className="mt-5 " isOpen={this.state.modal7} toggle={() => this.toggle(7)} side position="top-right">
        <ModalBody>
          <SignUpForm />
        </ModalBody>

      </Modal>
        </Container>
      </div>
    );
  }
}

export default NavigationBar;