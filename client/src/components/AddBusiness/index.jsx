import React, { Component } from "react";
import axios from "axios";
import { addBusiness } from "../../actions/businessActions";
import BusinessForm from "./../commons/BusinessForm";
import NavBar from "./../commons/NavigationBar";
import Footer from "../commons/Footer";
import toastNotification from "./../../utils/toastNotification";

import { connect } from 'react-redux';
class BusinessList extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isError: false,
      businessName: "",
      tagline: "",
      businessAddress1: "",
      phoneNumber1: "",
      website: "",
      category: "",
      businessImageUrl: "",
      businessImageArray:[],
      businessDescription: "",
      files: [],
      filesToBeSent: [],
      imageUrl: "",
      imageUploadError: false,
      imageId: "",
      isSavingBusiness: false,
      UploadBottonLabel: "Register Business",
      loadingIcon :"",
    };
    this.onDrop = this.onDrop.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  disableLoading = () => {
    this.setState({
      isSavingBusiness: false
    });
  }
  enableLoading  = () => {
    this.setState({
      isSavingBusiness: true
    });
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
    if (this.state.filesToBeSent.length >= 1) 
    {this.enableLoading();
      toastNotification(["info"], `uploading pictures...`);
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
      return axios({
        method:'post',
        url: "https://api.cloudinary.com/v1_1/temitope/image/upload",
        data:formData,
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        transformRequest: [(data, headers) => {
          delete headers.common.authorization
          return data
      }]
      })
        .then(response => {
          console.log(response)
          const { data } = response;
          console.log(data);
          const { secure_url, public_id } = data;
          this.setState(prevState => ({
            businessImageArray: [...prevState.businessImageArray, {imageUrl: secure_url, imageId: public_id}]
          }))
          console.log(this.state.businessImageArray)
          toastNotification(["info"], `${file} uploaded successfully!`);
        })
        .catch((err)=> {
          toastNotification(["error"], ` ${err}`);
          this.setState({imageUploadError:true})
          this.disableLoading()
});
    });
// Once all the files are uploaded
    axios
    .all(uploaders)
    .then(data => {
if(this.state.imageUploadError){
  this.disableLoading()
return toastNotification(["error"], `unable to upload pictures`);
}
else{
      toastNotification(["info"], `All picures uploaded successfully, now saving to database `);
      const imgUrlToString = JSON.stringify(this.state.businessImageArray)
      this.setState({businessImageUrl:imgUrlToString})
      console.log(this.state.businessImageUrl)
      console.log(typeof this.state.businessImageUrl)
        this.props.dispatch(addBusiness(this.state)).then(()=>{
          toastNotification(["success"], `saved to database successfully`);
          this.disableLoading()
        }) }
      })
      .catch(function(err) {
        toastNotification(["error"], `  ${err.response.data.message}`);
        
      })
this.disableLoading()
    }
    else{

const {businessName,tagline,businessAddress1,phoneNumber1,website,category,businessDescription} =this.state;
this.setState({
  isSavingBusiness: true
});
      toastNotification(["info"], `saving...`);
    this.props.dispatch(addBusiness({businessName,tagline,businessAddress1,phoneNumber1,website,category,businessDescription})).then(()=>{
      toastNotification(["success"], `saved to database successfully`);
      this.disableLoading()
    })          .catch((err)=> {
      toastNotification(["error"], ` ${err.response.data.message}`);
      this.setState({isSavingBusiness:false})
});
  }
  }
  render() {
    return (
      <div>
        <NavBar  addBusiness = "active"/>
        <BusinessForm
          files={this.state}
          onDrop={this.onDrop}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
          buttonName={"Save Business"}
          isSavingBusiness={this.state.isSavingBusiness}
          showModifyGalleryButton = {false}
          title = {"Register Your Business"}
        />
        <Footer />
      </div>
    );
  }
}
export default connect()(BusinessList);