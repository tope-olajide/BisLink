import React, { Component } from "react";
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./react-tabs.css";
import "./ProfileTab.css";
import BusinessCard from '../commons/BusinessCard'
import MyBusinessTabPanel from "./MyBusinessTabPanel"
import MyFavouritesTabPanel from "./MyFavouritesTabPanel"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class ProfileTab extends Component {
  constructor() {
    super();
    this.state = { tabIndex: 0 };
  }
  render() {
    const {myBusinesses,myFavourites} = this.props
    if(!myBusinesses){
      return (
      <>
      <div className='text-center'>
      <h3>You do not have any business yet, when you do they 'll appear here</h3>
      </div>
       </>)
    }
    if(!myFavourites ){
      return (
        <>
        <div className='text-center'>
        <h3>You do not have any Favourite business yet, when you do they'll appear here</h3>
        </div>
         </>
         )
    }
    return (
      <Tabs
        selectedIndex={this.state.tabIndex}
        onSelect={tabIndex => this.setState({ tabIndex })}
      >
        <TabList>
          <Tab>
            <h5 className="text-center "><FontAwesomeIcon className='card-icon mr-2' icon="briefcase" />MY BUSINESSES</h5>
          </Tab>
          <Tab>
            <h5 className="text-center favourite-tab"><FontAwesomeIcon className='card-icon mr-2' icon="heart" />MY FAVOURITES</h5>
          </Tab>
        </TabList>
        <TabPanel>
        <div className="container content-container">
            <div className="row card-container">
 {myBusinesses.map((business) => {
  return<BusinessCard 
                      key={business.id}
                      id={business.id}
                      businessName={business.businessName}
                      category={business.category}
                      reviewCount={business.reviewCount}
                      businessAddress={business.businessAddress1}
                      phoneNumber={business.phoneNumber1}
                      website={business.website}
                      image={business.defaultBusinessImageUrl}
                      isProfilepage={true}
          />         
 
})
 }
 </div> </div> 
      
        </TabPanel>

        <TabPanel>
        <div className="container content-container">
            <div className="row card-container">
        { myFavourites.map((business) => {
  return<BusinessCard 
                      key={business.id}
                      id={business.id}
                      businessName={business.businessName}
                      category={business.category}
                      reviewCount={business.reviewCount}
                      businessAddress={business.businessAddress1}
                      phoneNumber={business.phoneNumber1}
                      website={business.website}
                      image={business.defaultBusinessImageUrl} 
                      isProfilepage={true}/>
        })
                  } 
       </div> </div>
        </TabPanel>

      </Tabs>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.authReducer.usersProfile.myFavourites)
  return {
    myBusinesses: state.authReducer.usersProfile.myBusinesses,
    myFavourites: state.authReducer.usersProfile.myFavourites
  }}
export default connect(mapStateToProps)(ProfileTab);