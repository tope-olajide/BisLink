import React, { Component } from "react";
import PictureGallery from './PictureGallery'
import NavBar from './../commons/NavigationBar';
import Footer from "../commons/Footer";
import { connect } from "react-redux";
import {
    fetchPictures,setDefaultImage,deletePicture
} from "../../actions/galleryAction";
import toastNotification from "./../../utils/toastNotification";
class ModifyGallery extends Component {
    componentDidMount() {
        this.fetchBusinessPictures()
      }
    fetchBusinessPictures = () => {
        const id = this.props.match.params.businessId;
        this.props
          .dispatch(fetchPictures(id))
          .then(() => {
            this.setState({
                isLoading: false,
                isError: false,
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
      }
      setDefaultBusinessImage = (businessImageUrl) => {
        const id = this.props.match.params.businessId;
        this.props
          .dispatch(setDefaultImage(id, businessImageUrl))
          .then(() => {
            alert('success')
          })
          .catch(error => {
            alert(error)
              if (!error.response) {
                toastNotification(["error"], "Network Error!");
              } else {
                toastNotification(["error"], error.response.data.message);
              }
          });
      }
      deleteBusinessPicture = (businessImageId) => {
        const id = this.props.match.params.businessId;
        this.props
          .dispatch(deletePicture(id,businessImageId))
          .then(() => { alert('success')
          })
          .catch(error => {
          alert(error)
          });
      };

    render () {

        return (

<div>
<NavBar />
<div className="container content-container">
    <div className="row card-container">
{this.props.businessPictures.map((picture)=>{
    if(picture.length !==0&&picture.imageUrl){
    return (
        <>
    <PictureGallery
 key= {picture.imageId}
 id= {picture.imageId}
 image= {picture.imageUrl}
 deleteBusinessPicture={this.deleteBusinessPicture}
 setDefaultBusinessImage={this.setDefaultBusinessImage}
    />  
    </>) } 
})

}

    </div>
    </div>
    <Footer />
</div>
        )
    }
}
const mapStateToProps = state => {
    console.log(state.galleryReducer)
    return {
        businessPictures: state.galleryReducer.businessPictures
    };
  }
export default connect(mapStateToProps)(ModifyGallery);