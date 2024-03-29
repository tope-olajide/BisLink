import React, { Component } from "react";
import ProfilePage from "./ProfilePage";
import toastNotification from "./../../utils/toastNotification";
import LoadingAnimation from "../commons/LoadingAnimation";
import { fetchUsersProfile } from "../../actions/userAction";
import NavigationBar from "../commons/NavigationBar";
import Footer from "../commons/Footer";
import { connect } from "react-redux";
import ErrorPage from "../commons/ErrorPage";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false
    };
  }
  componentDidMount() {
    this.fetchProfile();
  }
  fetchProfile = () => {
    this.setState({ isLoading: true });
    this.props
      .dispatch(fetchUsersProfile())
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
        <NavigationBar myProfile="active" />
        <ProfilePage
          about={this.props.usersProfile.about}
          email={this.props.usersProfile.email}
          ImageUrl={this.props.usersProfile.ImageUrl}
          fullname={this.props.usersProfile.fullname}
          username={this.props.usersProfile.username}
          myBusinessCount={this.props.usersProfile.myBusinessCount}
          myFollowersCount={this.props.usersProfile.myFollowersCount}
          myFolloweesCount={this.props.usersProfile.myFolloweesCount}
          myBusinesses={this.props.usersProfile.myBusinesses}
        />
        <Footer />
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    usersProfile: state.authReducer.usersProfile
  };
};
export default connect(mapStateToProps)(Profile);
