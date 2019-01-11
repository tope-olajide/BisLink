import React, { Component } from "react";
import {
    MDBContainer,
    MDBBadge,
    MDBCol
  } from "mdbreact";
import NavigationBar from "../commons/NavigationBar";
import NotificationPage from './NotificationPage'
class Notifications extends Component {
  render() {
    return (<>
    <NavigationBar notifications="active" />
            <MDBContainer
          style={{
            width: "70%","margin-left": "auto","margin-right": "auto"}}
          className=" ">
          <MDBCol
            style={{ "margin-left": "auto", "margin-right": "auto" }}
            className="mt-4 col-md-9 p-2 mb-5">
            <ul class="nav nav-tabs nav-fill ml-2">
              <li class="nav-item">
                <a class="nav-link active hover d-flex justify-content-between align-items-center "
                  href="#"> New
                  <MDBBadge color="primary" pill>
                    14
                  </MDBBadge>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link  d-flex justify-content-between align-items-center "
                  href="#">
                  All
                  <MDBBadge color="primary" pill>
                    14
                  </MDBBadge>
                </a>
              </li>
            </ul>
    <NotificationPage />
    </MDBCol>
        </MDBContainer>
    </>
        
    );
  }
}
export default Notifications;
