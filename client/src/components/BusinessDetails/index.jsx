import React, { Component } from "react";
import BusinessDetailsPage from "./BusinessDetailsPage";
import BusinessImageGallery from "./BusinessImageGallery";
import Footer from "../commons/Footer";
import {
  fetchBusinessDetails,
  fetchBusinessReviews,
  addBusinessReviews
} from "../../actions/businessActions";
import {
  removeFromFavourite,
  addToFavourite
} from "../../actions/favouriteActions";
import {
  upvote,
  downvote
} from "../../actions/voteAction";
import {
  follow,
  unfollow
} from "../../actions/followActions";
import LoadingAnimation from "../commons/LoadingAnimation";
import toastNotification from "./../../utils/toastNotification";
import { connect } from "react-redux";
import NavigationBar from "../commons/NavigationBar";
class BusinessDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      title: "",
      content: "",
      favouriteIcon: "",
      isFavourite: true,
      followButton:''
    };
  }
  componentDidMount() {
    const id = this.props.match.params.businessId;
    this.fetchBusinessDetails(id);
  }
  setFavourite = favourite => {
    if (favourite) {
      this.setState({ favouriteIcon: "fas", isFavourite: true });
    } else {
      this.setState({ favouriteIcon: "far", isFavourite: false });
    }
  };
setFollowButton=()=>{
  if(this.props.infoCount.isFollowing){
    this.setState({ followButton: "unfollow" });
  }
  else{
    this.setState({ followButton: "follow" });
  }
}
  fetchBusinessDetails = id => {
    console.log(id);
    this.props
      .dispatch(fetchBusinessDetails(id))
      .then(() => {
        this.props.dispatch(fetchBusinessReviews(id)).then(() => {
          this.setState({
            isLoading: false,
            isError: false
          });
          this.setFavourite(this.props.infoCount.isUserFavourite);
this.setFollowButton()
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
  saveToState = (key, value) => {
    this.setState({ [key]: value });
    console.log(value);
  };
  addBusinessReviews = () => {
    alert("loading....");
    const id = this.props.match.params.businessId;
    console.log(id);
    this.props
      .dispatch(addBusinessReviews(id, this.state))
      .then(() => {
        alert("success");
      })
      .catch(error => {
        alert(error);
      });
  };
  followUser=()=>{
    const userId = this.props.businessDetails.User.id
    if(this.props.infoCount.isFollowing){
      this.props
        .dispatch(unfollow(userId))
        .then(() => {
         /*  this.setState({ favouriteIcon: "fas", isFavourite: true }); */
          alert("success");
          this.setFollowButton()
        })
        .catch(error => {
          alert(error);
          this.setFollowButton()
        });
    } else {
      this.props
        .dispatch(follow(userId))
        .then(() => {
  /*         this.setState({ favouriteIcon: "far", isFavourite: false }); */
          alert("success");
          this.setFollowButton()
        })
        .catch(error => {
          alert(error);
          this.setFollowButton()
        });
    }
  }
  addToFavourite = () => {
    const id = this.props.match.params.businessId;
    if (!this.state.isFavourite) {
      this.props
        .dispatch(addToFavourite(id))
        .then(() => {
          this.setState({ favouriteIcon: "fas", isFavourite: true });
          alert("success");
        })
        .catch(error => {
          alert(error);
        });
    } else {
      this.props
        .dispatch(removeFromFavourite(id))
        .then(() => {
          this.setState({ favouriteIcon: "far", isFavourite: false });
          alert("success");
        })
        .catch(error => {
          alert(error);
        });
    }
    /*    if (this.state.favouriteIcon=='fas'){
    this.setState({ favouriteIcon: 'far' }) }
    else{
      this.setState({ favouriteIcon: 'fas' })
    } */
  };
  removeFromFavourites = () => {
    const id = this.props.match.params.businessId;
    this.props
      .dispatch(removeFromFavourite(id))
      .then(() => {
        this.setState({ favouriteIcon: "fas", isFavourite: true });
        alert("success");
      })
      .catch(error => {
        alert(error);
      });
  };
  upvoteBusiness = () => {
    const id = this.props.match.params.businessId;
    this.props
      .dispatch(upvote(id))
      .then(() => {
        
        alert("success");
      })
      .catch(error => {
        alert(error);
      });
  };
  downvoteBusiness = () => {
    const id = this.props.match.params.businessId;
    this.props
      .dispatch(downvote(id))
      .then(() => {
        
        alert("success");
      })
      .catch(error => {
        alert(error);
      });
  };
  editBusiness=()=>{
    const id = this.props.match.params.businessId;
    window.location = `/modify-business/${id}`;
  }
  parseImageGallery=()=>{
    const parsedGallery= JSON.parse(this.props.businessDetails.businessImageUrl)
    return parsedGallery 
  }
  render() {
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
    } else {
      return (
        <div>
          <NavigationBar />
          <BusinessImageGallery
            businessName={this.props.businessDetails.businessName}
            tagline={this.props.businessDetails.tagline}
            upvotes={this.props.businessDetails.upvotes}
            downvotes={this.props.businessDetails.downvotes}
            viewCount={this.props.businessDetails.viewCount}
            favouriteIcon={this.state.favouriteIcon}
            addToFavourite={this.addToFavourite}
            isBusinessOwner={this.props.infoCount.isBusinessOwner}
            removeFromFavourites={this.removeFromFavourites}
            upvoteBusiness={this.upvoteBusiness}
            downvoteBusiness={this.downvoteBusiness}
            editBusiness={this.editBusiness}
            businessImageUrl={this.parseImageGallery()}
            
          />
          <BusinessDetailsPage
            saveToState={this.saveToState}
            handleReviewSubmit={this.addBusinessReviews}
            businessDescription={this.props.businessDetails.businessDescription}
            reviewLength={this.props.businessReview.length}
            reviews={this.props.businessReview}
            title={this.state.title}
            content={this.state.content}
            businessAddress1={this.props.businessDetails.businessAddress1}
            phoneNumber1={this.props.businessDetails.phoneNumber1}
            website={this.props.businessDetails.website}
            category={this.props.businessDetails.category}
            ImageUrl={this.props.businessDetails.User.ImageUrl}
            username={this.props.businessDetails.User.username}
            location={this.props.businessDetails.User.location}
            about={this.props.businessDetails.User.about}
            businessCount={this.props.infoCount.businessCount}
            followersCount={this.props.infoCount.followersCount}
            followingCount={this.props.infoCount.followingCount}
            isBusinessOwner={this.props.infoCount.isBusinessOwner}
            followUser={this.followUser}
            followButton={this.state.followButton}
          />
          {console.log(this.props.businessDetails)}
          {console.log(this.props.infoCount)}
          {console.log(this.props.businessReview)}
          
          <Footer />
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  console.log(state.reviewReducer.reviews);
  return {
    businessDetails: state.businessReducer.businessDetails.business,
    infoCount: state.businessReducer.businessDetails.infoCount,
    businessReview: state.reviewReducer.reviews
  };
};
export default connect(mapStateToProps)(BusinessDetails);
