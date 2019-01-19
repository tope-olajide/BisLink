import React, { Component } from "react";
import CataloguePage from "./CataloguePage";
import CataloguePageHeader from "./CataloguePageHeader";
import toastNotification from "./../../utils/toastNotification";
import LoadingAnimation from "../commons/LoadingAnimation";
import Footer from "../commons/Footer";
import { fetchBusinesses } from "../../actions/businessActions";
import NavigationBar from "../commons/NavigationBar";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";

class BusinessList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false,
      activePage: 1
    };
  }
  componentDidMount() {
    this.handlePageChange()
  }

  fetchBusiness = () => {
    this.setState({ isLoading: true });
    this.props
      .dispatch(fetchBusinesses())
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
  handlePageChange = (pageNumber) => {
    const limit = 9
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
    this.setState({ isLoading: true });
    this.props
      .dispatch(fetchBusinesses(pageNumber, limit))
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
  }
  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <NavigationBar homePage ="active" />
          <LoadingAnimation />
        </div>
      );
    } else if (this.state.isError) {
      return (
        <div>
          <NavigationBar homePage ="active"/>
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
                    <>
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

                    </>
                  );
                })
              )}

            </div>
            <div className =''> 
            <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={9}
          totalItemsCount={this.props.totalPages}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
          innerClass={'pagination pagination-lg'}
          itemClass = {'page-item'}
          linkClass={'page-link'}
          disabledClass={'disabled'}
          activeLinkClass={'active'}
          activeClass={'active'}
        /></div>
          </div>
<Footer />
        </>
      );
    }
  }
}
const mapStateToProps = state => {
    console.log(state.businessReducer)
  return {
    allBusinesses: state.businessReducer.allBusinesses.businesses,
    totalPages:state.businessReducer.allBusinesses.totalPages
  };
};
/* export default connect(mapStateToProps)(BusinessList) */
export default connect(mapStateToProps)(BusinessList);
