import React from 'react'
import { Route } from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, Container, NavbarBrand, NavDropdown} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { logout } from '../actions/userActions'
import SearchBar from './SearchBar'

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

            <Route render={({history}) => <SearchBar history={history}/>} />
            
            <Nav className="ml-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
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
                ):(<LinkContainer to='/login'>
              <Nav.Link>
                  <i className='fas fa-user'></i>LOGIN
                </Nav.Link>
              </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                <LinkContainer to='/admin/userlist'>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/productlist'>
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/orderlist'>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              )}
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
