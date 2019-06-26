import React, { Component } from "react";
import { MDBCol } from "mdbreact";
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
import NotificationNav from "./NotificationNav";
import formatDate from "../../utils/dateFormat";
import ErrorPage from "../commons/ErrorPage";
class AllNotifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
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
  render() {
    if (this.state.isLoading) {
      return (
        <>
          <LoadingAnimation />
        </>
      );
    } else if (this.state.isError) {
      return (
        <>
          <ErrorPage />
        </>
      );
    }
    return (
      <>
        <NavigationBar />
        <div className="card p-5 text-center mt-4 notification-container">
          <ul class="nav nav-tabs ">
            <li class="nav-item">
              <a class="nav-link active" href="#">
                <h5>Notifications</h5>
              </a>
            </li>
          </ul>
          <div className="row">
            <div className="col-md-4 ">
              <NotificationNav
                newNotificationsCount={this.props.newNotificationsCount}
                readNotificationsCount={this.props.readNotificationsCount}
                allNotificationsCount={this.props.allNotifications.length}
                isAllNotificationActive={true}
              />
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
        <Footer />
      </>
    );
  }
}
const mapStateToProps = state => {
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
