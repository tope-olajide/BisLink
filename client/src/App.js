import React, { Component } from 'react';

// import HomeAnimation from '../src/components/presentation/HomeAnimation'
import NavBar from '../src/components/presentation/NavBar'
// import CataloguePage from '../src/components/presentation/CataloguePage'
//import RegisterBusinessForm from '../src/components/presentation/RegisterBusinessForm'
//import RegisterBusinessPage from '../src/components/presentation/RegisterBusinessPage'
// import ProfilePage from '../src/components/presentation/ProfilePage'
// import BusinessSlider from '../src/components/presentation/BusinessSlider'
import Home from './components/container/Home'
import BusinessList from './components/container/BusinessList'
import BusinessDetails from '../src/components/container/BusinessDetails'
import AddBusiness from './components/container/AddBusiness'
import Profile from './components/container/Profile'
class App extends Component {
  render() {
    return (
      <div>
       <NavBar /> 
{/* <HomeAnimation 
caption1 = 'Bis-Link is a direct optimized way of submitting your business details to nearby city directories.' 
caption2 ='Search for businesses, services, houses, apartments and lands for sale or for rent'
caption3 = 'Be visible! Obtain new customers and generate more traffic.'
caption4 = 'Get reviews and grow your business reputation online.'
caption5 = 'BisLink will make your website link-building strategy better...'
caption6 = '... and imporove your online business awareness to increase your sales'
/> */}
{/* <CataloguePage /> */}
{/* <RegisterBusinessPage />
<RegisterBusinessForm /> */}
{/* <BusinessSlider img1 = 'featured1.jpg' 
img2 = 'featured2.jpg' 
img3 = 'featured3.jpg' 
img4 = 'featured4.jpg' 
/> */}
<Profile />
      </div>
    );
  }
}

export default App;
