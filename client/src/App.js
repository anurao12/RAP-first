import React, { Component } from 'react';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBFooter,
  MDBLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon
} from 'mdbreact';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import store from "./store";
import { Provider } from "react-redux";
import { API_URL } from './config';
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./signin";
  }
}

class App extends Component {
  state = {
    collapseID: '',
    loading: true
  };

  componentDidMount = () => {
    fetch(`${API_URL}/wake-up`)
      .then(res => res.json())
      .then(() => {
        this.setState({ loading: false })
      })
      .catch(err => console.log(err))
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ''
    }));

  closeCollapse = collID => () => {
    const { collapseID } = this.state;
    window.scrollTo(0, 0);
    collapseID === collID && this.setState({ collapseID: '' });
  };

  render() {
    const overlay = (
      <div
        id='sidenav-overlay'
        style={{ backgroundColor: 'transparent' }}
        onClick={this.toggleCollapse('mainNavbarCollapse')}
      />
    );

    const { collapseID } = this.state;

    return (
      <Provider store={store}>
      <Router>
        <div className='flyout'>
          <MDBNavbar color='indigo' dark expand='md' fixed='top' scrolling>

            <MDBNavbarBrand href='/' className='py-0 font-weight-bold'>
              {/* <Logo style={{ height: '2.5rem', width: '2.5rem' }} /> */}
              <strong className='align-middle'>RAP</strong>
            </MDBNavbarBrand>

            <MDBNavbarToggler
              onClick={this.toggleCollapse('mainNavbarCollapse')}
            />
            <MDBCollapse id='mainNavbarCollapse' isOpen={collapseID} navbar>
              <MDBNavbarNav left>
                <MDBNavItem active>
                  <MDBLink to='/'>Home</MDBLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBLink to='#!'>Features</MDBLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBLink to='#!'>Pricing</MDBLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <div className='d-none d-md-inline'>MDBDropdown</div>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className='dropdown-default' right>
                      <MDBDropdownItem href='#!'>Action</MDBDropdownItem>
                      <MDBDropdownItem href='#!'>
                        Another Action
                      </MDBDropdownItem>
                      <MDBDropdownItem href='#!'>
                        Something else here
                      </MDBDropdownItem>
                      <MDBDropdownItem href='#!'>
                        Something else here
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
              </MDBNavbarNav>
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBLink className='waves-effect waves-light' to='#!'>
                    <MDBIcon brand icon='twitter' />
                  </MDBLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBLink className='waves-effect waves-light' to='#!'>
                    <MDBIcon brand icon='google-plus' />
                  </MDBLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <MDBIcon icon='user' />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu right>
                      <MDBDropdownItem href='/signin'>
                        SignIn
                      </MDBDropdownItem>
                      <MDBDropdownItem href='/emailConfirm'>
                        Register
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
              </MDBNavbarNav>


            </MDBCollapse>

          </MDBNavbar>
          {collapseID && overlay}
          <main style={{ marginTop: '4rem' }}>
            <Routes />
          </main>
          <MDBFooter color='indigo'>
            <p className='footer-copyright mb-0 py-3 text-center'>
              &copy; {new Date().getFullYear()}
              <a href='https://www.mphasis.com'> Mphasis. </a> All rights reserved
            </p>
          </MDBFooter>
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
