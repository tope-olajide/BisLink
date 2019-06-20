
 import React, { Component } from "react";
import {
    MDBContainer,
    MDBBadge,
    MDBListGroup, MDBListGroupItem 
  } from "mdbreact";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { fetchSingleNotification } from "../../actions/notificationAction";
import NavigationBar from "../commons/NavigationBar";
import toastNotification from "./../../utils/toastNotification";
import LoadingAnimation from "../commons/LoadingAnimation";import Footer from "../commons/Footer";
import { connect } from "react-redux";
import NotificationNav from './NotificationNav'
class NotificationDetails extends Component {
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
    if (this.props.notificationDetails) {
    return (
      <>
      <NavigationBar />
      <div className="card p-5 text-center mt-4"style={{"width": "60%","margin-left": "auto","margin-right": "auto"}}>

<ul class="nav nav-tabs ">
  <li class="nav-item">
    <a class="nav-link active" href="#"><h5><FontAwesomeIcon icon="bell"  className="mr-2" /> Notifications</h5></a>
  </li>
   
</ul>
<div className="row">
<NotificationNav 
newNotificationsCount={this.props.unreadNotificationsCount}
readNotificationsCount={this.props.readNotificationsCount}
allNotificationsCount ={this.props.allNotificationsCount} 
/>
<div className="col-md-8 ">

<MDBListGroup className="px-1">
              <MDBListGroupItem className="py-4 my-2"  >
               <h5 className="text-right d-inline  ">
              {this.props.notificationDetails}
                </h5>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1" />
                 
                </div>
              </MDBListGroupItem>  
         </MDBListGroup>
</div>
</div>
</div>
<Footer />
      </>
    )
  }
else{
  return(
    <></>
  )
}}
}
const mapStateToProps = state => {
  console.log(state.notificationsReducer.viewNotificationDetails.notification)
  return {
    notificationDetails:state.notificationsReducer.viewNotificationDetails.notification,
    allNotificationsCount:state.notificationsReducer.viewNotificationDetails.allNotificationsCount,
    readNotificationsCount:state.notificationsReducer.viewNotificationDetails.readNotificationsCount,
    unreadNotificationsCount:state.notificationsReducer.viewNotificationDetails.unreadNotificationsCount,
  }}
  
export default connect(mapStateToProps)(NotificationDetails);
