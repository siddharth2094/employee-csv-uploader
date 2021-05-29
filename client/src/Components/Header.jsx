import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

const Header = () => {
    return ( 
        <div className="mb-5">
            <Navbar color="secondary" light>
            <NavbarBrand href="/" className="mr-auto"><span className="header_title">
                EMPLOYEE CSV UPLOADER</span></NavbarBrand>
      </Navbar>
        </div>
     );
}
 
export default Header;