import React, { Component } from "react";
import { MDBBadge } from "mdbreact";
class NotificationNav extends Component {
  render() {
      const activeClass = "nav-link active d-flex justify-content-between align-items-center my-1";
      const nonActiveClass = "nav-link d-flex justify-content-between align-items-center my-1";
    return (
      <>
          <nav className="nav flex-column nav-pills nav-justified">
            <a
              className={(this.props.isUnReadNotificationActive)?activeClass: nonActiveClass}
              href="/notifications"
            >
              Unread
              <MDBBadge color="primary" pill>
                {this.props.newNotificationsCount}
              </MDBBadge>
            </a>
            <a
              className={(this.props.isReadNotificationActive)?activeClass: nonActiveClass}
              href="/notifications/seen"
            >
              Read
              <MDBBadge color="primary" pill>
                {this.props.readNotificationsCount}
              </MDBBadge>
            </a>
            <a
              className={(this.props.isAllNotificationActive)?activeClass: nonActiveClass}
              href="/notifications/all"
            >
              All 
              <MDBBadge color="primary" pill>
                {this.props.allNotificationsCount}
              </MDBBadge>
            </a>
            <a className="nav-link text-left  my-3" href="#">
              Mark all as read
            </a>
          </nav>
      </>
    );
  }
}
export default NotificationNav;
