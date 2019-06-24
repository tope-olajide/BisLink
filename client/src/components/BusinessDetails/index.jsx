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
import { upvote, downvote } from "../../actions/voteAction";
import { follow, unfollow } from "../../actions/followActions";
import LoadingAnimation from "../commons/LoadingAnimation";
import toastNotification from "./../../utils/toastNotification";
import { connect } from "react-redux";
import NavigationBar from "../commons/NavigationBar";
import ErrorPage from "../commons/ErrorPage";
class BusinessDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      title: "",
      content: "",
      favouriteIcon: "",
      isFavourite: "",
      followButton: "",
      spinnerIcon: "",
      disableReviewButton: false
    };
    this.reviewRef = React.createRef();
  }

  scrollToReview = () => {
    window.scrollTo(0, this.reviewRef.current.offsetTop);
  };
  toggleReviewButton = () => {
    this.setState({ disableReviewButton: !this.state.disableReviewButton });
  };
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
  fetchBusinessDetails = id => {
    this.props
      .dispatch(fetchBusinessDetails(id))
      .then(() => {
        this.props.dispatch(fetchBusinessReviews(id)).then(() => {
          this.setState({
            isLoading: false,
            isError: false
          });
          this.setFavourite(this.props.infoCount.isUserFavourite);
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
  };
  addBusinessReviews = () => {
    this.toggleReviewButton();
    toastNotification(["info"], ` ...submitting your reviewing`);
    const id = this.props.match.params.businessId;
    this.props
      .dispatch(addBusinessReviews(id, this.state))
      .then(() => {
        toastNotification(
          ["success"],
          `Your review has been added successfully.`
        );
        this.toggleReviewButton();
        this.setState({ title: "", content: "" });
      })
      .catch(error => {
        if (!error.response) {
          toastNotification(["error"], "Network Error!");
        } else {
          toastNotification(["error"], error.response.data.message);
          this.toggleReviewButton();
        }
      });
  };
  setFollow = () => {
    const userId = this.props.businessDetails.User.id;
    if (this.props.infoCount.isFollowing) {
      this.props
        .dispatch(unfollow(userId))
        .then(() => {
          toastNotification(
            ["success"],
            `You successfully unfollowed ${
              this.props.businessDetails.User.username
            } `
          );
        })
        .catch(error => {
          if (!error.response) {
            toastNotification(["error"], "Network Error!");
          } else {
            toastNotification(["error"], error.response.data.message);
          }
        });
    } else {
      this.props
        .dispatch(follow(userId))
        .then(() => {
          toastNotification(
            ["success"],
            `You are now following ${this.props.businessDetails.User.username} `
          );
        })
        .catch(error => {
          if (!error.response) {
            toastNotification(["error"], "Network Error!");
          } else {
            toastNotification(["error"], error.response.data.message);
          }
        });
    }
  };
  addToFavourite = () => {
    const id = this.props.match.params.businessId;
    this.setState({
      spinnerIcon: "spinner",
      favouriteIcon: ""
    });
    if (!this.props.infoCount.isUserFavourite) {
      this.props
        .dispatch(addToFavourite(id))
        .then(() => {
          this.setState({
            favouriteIcon: "fas",
            isFavourite: true,
            spinnerIcon: ""
          });
          toastNotification(
            ["success"],
            `"${
              this.props.businessDetails.businessName
            }" has been successfully added to your Favourite`
          );
        })
        .catch(error => {
          if (!error.response) {
            toastNotification(["error"], "Network Error!");
          } else {
            toastNotification(
              ["error"],
              `Unable to add "${
                this.props.businessDetails.businessName
              }" to your Favourite ${error}`
            );
            this.setState({ favouriteIcon: "far", spinnerIcon: "" });
          }
        });
    } else {
      this.props
        .dispatch(removeFromFavourite(id))
        .then(() => {
          this.setState({
            favouriteIcon: "far",
            isFavourite: false,
            spinnerIcon: ""
          });
          toastNotification(
            ["success"],
            `"${
              this.props.businessDetails.businessName
            }" has been successfully removed from your Favourite`
          );
        })
        .catch(error => {
          if (!error.response) {
            toastNotification(["error"], "Network Error!");
          } else {
            toastNotification(
              ["error"],
              `Unable to remove "${
                this.props.businessDetails.businessName
              }" from your Favourite`
            );
            this.setState({ favouriteIcon: "fas", spinnerIcon: "" });
          }
        });
    }
  };

  upvoteBusiness = () => {
    const id = this.props.match.params.businessId;
    this.props
      .dispatch(upvote(id))
      .then(() => {
        toastNotification(
          ["success"],
          `"${this.props.businessDetails.businessName}" Upvoted successfully`
        );
      })
      .catch(error => {
        if (!error.response) {
          toastNotification(["error"], "Network Error!");
        } else {
          toastNotification(["error"], error.response.data.message);
        }
      });
  };
  downvoteBusiness = () => {
    const id = this.props.match.params.businessId;
    this.props
      .dispatch(downvote(id))
      .then(() => {
        toastNotification(
          ["success"],
          `"${this.props.businessDetails.businessName}" Downvoted successfully`
        );
      })
      .catch(error => {
        if (!error.response) {
          toastNotification(["error"], "Network Error!");
        } else {
          toastNotification(["error"], error.response.data.message);
        }
      });
  };
  editBusiness = () => {
    const id = this.props.match.params.businessId;
    window.location = `/modify-business/${id}`;
  };
  parseImageGallery = () => {
    if (this.props.businessDetails.businessImageUrl) {
      const parsedGallery = JSON.parse(
        this.props.businessDetails.businessImageUrl
      );
      return parsedGallery;
    } else {
      return [
        {
          imageUrl:
            "https://res.cloudinary.com/temitope/image/upload/v1549260007/noimage_1.png",
          imageId: 11
        }
      ];
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
        <BusinessImageGallery
          businessName={this.props.businessDetails.businessName}
          tagline={this.props.businessDetails.tagline}
          upvotes={this.props.businessDetails.upvotes}
          downvotes={this.props.businessDetails.downvotes}
          viewCount={this.props.businessDetails.viewCount}
          favouriteIcon={this.state.favouriteIcon}
          spinnerIcon={this.state.spinnerIcon}
          addToFavourite={this.addToFavourite}
          isBusinessOwner={this.props.infoCount.isBusinessOwner}
          upvoteBusiness={this.upvoteBusiness}
          downvoteBusiness={this.downvoteBusiness}
          editBusiness={this.editBusiness}
          businessImageUrl={this.parseImageGallery()}
          scrollToReview={this.scrollToReview}
        />
        <BusinessDetailsPage
          saveToState={this.saveToState}
          handleReviewSubmit={this.addBusinessReviews}
          businessDescription={this.props.businessDetails.businessDescription}
          reviewLength={this.props.businessReview.length}
          reviews={this.props.businessReview}
          disableReviewButton={this.state.disableReviewButton}
          title={this.state.title}
          content={this.state.content}
          defaultImage={this.props.businessDetails.defaultBusinessImageUrl}
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
          setFollow={this.setFollow}
          followButton={this.state.followButton}
          reviewRef={this.reviewRef}
          isFollowing={this.props.infoCount.isFollowing}
        />

        <Footer />
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    businessDetails: state.businessReducer.businessDetails.business,
    infoCount: state.businessReducer.businessDetails.infoCount,
    businessReview: state.reviewReducer.reviews
  };
};
export default connect(mapStateToProps)(BusinessDetails);
