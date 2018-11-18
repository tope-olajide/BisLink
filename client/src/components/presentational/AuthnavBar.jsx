import React, {Component} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Navbar,
    NavbarBrand,
    NavbarNav,
    NavbarToggler,
    Collapse,
    NavItem,
    NavLink
  } from "mdbreact";
class AuthNavBar extends Component {
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
render () {
    return (
        <div>
           <Navbar color="black" dark expand="md" scrolling>
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
              <NavItem>
                <NavLink to="/businesses">
                  <FontAwesomeIcon icon="briefcase" /> CATALOGUE
                </NavLink>
              </NavItem>
            </NavbarNav>
            <NavbarNav right>
              <NavItem>
                <NavLink to="#">
                  <FontAwesomeIcon icon="search" /> SEARCH
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/register-business">
                  <FontAwesomeIcon icon="folder-plus" /> ADD BUSINESS
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="#" >
                  <FontAwesomeIcon icon="user-minus" /> SIGN OUT
                </NavLink>
              </NavItem>
            </NavbarNav>
          </Collapse>
        </Navbar> 
        </div>
    )
}
}
export default AuthNavBar;