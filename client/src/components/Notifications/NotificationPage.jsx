import React, { Component } from "react";
import { MDBListGroup, MDBBtn, MDBContainer,MDBBtnGroup,MDBListGroupItem, MDBRow,MDBBadge, MDBCol } from "mdbreact";
import NavigationBar from "../commons/NavigationBar";
class NotificationPaage extends Component {
    render () {
        return (
          <> 
          <NavigationBar />
<MDBContainer style={{ width: "70%",'margin-left':'auto','margin-right':'auto' }} className=" ">

<MDBCol style={{ 'margin-left':'auto','margin-right':'auto' }} className="mt-4 col-md-9 p-2 mb-5">

      <ul class="nav nav-tabs nav-fill ml-2">
                            <li class="nav-item">
                              <a class="nav-link active hover d-flex justify-content-between align-items-center " href="#"> New <MDBBadge color="primary"pill>14</MDBBadge></a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link  d-flex justify-content-between align-items-center " href="#"> All <MDBBadge color="primary"pill>14</MDBBadge></a>
                            </li>

                          </ul>
  <MDBListGroup className = 'px-0'>
  <MDBListGroupItem className="card" hover href="#">
      <h5 className="pr-5 ">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
        blandit.</h5>
        <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1"></h5>
        <small className="text-muted">3 days ago</small>
      </div>
    </MDBListGroupItem> <br />
   
    <MDBListGroupItem className=" card " hover href="#">
      <h5 className="mb-1 ">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
        blandit.</h5>
        <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1"></h5>
        <small className="text-muted">3 days ago</small>
      </div>
    </MDBListGroupItem>
  </MDBListGroup>
    
</MDBCol>
  
</MDBContainer>
</>
        )
    }
}
export default NotificationPaage