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
    MDBAnimation,
    MDBModal,
    MDBModalBody
} from 'mdbreact';

class EmailConfirmPage extends Component {
    state = {
        modal1: false,
    }
    toggle = nr => () => {
        const modalNumber = `modal${nr}`;
        this.setState({
            ...this.state,
            [modalNumber]: !this.state[modalNumber]
        });
    };
    render() {
        const {
            modal1 } = this.state;
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
                                        Subscribe us to signin
                                    </h1>
                                    <form>
                                        <div className='grey-text'>
                                            <MDBInput
                                                label='Your email'
                                                icon='envelope'
                                                group
                                                type='email'
                                                validate
                                                error='wrong'
                                                success='right'
                                            />
                                        </div>
                                        <div className='text-center'>
                                            {/* <SectionContainer header='Cookies' flexCenter> */}
                                            <MDBBtn outline color='info' onClick={this.toggle(1)}>
                                                Send <MDBIcon icon='paper-plane' className='ml-1' /></MDBBtn>
                                            <MDBModal
                                                position='bottom'
                                                backdrop={false}
                                                frame
                                                isOpen={modal1}
                                                toggle={this.toggle(1)}
                                            >
                                                <MDBModalBody>
                                                    <MDBRow className='justify-content-center align-items-center'>
                                                        <p className='pt-3 pr-2'>
                                                            Email sent, our backend team will confirm your email soon.
                                                        </p>
                                                        <MDBBtn color='primary' href="/register">
                                                            Register
                                                        <MDBIcon icon='book' className='ml-1' />
                                                        </MDBBtn>
                                                        <MDBBtn color='primary' outline onClick={this.toggle(1)}>
                                                            Ok, thanks
                                                    </MDBBtn>
                                                    </MDBRow>
                                                </MDBModalBody>
                                            </MDBModal>
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

export default EmailConfirmPage;
