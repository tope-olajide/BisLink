import React, { Component } from "react";
import axios from 'axios'
import AddBusiness from './../AddBusiness/RegisterBusinessPage';
import NavBar from './../commons/NavigationBar';
class BusinessList extends Component {
    constructor() {
        super();
        this.state = {
            businessName: "",
            tagline: "",
            businessAddress1: "",
            phoneNumber1: "",
          website: "",
          category: "",
          businessImageUrl: "",
          businessImageId: "",
          businessDescription: "",
          files: [],
          filesToBeSent: [],
          imageUrl: "",
          imageId: ""
        };
        this.onDrop = this.onDrop.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
      }
      onDrop(files) {
        this.setState({
        filesToBeSent: files,
          files: files.map(file => ({
            ...file,
            preview: URL.createObjectURL(file)
          }))
        });
      }
      handleInputChange(key, value) {
        this.setState({ [key]: value });
      }
      handleFormSubmit = files => {
        alert("Loading....");
        // start loading animation
        // Push all the axios request promise into a single array
        const uploaders = this.state.filesToBeSent.map( file => {
          console.log(file);
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
            })
            .catch(function(err) {
              alert("error " + err);
            });
        });
    
        // Once all the files are uploaded
        axios
          .all(uploaders)
          .then(data => {
            alert(
              "Success!!!: Upload picture successfully, now saving to database"
            );
            this.props.onAddUser(this.state);
            alert("saved to database successfully");
            
          })
          .catch(function(err) {
            alert(err);
          });
      };
    render () {
        return (
          <div>
          <NavBar business = 'active'/>
          <AddBusiness
          files={this.state}
          onDrop={this.onDrop}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
 /></div>
        )
    }
}
export default BusinessList