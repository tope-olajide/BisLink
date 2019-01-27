import React, { Component } from "react";
import BusinessDetailsPage from "./BusinessDetailsPage";
import BusinessImageGallery from "./BusinessImageGallery";
import Footer from "../commons/Footer";
import {
  fetchBusinessDetails,
  fetchBusinessReviews,
  addBusinessReviews
} from "../../actions/businessActions";
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
      lightboxIsOpen:''
    };
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
        this.props.dispatch(fetchBusinessReviews(id)).then(() => {
          this.setState({
            isLoading: false,
            isError: false
          });
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
            businessName= {this.props.businessDetails.businessName}
            tagline= {this.props.businessDetails.tagline}
            upvotes= {this.props.businessDetails.upvotes}
            downvotes= {this.props.businessDetails.downvotes}
            viewCount= {this.props.businessDetails.viewCount}
          />
          <BusinessDetailsPage
            saveToState={this.saveToState}
            handleReviewSubmit={this.addBusinessReviews}
            businessDescription={this.props.businessDetails.businessDescription}
            reviewLength={this.props.businessReviews.length}
            reviews={this.props.businessReviews}
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
          />
          {console.log(this.props.businessDetails)}
          {console.log(this.props.infoCount)}
          {console.log(this.props.businessReviews)}
          <Footer />
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  console.log(state.businessReducer)
  return {
    businessDetails: state.businessReducer.businessDetails.business,
    infoCount: state.businessReducer.businessDetails.infoCount,
    businessReviews: state.businessReducer.fetchBusinessReviews
  };
};
export default connect(mapStateToProps)(BusinessDetails);
