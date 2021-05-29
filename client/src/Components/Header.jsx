import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const Header = () => {
    return ( 
        <div className="mb-5">
            <Navbar color="secondary" light>
            <NavbarBrand href="/" className="mr-auto"><span className="header_title">
                CSV UPLOADER</span></NavbarBrand>
        {/* <NavbarToggler onClick={toggleNavbar} className="mr-2" /> */}
        {/* <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
          </Nav>
        </Collapse> */}
      </Navbar>
        </div>
     );
}
 
export default Header;