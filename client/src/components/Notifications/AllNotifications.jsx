import React, { Component } from "react";
import {
    MDBContainer,
    MDBBadge,
    MDBCol
  } from "mdbreact";
  import {fetchAllNotifications } from "../../actions/notificationAction";
import NavigationBar from "../commons/NavigationBar";
import NotificationList from './NotificationList'
import toastNotification from "./../../utils/toastNotification";
import LoadingAnimation from "../commons/LoadingAnimation";
import { connect } from "react-redux";
class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoading: false,
          isError: false,
          isNewNotification:'active',
          isAllNotification:false,
          modal4: false,
        };
      }
      componentDidMount() {
        this.fetchAllNotifications();
      }
      toggle(nr) {
        let modalNumber = 'modal' + nr
        this.setState({
          [modalNumber]: !this.state[modalNumber]
        });
      }
      fetchAllNotifications =() =>{
        this.setState({ isLoading: true });
        this.props
          .dispatch(fetchAllNotifications())
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
    if (this.props.allNotifications){
      const formatDate = (unformatedDate) => {
        const  date = new Date(unformatedDate)
        const day = date.getDate()
        const month = date.getMonth()+1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`
              }
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
            <ul class="nav nav-tabs nav-fill ml-2">
              <li class="nav-item">
                <a class="nav-link  hover d-flex justify-content-between align-items-center "
                  href="/notifications"> New
                  <MDBBadge color="primary" pill>
                {this.props.allNotificationsCount}
                  </MDBBadge>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link active d-flex justify-content-between align-items-center "
                  href="#">
                  All
                  <MDBBadge color="primary" pill>
                    {this.props.allNotifications.length}
                  </MDBBadge>
                </a>
              </li>
            </ul>
            {
              this.props.allNotifications.map((notification)=>{
                return <NotificationList 
            key = {notification.id}
            id = {notification.id}
            title= {notification.title}
            date= {formatDate(notification.createdAt)}
            />
              }) 
           
            }
    </MDBCol>
        </MDBContainer>
    </>
        
    );
  }
  else {
    return (null)
  }
}
}
const mapStateToProps = state => {
    console.log(state.notificationsReducer.allNotifications.newNotificationsCount)
    return {
      allNotifications: state.notificationsReducer.allNotifications.allNotifications,
      allNotificationsCount: state.notificationsReducer.allNotifications.newNotificationsCount
    }}
export default connect(mapStateToProps)(Notifications);