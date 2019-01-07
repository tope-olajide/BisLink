import React, { Component } from "react";
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./react-tabs.css";
import "./ProfileTab.css";
import MyBusinessTabPanel from "./MyBusinessTabPanel"
import MyFavouritesTabPanel from "./MyFavouritesTabPanel"
class ProfileTab extends Component {
  constructor() {
    super();
    this.state = { tabIndex: 0 };
  }
  render() {
    const {myBusinesses,myFavourites} = this.props
    if(!myBusinesses || !myFavourites){
      return (null)
    }
    return (
      <Tabs
        selectedIndex={this.state.tabIndex}
        onSelect={tabIndex => this.setState({ tabIndex })}
      >
        <TabList>
          <Tab>
            <p className="text-center ">BUSINESSES</p>
          </Tab>
          <Tab>
            <p className="text-center ">FAVOURITES</p>
          </Tab>
        </TabList>
        <TabPanel>
        <div className="container content-container">
            <div className="row card-container">
 {myBusinesses.map((business) => {
  return<MyBusinessTabPanel 
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
 
})
 }
 </div> </div> 
      
        </TabPanel>

        <TabPanel>
        <div className="container content-container">
            <div className="row card-container">
        { myFavourites.map((business) => {
  return<MyFavouritesTabPanel 
                      key={business.id}
                      id={business.id}
                      businessName={business.businessName}
                      category={business.category}
                      reviewCount={business.reviewCount}
                      businessAddress={business.businessAddress1}
                      phoneNumber={business.phoneNumber1}
                      website={business.website}
                      image={business.businessImageUrl} />
        })
                  } 
       </div> </div>
        </TabPanel>

      </Tabs>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.authReducer.usersProfile.myBusinesses)
  return {
    myBusinesses: state.authReducer.usersProfile.myBusinesses,
    myFavourites: state.authReducer.usersProfile.myFavourites
  }}
export default connect(mapStateToProps)(ProfileTab);