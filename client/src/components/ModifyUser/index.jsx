import React, { Component } from "react";
import axios from "axios";
import { updateProfile } from "../../actions/authActions";
import EditProfileForm from './EditProfileForm';
import NavBar from './../commons/NavigationBar';
import Footer from "../commons/Footer";
import { connect } from "react-redux";
class ModifyUser extends Component {
    constructor() {
        super();
        this.state = {
          fullname: "",
          username: "",
          email: "",
          files: [],
          profile: [],
          imageUrl: "",
          imageId: ""
        };
        this.onDrop = this.onDrop.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
      }
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
     
          const file = this.state.profile[0]
          // Initial FormData
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
                imageUrl: data.secure_url,
                imageId: data.public_id
              });
              console.log(data);
              this.props.dispatch(updateProfile(this.state))
              alert("saved to database successfully");
            })
            .catch(function(err) {
              alert("error " + err);
            });
    
    
        // Once all the files are uploaded

      };
      componentWillUnmount() {
        //  revoke the data uris to avoid memory leaks
        const { files } = this.state;
        for (let i = files.length; i >= 0; i--) {
          const file = files[i];
          URL.revokeObjectURL(file.preview);
        }
      }
    render () {
        return (
      <div>
      <EditProfileForm 
        files={this.state}
        onDrop={this.onDrop}
        handleFormSubmit={this.handleFormSubmit}
        handleInputChange={this.handleInputChange}
      /><Footer />
    </div>
        )
    }
}
export default connect()(ModifyUser);