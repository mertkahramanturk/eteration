import React, { useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Container, NavbarToggler, NavbarBrand, Navbar} from "reactstrap";
import Search from './Search';
import TopbarRight from './TopbarRight';

function Topbar() {
  const navigate = useNavigate()
  const menuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const sidebarClassName = isOpen ? "navbar-mobile" : "navbar-mobile closed";


  const handleMenuOpen = () => {
    setIsOpen(!isOpen)
  }



  return (
    <React.Fragment>
      <Navbar id="topnav" color="white" expand="xl">
        <Container className="d-flex align-items-center position-relative justify-content-between" >
          <NavbarToggler onClick={() => handleMenuOpen()} style={{ marginLeft: 'auto', border: 'none', display: 'contents' }} className="d-xl-none">
            {isOpen ?
              ""
              :
              <i className="fas fa-bars text-primary mt-2 mb-2" style={{ fontSize: '30px' }} ></i>
            }
          </NavbarToggler>
          <NavbarBrand href="/" className="mt-0" style={{ top: '0' }} aria-label="eteration">
            <span className='text-white'>  Eteration</span>
          </NavbarBrand>
          <Search />
          <TopbarRight />
        </Container>
        <div ref={menuRef} className={sidebarClassName}>
          <div className="d-flex justify-content-start text-muted minus-button" id="filter-close-button" onClick={() => handleMenuOpen()} style={{ fontSize: '12px' }}></div>
          <div onClick={() => { navigate('/'); handleMenuOpen() }} className="cursor-pointer px-4">
           <span className='text-white'>  Eteration</span>
          </div>
        </div>
      </Navbar>
    </React.Fragment>
  );
}

export default Topbar