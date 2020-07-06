import React, { Component } from 'react';
import {
  MDBEdgeHeader,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBJumbotron,
  MDBIcon,
  MDBInput,
  MDBBtn,
  MDBAnimation
} from 'mdbreact';
import classnames from "classnames";
import { loginUser } from '../actions/authActions';
import { connect } from "react-redux";
import PropTypes from "prop-types";

class SigninPage extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  };


  render() {
    const { errors } = this.state;

    return (
      <>
        <MDBEdgeHeader color='indigo darken-3' className='sectionPage' />
        <MDBAnimation type='zoomIn' duration='500ms'>
          <MDBContainer>
            <MDBRow>
              <MDBCol md='8' className='mt-3 mx-auto'>
                <MDBJumbotron>
                  <h1 className='text-center'>
                    <MDBIcon icon='edit' className='indigo-text mr-2' />
                    Sign in
                  </h1>
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className='grey-text'>
                      <MDBInput
                        onChange={this.onChange}
                        value={this.state.email}
                        error={errors.email}
                        id="email"
                        type="email"
                        className={classnames("", {
                          invalid: errors.email || errors.emailnotfound
                        })}
                        label='Type your email'
                        icon='envelope'
                        group
                        validate
                        success='right'
                        required
                      /><span className="red-text">
                        {errors.email}
                        {errors.emailnotfound}
                      </span>
                      <MDBInput
                        onChange={this.onChange}
                        value={this.state.password}
                        error={errors.password}
                        id="password"
                        type="password"
                        className={classnames("", {
                          invalid: errors.password || errors.passwordincorrect
                        })}
                        label='Type your password'
                        icon='lock'
                        group
                        validate
                        required
                      /><span className="red-text">
                        {errors.password}
                        {errors.passwordincorrect}
                      </span>
                    </div>
                    <div className='text-center'>
                      <MDBBtn type="submit" >Login</MDBBtn>
                    </div>
                  </form>
                </MDBJumbotron>

              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBAnimation>
      </>
    );
  }
}

SigninPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// export default SigninPage;
export default connect(
  mapStateToProps,
  { loginUser }
)(SigninPage);
