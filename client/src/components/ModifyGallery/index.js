import React, { Component } from "react";
import ModifyPictureGallery from './ModifyPictureGallery'
import NavBar from './../commons/NavigationBar';
import Footer from "../commons/Footer";
class ModifyGallery extends Component {
    render () {
        return (
<div>
<NavBar />
<div className="container content-container">
    <div className="row card-container">
    <ModifyPictureGallery
 
    />
    </div>
    </div>
    <Footer />
</div>
        )
    }
}
export default ModifyGallery