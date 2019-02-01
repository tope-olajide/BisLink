import React, { Component } from "react";
import axios from "axios";
import { addBusiness } from "../../actions/businessActions";
import RegisterBusinessPage from "./../AddBusiness/RegisterBusinessPage";
import NavBar from "./../commons/NavigationBar";
import { connect } from "react-redux";
import Footer from "../commons/Footer";
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
      businessImageArray:[],
      businessImageId: "",
      businessDescription: "",
      files: [],
      filesToBeSent: [],
      imageUrl: "",
      imageUploadError: false,
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
    if (this.state.filesToBeSent.length >= 1) {
 

    alert("Loading....");
    // start loading animation
    // Push all the axios request promise into a single array
    const uploaders = this.state.filesToBeSent.map(file => {
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
          console.log(response)
          const { data } = response;
          console.log(data);
          const { secure_url, public_id } = data;
          this.setState(prevState => ({
            businessImageArray: [...prevState.businessImageArray, {imageUrl: secure_url, imageId: public_id}]
          }))
          console.log(this.state.businessImageArray)
        })
        .catch((err)=> {
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
        const imgArrayUrlToString = JSON.stringify(this.state.businessImageArray)
        this.setState({businessImageUrl:imgArrayUrlToString})
        console.log(this.state.businessImageUrl)
        console.log(typeof this.state.businessImageUrl)
        this.props.dispatch(addBusiness(this.state)).then(()=>{
          alert("saved to database successfully");
        }).catch(function(err) {
          alert(err);
        })
        
      })
      .catch(function(err) {
        alert(err);
      })
    }
    else{
    this.props.dispatch(addBusiness(this.state)).then(()=>{
      alert("saved to database successfully");
    }).catch(function(err) {
      alert(err);
    })
  }
  }
  render() {
    return (
      <div>
        <NavBar  addBusiness = "active"/>
        <RegisterBusinessPage
          files={this.state}
          onDrop={this.onDrop}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
        />
        <Footer />
      </div>
    );
  }
}
export default connect()(BusinessList);