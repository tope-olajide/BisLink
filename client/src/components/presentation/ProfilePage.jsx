import React, { Component } from "react";
import "./ProfilePage.css";
import ProfileTab from "./ProfileTab";
import EditProfileForm from './EditProfileForm'
import {Container, Modal, ModalBody, ModalHeader } from 'mdbreact'
class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      modal6: false,
      modal7: false
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }
  toggle(nr) {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }
  render() {
    return (
      <div>
                  <Container  className="modal-margin">
        <Modal className="mt-1 " isOpen={this.state.modal6} size='md' toggle={() => this.toggle(6)}>
       
          <ModalBody> <ModalHeader toggle={() => this.toggle(4)}></ModalHeader>
            <EditProfileForm />
          </ModalBody>
 
        </Modal>
        </Container>
        <div class="header" />
        <div class="dashboard-containers ">
          <div class="row">
            <div class="profile-section col-md-4">
              <img src="avatar.jpg" class="mx-auto d-block" />
              <div class=" profile-text">
                <h5>Jane Doe</h5>
                <p>Lagos</p>
              </div>
              <table class="table table-bordered">
                <tr>
                  <th scope="col">
                    <h4>23</h4>
                    <p>Business</p>
                  </th>
                  <th scope="col">
                    <h4>45</h4>
                    <p>Followers</p>
                  </th>
                  <th scope="col">
                    <h4>34</h4>
                    <p>Following</p>
                  </th>
                </tr>
              </table>
              <p class="user-info">
                Hi ! My name is Jane Doe. I'm a UI/UX Designer from Paris, in
                France. I really enjoy photography and mountains.
              </p>
              <button
                class=" mb-5 btn btn-outline-dark  bg-dark btn-rounded btn-block my-4 "
                type="button" onClick={() => this.toggle(6)} 
              >
                Edit profile
              </button>
            </div>
            <div class="dashboard-section col-md-8">
              <br />
              <ProfileTab />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProfilePage;
