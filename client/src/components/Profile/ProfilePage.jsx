import React, { Component } from "react";
import ProfileTab from "./ProfileTab";
import { Button } from "mdbreact";
import Image from "react-graceful-image";
class ProfilePage extends Component {
  render() {
    return (
      <div>
        <div class="header" />
        <div class="dashboard-containers ">
          <div class="row">
            <div class="profile-section col-lg-4 ">
              <Image
                src={this.props.ImageUrl}
                alt={this.props.ImageUrl}
                className="profile-img"
                height="200"
              />
              <div class=" profile-text">
                <h4>{this.props.username}</h4>
                <p>{this.props.location}</p>
              </div>
              <table class="table table-bordered">
                <tr>
                  <th scope="col">
                    <h4>{this.props.myBusinessCount}</h4>
                    <p>Business</p>
                  </th>
                  <th scope="col">
                    <h4>{this.props.myFollowersCount}</h4>
                    <p>Followers</p>
                  </th>
                  <th scope="col">
                    <h4>{this.props.myFolloweesCount}</h4>
                    <p>Following</p>
                  </th>
                </tr>
              </table>
              <p class="user-info">{this.props.about}</p>
              <div className="text-center">
                <Button onClick={() => (window.location = "/modify-user")}>
                  Edit profile
                </Button>
              </div>
            </div>
            <div class="dashboard-section col-lg-8">
              <br />
              <ProfileTab />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProfilePage;
