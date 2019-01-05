import React, { Component } from "react";
import { MDBListGroup, MDBBtn, MDBContainer,MDBBtnGroup,MDBListGroupItem, MDBRow,MDBBadge, MDBCol } from "mdbreact";
import NavigationBar from "../commons/NavigationBar";
class NotificationPaage extends Component {
    render () {
        return (
          <> 
          <NavigationBar />
<MDBContainer style={{ width: "70%",'margin-left':'auto','margin-right':'auto' }} className=" ">
{/* <MDBCol  md="4" className="mt-5">
  <MDBListGroup style={{ width: "100%" }}>
    <MDBListGroupItem  className=" border-0 rounded " href="#" active>Cras justo odio</MDBListGroupItem>
    <MDBListGroupItem className=" border-0 rounded" href="#" hover>Dapibus ac facilisis in</MDBListGroupItem>
  </MDBListGroup>
    </MDBCol> */}

<MDBCol style={{ 'margin-left':'auto','margin-right':'auto' }} className="mt-4 col-md-9 p-2 mb-5">

      <MDBBtnGroup className="px-5 py-1 col-md-12 " >
      <MDBListGroupItem  className="d-flex justify-content-between align-items-center rounded-0  col-md-6 mr-3" href="#" active hover >New <MDBBadge color="primary"
        pill>14</MDBBadge></MDBListGroupItem>
      <MDBListGroupItem  className="pr-5 d-flex justify-content-between align-items-center border-0 rounded-0 rounded ml-4 col-md-6" href="#" hover >All <MDBBadge color="primary"
        pill>14</MDBBadge></MDBListGroupItem>
      
      </MDBBtnGroup>
  <MDBListGroup className = ' px-0  '>
  <MDBListGroupItem className="card  " hover href="#">
      <h5 className=" pr-5 ">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
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