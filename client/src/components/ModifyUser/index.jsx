import React, { Component } from "react";
import axios from "axios";
import { updateProfile } from "../../actions/authActions";
import EditProfileForm from "./EditProfileForm";
import toastNotification from "./../../utils/toastNotification";
import LoadingAnimation from "../commons/LoadingAnimation";
import { fetchUsersProfile } from "../../actions/userAction";
import NavigationBar from "./../commons/NavigationBar";
import Footer from "../commons/Footer";
import { connect } from "react-redux";
import ErrorPage from "../commons/ErrorPage";
class ModifyUser extends Component {
  constructor() {
    super();
    this.state = {
      fullname: "",
      email: "",
      about: "",
      location: "",
      phoneNumber: "",
      files: [],
      profile: [],
      ImageUrl: "",
      ImageId: ""
    };
    this.onDrop = this.onDrop.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
          isError: false,
          fullname: this.props.usersProfile.fullname,
          email: this.props.usersProfile.email,
          phoneNumber: this.props.usersProfile.phoneNumber,
          location: this.props.usersProfile.location,
          about: this.props.usersProfile.about
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

  onDrop(files) {
    this.setState({
      profile: files,
      files: files.map(file => ({
        ...file,
        preview: URL.createObjectURL(file)
      }))
    });
  }
  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  handleFormSubmit = () => {
    alert("Loading....");
    // start loading animation
    // Push all the axios request promise into a single array

    const file = this.state.profile[0];
    // Initial FormData
    if (file) {
      const formData = new FormData();

      formData.append("upload_preset", "sijxpjkn");
      formData.append("api_key", "139423638121511");
      formData.append("file", file);
      formData.append("timestamp", (Date.now() / 1000) | 0);

      // Make an AJAX upload request using Axios
      return axios
        .post(
          "https://api.cloudinary.com/v1_1/temitope/image/upload",
          formData,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" }
          }
        )
        .then(response => {
          const data = response.data;
          this.setState({
            ImageUrl: data.secure_url,
            ImageId: data.public_id
          });
          this.props
            .dispatch(updateProfile(this.state))
            .then(() => {
              alert("saved to database successfully");
            })
            .catch(function(err) {
              alert("error " + err);
            });
        })
        .catch(function(err) {
          alert("error " + err);
        });
    }
    // Once all the files are uploaded
    else {
      const { fullname, email, about, location, phoneNumber } = this.state;
      this.props
        .dispatch(
          updateProfile({ fullname, email, about, location, phoneNumber })
        )
        .then(() => {
          alert("saved to database successfully without pictures");
        })
        .catch(function(err) {
          alert("else error " + err);
        });
    }
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
        <EditProfileForm
          defaultFullname={this.props.usersProfile.fullname}
          defaultEmail={this.props.usersProfile.email}
          defaultPhoneNumber={this.props.usersProfile.phoneNumber}
          defaultLocation={this.props.usersProfile.location}
          defaultDesription={this.props.usersProfile.about}
          files={this.state}
          onDrop={this.onDrop}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
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
export default connect(mapStateToProps)(ModifyUser);
