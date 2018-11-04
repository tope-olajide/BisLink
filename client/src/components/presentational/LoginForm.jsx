import React from 'react';
import { Container, Row, Col, Input, Button } from 'mdbreact';
import './styles/LoginForm.css'
class FormsPage extends React.Component  {
  render() {
    return(
      <Container>
        <Row>
          <Col md="">
            <form className = 'form-width'>
              <p className="h4 text-center mt-4 mb-4">Sign in</p>
              <div className="grey-text">
                <Input label="Type your email" icon="envelope" group type="email" validate error="wrong" success="right"/>
                <Input label="Type your password" icon="lock" group type="password" validate/>
              </div>
              <div className="text-center">
                <Button>Login</Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default FormsPage;