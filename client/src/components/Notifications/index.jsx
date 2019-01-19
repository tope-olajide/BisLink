

import React, { Component } from 'react';
import {
  MDBContainer,
  MDBBadge,
  MDBCol,
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
      isError: false,
      modal: false
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
  render() {
    if (this.props.newNotifications) {
      const formatDate = unformatedDate => {
        const date = new Date(unformatedDate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };

      return (
        <>
          <NavigationBar notifications="active" />
          <MDBContainer
            style={{
              width: "70%",
              "margin-left": "auto",
              "margin-right": "auto"
            }}
            className=" "
          >
            <MDBCol
              style={{ "margin-left": "auto", "margin-right": "auto" }}
              className="mt-4 col-md-9 p-2 mb-5"
            >
              <ul class="nav nav-tabs nav-fill ml-2">
                <li class="nav-item" onClick={this.toggle}>
                  <a
                    class="nav-link active hover d-flex justify-content-between align-items-center "
                    href="#"
                  >
                    {" "}
                    New
                    <MDBBadge color="primary" pill>
                      {this.props.newNotifications.length}
                    </MDBBadge>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link  d-flex justify-content-between align-items-center "
                    href="notifications/all"
                  >
                    All
                    <MDBBadge color="primary" pill>
                      {this.props.allNotificationsCount}
                    </MDBBadge>
                  </a>
                </li>
              </ul>
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
          </MDBContainer>
          <Footer />
        </>
      );
    } else {
      return null;
    }
  }
}
const mapStateToProps = state => {
  console.log(state.notificationsReducer);
  return {
    newNotifications:
      state.notificationsReducer.unreadNotification.unreadNotifications,
    allNotificationsCount:
      state.notificationsReducer.unreadNotification.allNotificationsCount
  };
};
export default connect(mapStateToProps)(Notifications);