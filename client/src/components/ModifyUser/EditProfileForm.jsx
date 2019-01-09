import React, { Component } from "react";
import { Input, Button } from "mdbreact";
import Dropzone from "react-dropzone";
const dropZoneStyle= {
  width:200,
  height:200,
  marginLeft: 'auto',
  marginRight:'auto',
  borderWidth: 2,
  borderColor: '#666',
  borderStyle: 'dashed',
  borderRadius: 5
}
const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    margin: 'auto',
    marginTop: 16,
    width: '50%'
  };
  
  const thumb = {
    display: "inline-flex",
    borderRadius: 7,
    width: 195,
    height: 195,
    padding: 0,
    position: "absolute",
    top: 0
  };
  
  const thumbInner = {
    display: "column",
    minWidth: 195,
    overflow: "hidden"
  };
  
  const img = {
    display: "block",
    width: "100%",
    height: "100%"
  };
class EditProfileForm extends Component {
  render() {
    const {files} = this.props.files;

    const thumbs = files.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
          />
        </div>
      </div>));
    return (
      <div className="card col-md-5 p-4 my-3 centra">
        <form>
         {/*  <h3 className="h3 text-center mt-4 mb-4">Edit Profile</h3> */}
          <section>
            <div className="dropzone">
              <Dropzone accept="image/*"style={dropZoneStyle} onDrop={this.props.onDrop}>
              
                {" "}
                {/* this.props.onDrop (files) */}
                <h4>
                  Try dropping your profile picture here, or click to select the picture
                  you want to upload.
                </h4>
                <aside style={thumbsContainer}>{thumbs}</aside>
              </Dropzone>
            </div>
            <div className="text-center">
            </div>
          </section>
          <div className="grey-text">
            <Input
              label="Fullname"
              icon=""
              type="text"
              onChange={event => {
                this.props.handleInputChange("fullname", event.target.value);
              }}
            />
            <Input label="Username" icon="" onChange={event => {
              this.props.handleInputChange("username", event.target.value);
            }} />
            <Input label="Email Address" icon="" onChange={event => {
              this.props.handleInputChange("email", event.target.value);
            }} />
            <Input label="Phone Number" icon="" group type="text" onChange={event => {
              this.props.handleInputChange("phoneNumber", event.target.value);
            }}/>
            <Input label="Location" icon="" group type="text" onChange={event => {
              this.props.handleInputChange("location", event.target.value);
            }} />

            <Input type="textarea" label="About Me"  rows="3"onChange={event => {
              this.props.handleInputChange("description", event.target.value);
            }}/>
          </div>
          <div className="text-center">
            <Button onClick={this.props.handleFormSubmit}>Update my profile</Button>
          </div>
        </form>
      </div>
    );
  }
}
export default EditProfileForm;
