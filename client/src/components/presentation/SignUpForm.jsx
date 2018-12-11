import React from 'react';
import { Container, Row, Col, Input, Button } from 'mdbreact';

class FormsPage extends React.Component  {
  render() {
    return(
      <Container>
        <Row>
          <Col>
            <form>
              <p className="h5 text-center">Sign up</p>
              <div className="grey-text">
                <Input label="Your fullname" icon="user-plus" group type="text" validate error="wrong" success="right"/>
                <Input label="Your username" icon="user" group type="text" validate error="wrong" success="right"/>
                <Input label="Your email" icon="envelope" group type="email" validate error="wrong" success="right"/>
                <Input label="Your password" icon="lock" group type="password" validate/>
                <Input label="confirm your password" icon="exclamation-triangle" group type="password" validate/>
              </div>
              <div className="text-center">
                <Button color="primary">Register</Button>
                
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
};
export default FormsPage;