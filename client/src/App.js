import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import NavBar from './components/presentational/NavBar'
import HomePage from '../src/components/container/HomePage'
import CataloguePage from '../src/components/presentational/CataloguePage'
import RegisterBusinessPage from '../src/components/presentational/RegisterBusinessPage'
import ProfilePage from '../src/components/presentational/ProfilePage'
import BusinessDetailsPage from '../src/components/presentational/BusinessDetailsPage'
import HomeAnimation from './components/presentational/HomeAnimation'
class App extends Component {
  render() {
    return (
    <div>
    <Route exact path="/" component={HomePage} />
    <Route  path="/businesses" component={CataloguePage} />
    <Route  path="/business/:id" component={BusinessDetailsPage} />
    <Route  path="/register-business" component={RegisterBusinessPage} />
    <Route  path="/profile/:userId" component={ProfilePage} />
  
      </div>
    );
  }
}

export default App;
