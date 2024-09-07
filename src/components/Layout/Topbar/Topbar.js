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
        <Container className="d-flex align-items-center position-relative justify-content-between flex-wrap" >
          <NavbarToggler onClick={() => handleMenuOpen()} style={{ marginLeft: 'auto', border: 'none', display: 'contents' }} className="d-xl-none">
            {isOpen ? "": <i className="fas fa-bars text-white mt-2 mb-2 font-size-20" ></i> }
          </NavbarToggler>
          <NavbarBrand href="/" className="mt-0" style={{ top: '0' }} aria-label="eteration">
            <span className='text-white'>  Eteration</span>
          </NavbarBrand>
          <Search />
          <TopbarRight />
        </Container>
        <div ref={menuRef} className={sidebarClassName}>
          <div className="d-flex justify-content-start text-muted minus-button font-size-16" id="filter-close-button" onClick={() => handleMenuOpen()}></div>
          <div onClick={() => { navigate('/'); handleMenuOpen() }} className="cursor-pointer px-2 my-2 d-flex justify-content-between align-items-center">
           <span className='text-dark font-size-20'>  Eteration</span>
           <i className='fas fa-times text-dark font-size-20' />

          </div>
        </div>
      </Navbar>
    </React.Fragment>
  );
}

export default Topbar