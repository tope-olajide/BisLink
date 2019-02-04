import React, { Component } from "react";
import { Button } from "mdbreact";
import Image from "react-graceful-image";
class PictureGallery extends Component {
    deleteImage=()=>{
        this.props.deleteBusinessPicture( this.props.id)
    }
    setDefaultImage = ()=>{
        this.props.setDefaultBusinessImage(this.props.image)
    }
    render () {
        return (
            <>
            <div className="col-md-3">
              <div className="card  mb-5 mb-5 ml-0 mr-0 shadow-md rounded-0">
                <Image
                  className="card-img-top rounded-0"
                  src={this.props.image} 
                  alt="Card image cap"
                />
                <div className="text-center card-body">
                  <Button onClick={this.deleteImage}>Delete</Button>
                  <Button onClick={this.setDefaultImage}>Set as Default</Button>
              </div>
              </div>
              </div>
          </>
        )
    }
}
export default PictureGallery