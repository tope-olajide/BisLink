import React, { Component } from "react";
import CataloguePage from "./CataloguePage";
import BusinessCard from "./BusinessCard";
import CataloguePageHeader from "./CataloguePageHeader";
import toastNotification from "./../../utils/toastNotification";
import LoadingAnimation from "../commons/LoadingAnimation";
import { fetchAllBusinesses } from "../../actions/businessActions";
import NavigationBar from "../commons/NavigationBar";
import { connect } from "react-redux";

class BusinessList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false
    };
  }
  componentDidMount() {
    this.fetchBusiness();
  }

  fetchBusiness = () => {
    this.setState({ isLoading: true });
    this.props
      .dispatch(fetchAllBusinesses())
      .then(() => {
        this.setState({
          isLoading: false,
          isError: false
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          isError: true
        });
        if (!error.response){
            toastNotification(["error"],'Network Error!' )
        }else {
             toastNotification(["error"], error.response.data.message);
        }
       
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
        <>
          <CataloguePageHeader />
          <div className="container content-container">
            <div className="row card-container">
              {!this.props.allBusinesses.length ? (
                <div>No Business</div>
              ) : (
                this.props.allBusinesses.map(business => {
                  return (
                    <CataloguePage
                      key={business.id}
                      id={business.id}
                      businessName={business.businessName}
                      category={business.category}
                      reviewCount={business.reviewCount}
                      businessAddress={business.businessAddress1}
                      phoneNumber={business.phoneNumber1}
                      website={business.website}
                      image={business.businessImageUrl}
                    />
                  );
                })
              )}
            </div>{" "}
          </div>
        </>
      );
    }
  }
}
const mapStateToProps = state => {
    console.log(state.businessReducer.allBusinesses)
  return {
    allBusinesses: state.businessReducer.allBusinesses
  };
};
/* export default connect(mapStateToProps)(BusinessList) */
export default connect(mapStateToProps)(BusinessList);
