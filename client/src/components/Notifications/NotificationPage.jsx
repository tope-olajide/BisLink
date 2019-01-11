import React, { Component } from "react";
import {
  MDBListGroup,
  MDBListGroupItem,

} from "mdbreact";
class NotificationPaage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false
    };
  }
  componentDidMount() {
    this.fetchNotifications();
  }
  render() {
    return (
      <><MDBListGroup className="px-0">
              <MDBListGroupItem className="card" hover href="#">
                <h5 className="pr-5 ">
                  Donec id elit non mi porta gravida at eget metus. Maecenas sed
                  diam eget risus varius blandit.
                </h5>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1" />
                  <small className="text-muted">3 days ago</small>
                </div>
              </MDBListGroupItem>{" "}
              <br />
              <MDBListGroupItem className=" card " hover href="#">
                <h5 className="mb-1 ">
                  Donec id elit non mi porta gravida at eget metus. Maecenas sed
                  diam eget risus varius blandit.
                </h5>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1" />
                  <small className="text-muted">3 days ago</small>
                </div>
              </MDBListGroupItem>
            </MDBListGroup>

      </>
    );
  }
}
export default NotificationPaage;
