import React, { Component } from 'react';
import {
  MDBContainer,
  MDBBadge,
  MDBCol,
  Button
} from "mdbreact";
import {
  fetchAllNewNotifications,
  fetchAllNotifications
} from "../../actions/notificationAction";
import NavigationBar from "../commons/NavigationBar";
import Footer from "../commons/Footer";
import NotificationList from "./NotificationList";
import toastNotification from "./../../utils/toastNotification";
import LoadingAnimation from "../commons/LoadingAnimation";
import { connect } from "react-redux";
class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false
    };
  }
  componentDidMount() {
    this.fetchNewNotifications();
  }
  fetchAllNotifications = () => {
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
        if (!error.response) {
          toastNotification(["error"], "Network Error!");
        } else {
          toastNotification(["error"], error.response.data.message);
        }
      });
  };
  fetchNewNotifications = () => {
    this.setState({ isLoading: true });
    this.props
      .dispatch(fetchAllNewNotifications())
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
        if (!error.response) {
          toastNotification(["error"], "Network Error!");
        } else {
          toastNotification(["error"], error.response.data.message);
        }
      });
  };
  render (){
    if (this.props.newNotifications) {
      const formatDate = unformatedDate => {
        const date = new Date(unformatedDate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };
    return(
      <>
      <NavigationBar />
<div className="card p-5 text-center mt-4 notification-container">

<ul class="nav nav-tabs ">
  <li class="nav-item">
    <a class="nav-link active" href="#"><h5>Notifications</h5></a>
  </li>
   
</ul>
<div className="row">
<div className="col-md-4 text-left">
<nav class="nav flex-column nav-pills nav-justified">
  <a class="nav-link active d-flex justify-content-between align-items-center my-1" href="#">Unread <MDBBadge color="primary" pill>
                {this.props.newNotifications.length}
                  </MDBBadge></a>
  <a class="nav-link my-1 d-flex justify-content-between align-items-center" href="/notifications/seen">Read  <MDBBadge color="primary" pill>
                     {this.props.readNotificationsCount} 
                  </MDBBadge></a>
  <a class="nav-link my-1 d-flex justify-content-between align-items-center" href="/notifications/all" >All Notifications <MDBBadge color="primary" pill>
                     {this.props.allNotificationsCount} 
                  </MDBBadge></a>
  <a class="nav-link  my-3" href="#">Mark all as read</a>
</nav>
</div>
<div className="col-md-8 ">
<MDBCol className="mt-0 mb-5">
{this.props.newNotifications.map(notification => {
                return (
                  <NotificationList
                    key={notification.id}
                    id={notification.id}
                    title={notification.title}
                    date={formatDate(notification.createdAt)}
                  />
                );
              })}
</MDBCol>
</div>
</div>
</div>
<Footer />
</>
    )
  }
  if (this.state.isLoading){
    return(<LoadingAnimation />) 
   }
  else {
    return null;
  }
}}
const mapStateToProps = state => {
  return {
    newNotifications:
      state.notificationsReducer.unreadNotification.unreadNotifications,
    allNotificationsCount:
      state.notificationsReducer.unreadNotification.allNotificationsCount,
      readNotificationsCount:
      state.notificationsReducer.unreadNotification.readNotificationsCount
  };
};
export default connect(mapStateToProps)(Notifications);

