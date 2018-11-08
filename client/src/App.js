import React, { Component } from 'react';

// import HomeAnimation from '../src/components/presentational/HomeAnimation'
import NavBar from '../src/components/presentational/NavBar'
import CataloguePage from '../src/components/presentational/CataloguePage'
//import RegisterBusinessForm from '../src/components/presentational/RegisterBusinessForm'
//import RegisterBusinessPage from '../src/components/presentational/RegisterBusinessPage'
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
<CataloguePage />
{/* <RegisterBusinessPage />
<RegisterBusinessForm /> */}
      </div>
    );
  }
}

export default App;
