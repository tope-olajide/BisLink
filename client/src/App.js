import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
 import {
    library
} from '@fortawesome/fontawesome-svg-core'
import {
    faHome,
    faBriefcase,
    faSearch,
    faFolderPlus,
    faUserPlus,
    faSignInAlt,
    faMapMarker,
    faMobile,
    faLink,
    faHeartbeat,
    faSpinner,faMapMarkerAlt,faMobileAlt,
    faHeart, faThumbsDown, faThumbsUp,faEye,faTag
} from '@fortawesome/free-solid-svg-icons'

import {faHeart as faHeartRegular} from '@fortawesome/free-regular-svg-icons'
import {faEye as faEyeRegular} from '@fortawesome/free-regular-svg-icons'
import AuthPage from './components/AuthPage'
import AddBusiness from './components/AddBusiness'
import BusinessList from './components/Catalogue'
import BusinessDetails from './components/BusinessDetails'
import Profile from './components/Profile'
import ModifyUser from './components/ModifyUser'
import ModifyBusiness from './components/ModifyBusiness'
import LoadingAnimation from './components/commons/LoadingAnimation'
import Notifications from './components/Notifications/NotificationPage'
/*import Loading from './components/presentation/LoadingAnimation' */
import withAuthorization from './utils/withAuthorization'
import ModifyGallery from './components/ModifyGallery'



library.add(
  faHome,
  faBriefcase,
  faSearch,
  faFolderPlus,
  faUserPlus,
  faSignInAlt,
  faMapMarker,
  faMobile,
  faLink,
  faHeartbeat,faSpinner, faMapMarkerAlt, faMobileAlt,
  faHeart,faHeartRegular,
  faThumbsDown, faThumbsUp,faEye,faEyeRegular,faTag

)
class App extends Component {
  render() {
    return (
      <div>
  {/*    <NavigationBar />   */}
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
  <Switch>
    <Route exact path="/" component={AuthPage} />
 <Route exact path="/register-business" component={withAuthorization(AddBusiness)} />
    <Route exact path="/businesses" component={withAuthorization(BusinessList)} />
    <Route exact path="/business-details/:businessId" component={withAuthorization(BusinessDetails)} />
    <Route exact path="/view-profile/:userId" component={withAuthorization(Profile)} />
    <Route exact path="/modify-user/:id" component={withAuthorization(ModifyUser)} />
   <Route exact path="/modify-business/:id" component={withAuthorization(ModifyBusiness)} />
   <Route exact path="/notifications/:userId" component={Notifications} />
   <Route exact path="/modify-gallery" component={ModifyGallery} />
   {/*   */}
  </Switch>
      </div>
    );
  }
}

export default App;
