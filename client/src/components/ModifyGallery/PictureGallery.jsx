import React, { Component } from "react";
import { Button } from "mdbreact";
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import Image from "react-graceful-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class PictureGallery extends Component {
    state = {
        modal: false
      }
      toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      }    
    deleteImage=()=>{
        this.props.deleteBusinessPicture(this.props.id)
    }
    setDefaultImage = ()=>{
        this.props.setDefaultBusinessImage(this.props.image)
    }
    render () {
        return ( <>

         
            <div className="col-md-3 mt-5 d-flex">
              <div className="card  mb-5 mb-5 ml-0 mr-0 shadow-md rounded-0">
                <Image
                  className="card-img-top rounded-0"
                  src={this.props.image} 
                  alt="Card image cap"
                />
            
                <MDBContainer>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                  <MDBModalHeader toggle={this.toggle}>Confirm Delete</MDBModalHeader>
                  <MDBModalBody>
                    <h5>Are you sure you want to delete this picture?</h5>
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={this.toggle}>Cancel</MDBBtn>
                    <MDBBtn onClick={this.deleteImage } color="dark">Delete</MDBBtn>
                  </MDBModalFooter>
                </MDBModal>
              </MDBContainer> 
                <div className="text-center card-body">
                  <Button onClick={this.toggle}> <FontAwesomeIcon icon="trash" size="2x" /></Button>
                  <Button onClick={this.setDefaultImage}>Set as Default</Button>
              </div>
              </div>
              </div>
 
          </>
         
        )
    }
}
export default PictureGallery