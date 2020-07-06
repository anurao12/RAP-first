import React, { Component } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn
} from 'mdbreact';
// import DocsLink from '../components/docsLink';
import SectionContainer from '../components/sectionContainer';

class FormsPage extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal
    });
  };

  render() {
    // const { modal } = this.state;

    return (
      <MDBContainer className='mt-5'>
        {/* <DocsLink
          title='Forms'
          href='https://mdbootstrap.com/docs/react/forms/basic/'
        /> */}
        <SectionContainer header='Sign in' noBorder>
          <MDBRow>
            <MDBCol md='6'>
              <SectionContainer>
                <form>
                  <p className='h5 text-center mb-4'>Sign in</p>
                  <div className='grey-text'>
                    <MDBInput
                      label='Type your email'
                      icon='envelope'
                      group
                      type='email'
                      validate
                      error='wrong'
                      success='right'
                    />
                    <MDBInput
                      label='Type your password'
                      icon='lock'
                      group
                      type='password'
                      validate
                    />
                  </div>
                  <div className='text-center'>
                    <MDBBtn>Login</MDBBtn>
                  </div>
                </form>
              </SectionContainer>
            </MDBCol>
          </MDBRow>
        </SectionContainer>
      </MDBContainer>
    );
  }
}

export default FormsPage;
