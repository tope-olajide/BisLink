import React, { Component } from "react";
import axios from 'axios'
import { modifyBusiness } from "../../actions/businessActions";
import ModifyBusinessForm from './ModifyBusinessForm';
import NavigationBar from './../commons/NavigationBar';
import Footer from "../commons/Footer";
import { connect } from "react-redux";
import {
  fetchBusinessDetails,
} from "../../actions/businessActions";
import LoadingAnimation from "../commons/LoadingAnimation";
import toastNotification from "./../../utils/toastNotification";
class ModifyBusiness extends Component {
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
        imageId: ""
      };
      this.onDrop = this.onDrop.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
    }
   componentDidMount() {
      const id = this.props.match.params.businessId;
      this.fetchBusinessDetails(id);
    }
    fetchBusinessDetails = id => {
      console.log(id);
      this.props
        .dispatch(fetchBusinessDetails(id))
        .then(() => {
            this.setState({
              isLoading: false,
              isError: false,
              businessName: this.props.businessDetails.businessName,
              tagline:this.props.businessDetails.tagline,
              businessAddress1: this.props.businessDetails.businessAddress1,
              phoneNumber1: this.props.businessDetails.phoneNumber1,
              website: this.props.businessDetails.website,
              category: this.props.businessDetails.category,
              businessDescription: this.props.businessDetails.businessDescription,
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
    modifyGallery=()=>{
      const id = this.props.match.params.businessId;
      window.location = `/modify-gallery/${id}`;
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
      const {businessId} =this.props.match.params
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
          const imgUrlToString = JSON.stringify(this.state.businessImageArray)
          this.setState({businessImageUrl:imgUrlToString})
          console.log(this.state.businessImageUrl)
          console.log(typeof this.state.businessImageUrl)

          this.props.dispatch(modifyBusiness(this.state, businessId)).then(()=>{
            alert("saved to database successfully");
          })
          
        })
        .catch(function(err) {
          alert(err);
        })
      }
        else{
          const {businessName, businessAddress1, businessDescription, businessImageUrl, tagline,phoneNumber1,category } = this.state
          this.props.dispatch(modifyBusiness({businessName, businessAddress1, businessDescription, businessImageUrl, tagline,phoneNumber1,category }, businessId)).then(()=>{
            alert("saved to database successfully");
          })        
          .catch(function(err) {
            alert(err);
          })
        }
    }
    render () {
      if (this.state.isLoading) {
        return (
          <div>
            <NavigationBar />
            <LoadingAnimation />
          </div>
        );
      } else if (this.state.isError) {
        return (
          <div>
            <NavigationBar />
            <h1>An Error has occured</h1>
          </div>
        );
      }
        return (
          <div>
          <NavigationBar business = 'active'/>
          <ModifyBusinessForm
          files={this.state}
          onDrop={this.onDrop}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
          businessName={this.state.businessName}
          tagline={this.state.tagline}
          businessAddress1={this.state.businessAddress1}
          phoneNumber1={this.state.phoneNumber1}
          category={this.state.category}
          website={this.state.website}
          businessDescription={this.state.businessDescription}
          modifyGallery={this.modifyGallery}
          />
 <Footer />
 </div>
        )
    }
}
const mapStateToProps = state => {
  console.log(state.businessReducer.businessDetails.business)
  return {
    businessDetails: state.businessReducer.businessDetails.business
  };
}
export default connect(mapStateToProps)(ModifyBusiness);