import React, { Component } from "react";
import {
    MDBContainer,
    MDBBadge,
    MDBCol
  } from "mdbreact";
  import { fetchSingleNotification } from "../../actions/notificationAction";
import NavigationBar from "../commons/NavigationBar";
import NotificationPage from './NotificationList'
import toastNotification from "./../../utils/toastNotification";
import LoadingAnimation from "../commons/LoadingAnimation";
import { connect } from "react-redux";
class Notifications extends Component {
  componentDidMount() {
    this.fetchNotificationDetails();
  }
  fetchNotificationDetails =() =>{
    const {notificationId} = this.props.match.params;
    this.setState({ isLoading: true });
    this.props
      .dispatch(fetchSingleNotification(notificationId))
      .then(() => {
        this.setState({
          isLoading: false,
          isError: false
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          isError: true
        });
        if (!error.response){
            toastNotification(["error"],'Network Error!' )
        }else {
             toastNotification(["error"], error.response.data.message);
        }
       
      });
  }
     
  render() {
    return (
    <>
    <NavigationBar notifications="active" />
            <MDBContainer
          style={{
            width: "70%","margin-left": "auto","margin-right": "auto"}}
          className=" ">
          <MDBCol
            style={{ "margin-left": "auto", "margin-right": "auto" }}
            className="mt-4 col-md-9 p-2 mb-5">
            <ul class="nav nav-tabs nav-fill ml-2 mb-4">
              <li class="nav-item">
                <a class="nav-link active hover d-flex justify-content-between align-items-center "
                  href="/notifications/all"> <MDBBadge color="primary" pill>
                  BACK 
                </MDBBadge>
                </a>
              </li>
              <li class="nav-item">

              </li>
            </ul>
            <blockquote className="text-center card p-3 " style={{"margin-left": "auto","margin-right": "auto"}}>
  <h3  className="text-center ">{this.props.notificationDetails.message}</h3>
</blockquote>
    </MDBCol>
        </MDBContainer>
    </>
        
    );
  }
}
const mapStateToProps = state => {
    console.log(state.notificationsReducer.viewNotificationDetails)
    return {
      notificationDetails:state.notificationsReducer.viewNotificationDetails
    }}
export default connect(mapStateToProps)(Notifications);