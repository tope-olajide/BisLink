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
class AllNotifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false
    };
  }
  componentDidMount() {
    this.fetchAllNotifications();
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
    if (this.props.allNotifications) {
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
<div className="card p-5 text-center mt-4"style={{"width": "60%","margin-left": "auto","margin-right": "auto"}}>
<ul class="nav nav-tabs ">
  <li class="nav-item">
    <a class="nav-link active" href="#"><h5>Notifications</h5></a>
  </li>
   
</ul>
<div className="row">
<div className="col-md-4 text-left">
<nav class="nav flex-column nav-pills nav-justified">
  <a class="nav-link  d-flex justify-content-between align-items-center my-1" href="/notifications">Unread <MDBBadge color="primary" pill>
                {this.props.newNotificationsCount}
                  </MDBBadge></a>
  <a class="nav-link my-1 d-flex justify-content-between align-items-center" href="/notifications/seen">Read  <MDBBadge color="primary" pill>
                     {this.props.readNotificationsCount} 
                  </MDBBadge></a>
  <a class="nav-link active my-1 d-flex justify-content-between align-items-center" href="#" >All Notifications <MDBBadge color="primary" pill>
                     {this.props.allNotifications.length} 
                  </MDBBadge></a>
  
</nav>
</div>
<div className="col-md-8 ">
<MDBCol className="mt-0 mb-5">
{this.props.allNotifications.map(notification => {
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
</>
    )
  }
  else {
    return null;
  }
}}
const mapStateToProps = state => {
  console.log(state.notificationsReducer);
  return {
    allNotifications:
      state.notificationsReducer.allNotifications.allNotifications,
      newNotificationsCount:
      state.notificationsReducer.allNotifications.newNotificationsCount,
      readNotificationsCount:
      state.notificationsReducer.allNotifications.readNotificationsCount
  };
};
export default connect(mapStateToProps)(AllNotifications);















/* import React, { Component } from "react";
import {
    MDBContainer,
    MDBBadge,
    MDBCol
  } from "mdbreact";
  import {fetchAllNotifications } from "../../actions/notificationAction";
import NavigationBar from "../commons/NavigationBar";
import NotificationList from './NotificationList'
import toastNotification from "./../../utils/toastNotification";
import Footer from "../commons/Footer";
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
        <Footer />
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
export default connect(mapStateToProps)(Notifications); */