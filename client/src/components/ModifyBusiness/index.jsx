import React, { Component } from "react";
import axios from 'axios'
import { modifyBusiness } from "../../actions/businessActions";
import BusinessForm from '../commons/BusinessForm';
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
        imageId: "",
        isSavingBusiness: false,
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
        this.setState({isSavingBusiness:true})
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
            this.setState({isSavingBusiness:false})
            this.setState({imageUploadError:true})
 });
      });
      // Once all the files are uploaded
      axios
        .all(uploaders)
        .then(data => {
 if(this.state.imageUploadError){
  this.setState({isSavingBusiness:false})
   return toastNotification(["error"], `unable to upload pictures`);
 }
 else{
  toastNotification(["info"], `All picures uploaded successfully, now saving to database `);
          const imgUrlToString = JSON.stringify(this.state.businessImageArray)
          this.setState({businessImageUrl:imgUrlToString})
          console.log(this.state.businessImageUrl)
          console.log(typeof this.state.businessImageUrl)

          this.props.dispatch(modifyBusiness(this.state, businessId)).then(()=>{
            toastNotification(["success"], `saved to database successfully`);
            this.setState({isSavingBusiness:false})
          }) }
          
        })
        .catch(function(err) {
          toastNotification(["error"], `  ${err.response.data.message}`);
          this.setState({isSavingBusiness:false})
        })
      }
        else{
          this.setState({isSavingBusiness:true})
          toastNotification(["info"], `saving...`);
          this.props.dispatch(modifyBusiness((this.state), businessId)).then(()=>{
            toastNotification(["success"], `saved to database successfully`);
            this.setState({isSavingBusiness:false})
          })        
          .catch((err)=> {
            toastNotification(["error"], ` ${err.response.data.message}`);
            this.setState({isSavingBusiness:false})
 });
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
          <NavigationBar />
          <BusinessForm
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
          buttonName={"Update Business"}
          isSavingBusiness={this.state.isSavingBusiness}
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