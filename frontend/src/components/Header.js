import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, Container, NavbarBrand, NavDropdown} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { logout } from '../actions/userActions'

const Header = () => {

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo} = userLogin

  const logoutHandler = () =>{
    dispatch(logout())
  }

    return (
      <div className="header">
        <Navbar variante='dark' expand="lg" collapseOnSelect>      
          <Container> 
          <NavbarBrand className="name">
            <Nav.Link href="/">
            iGALLERY
            </Nav.Link>
            </NavbarBrand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <LinkContainer to='/register'>
              <Nav.Link>
                  REGISTER
                </Nav.Link>

               </LinkContainer>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>LogOut</NavDropdown.Item>
                  </NavDropdown>
                ):<LinkContainer to='/login'>
              <Nav.Link>
                  <i className='fas fa-user'></i>LOGIN
                </Nav.Link>
              </LinkContainer
              >}
              <LinkContainer to='/cart'>
              <Nav.Link>
                  <i className='fas fa-shopping-cart'></i>
                  </Nav.Link>
              </LinkContainer>
            </Nav>
           </Navbar.Collapse>
                </Container>
        </Navbar>
        
      </div>
    )
}

export default Header
