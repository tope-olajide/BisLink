import React, { Component } from 'react';

// import HomeAnimation from '../src/components/presentational/HomeAnimation'
import NavBar from '../src/components/presentational/NavBar'
// import CataloguePage from '../src/components/presentational/CataloguePage'
//import RegisterBusinessForm from '../src/components/presentational/RegisterBusinessForm'
//import RegisterBusinessPage from '../src/components/presentational/RegisterBusinessPage'
// import ProfilePage from '../src/components/presentational/ProfilePage'
import BusinessSlider from '../src/components/presentational/BusinessSlider'
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
<BusinessSlider img1 = 'featured1.jpg' 
img2 = 'featured2.jpg' 
img3 = 'featured3.jpg' 
img4 = 'featured4.jpg' 
/>
      </div>
    );
  }
}

export default App;
