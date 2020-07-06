import React, { Component } from 'react';
import {
    MDBEdgeHeader,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBJumbotron,
    MDBIcon,
    MDBAnimation,
    MDBInput,
    MDBBtn
} from 'mdbreact';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { RegisterUser } from '../actions/authActions';
import classnames from "classnames";

class RegistrationPage extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }
    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/register");
        }
    }

    componentWillReceiveProps(nextProps) {
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

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.RegisterUser(newUser, this.props.history);
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
                                         Register
                                </h1>
                                    <form noValidate onSubmit={this.onSubmit}>
                                        <div className='grey-text'>
                                            <MDBInput
                                                onChange={this.onChange}
                                                value={this.state.name}
                                                error={errors.name}
                                                id="name"
                                                type="text"
                                                className={classnames("", {
                                                    invalid: errors.name
                                                })}
                                                label='Your name'
                                                icon='user'
                                                group
                                                validate
                                                success='right'
                                                required

                                            />

                                            <MDBInput
                                                onChange={this.onChange}
                                                value={this.state.email}
                                                error={errors.email}
                                                id="email"
                                                type="email"
                                                className={classnames("", {
                                                    invalid: errors.email
                                                })}
                                                label='Your email'
                                                icon='envelope'
                                                group
                                                validate
                                                success='right'
                                                required
                                            />
                                            <MDBInput
                                                onChange={this.onChange}
                                                value={this.state.password}
                                                error={errors.password}
                                                id="password"
                                                type="password"
                                                className={classnames("", {
                                                    invalid: errors.password
                                                })}
                                                label='Your password'
                                                icon='lock'
                                                group
                                                validate
                                                success='right'
                                                required
                                            />
                                            <MDBInput
                                                onChange={this.onChange}
                                                value={this.state.password2}
                                                error={errors.password2}
                                                id="password2"
                                                type="password"
                                                className={classnames("", {
                                                    invalid: errors.password2
                                                })}
                                                label='Confirm your password'
                                                icon='exclamation-triangle'
                                                group
                                                validate
                                                success='right'
                                                required
                                            />
                                        </div>
                                        <div className='text-center'>
                                            <MDBBtn color='primary' type="submit">Submit</MDBBtn>
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
RegistrationPage.propTypes = {
    RegisterUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { RegisterUser }
)(withRouter(RegistrationPage));

