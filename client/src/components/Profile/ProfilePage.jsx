import React, { Component } from "react";
import ProfileTab from "./ProfileTab";
import Image from "react-graceful-image";import "./ProfilePage.css";
class ProfilePage extends Component {

 
 
  render() {
    return (
      <div>

        <div class="header" />
        <div class="dashboard-containers ">
          <div class="row">
            <div class="profile-section col-md-4 ">
              <Image 
              src={this.props.ImageUrl}
              className="profile-img" 
              height='200'
              />
              <div class=" profile-text">
                <h5>{this.props.username}</h5>
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
              <p class="user-info">
            {this.props.about}
              </p>
              <button
                class=" mb-5 btn btn-outline-dark  bg-dark btn-rounded btn-block my-4 "
                type="button" onClick={() => this.toggle(6)} 
              >
                Edit profile
              </button>
            </div>
            <div class="dashboard-section col-md-8">
              <br />
              <ProfileTab
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProfilePage;
