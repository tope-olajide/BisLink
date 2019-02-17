import React, { Component } from "react";
import { Input, Button } from "mdbreact";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  flexWrap: "wrap",
  marginTop: 16
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const img = {
  display: "block",
  width: "auto",
  height: "100%"
};
class RegisterBusinessPage extends Component {
  render() {
    const { files } = this.props.files;

    const thumbs = files.map(file => (
      <div style={thumb}>
        <div style={thumbInner}>
          <img src={file.preview} style={img} />
        </div>
      </div>
    ));
    return (
      <div>
        <div className="register-business-header">
          <div className="hero-text">
            <h1>
             Modify Business
            </h1>
          </div>
        </div>
        <div className="biz-form-container col-md-7 mt-5">
                <div className="  text-right ">
             <Button onClick={this.props.modifyGallery} >
                  Modify Picture Gallery
                </Button>
          </div>
        </div>

        <div className="biz-form-container  col-md-7 card p-5">
          <form>
            <div className="row">
              <div className="col-md-6">
                <Input
                  label="Business name"
                  icon="briefcase"
                  default={this.props.businessName}
                  onChange={event => {
                    this.props.handleInputChange(
                      "businessName",
                      event.target.value
                    );
                  }}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Tag Line"
                  icon="asterisk"
                  default={this.props.tagline}
                  onChange={event => {
                    this.props.handleInputChange(
                      "tagline",
                      event.target.value
                    );
                  }}
                />
              </div>
            </div>
 
            <Input
              label="Business Address"
              className="mt-5"
              icon="building"
default={this.props.businessAddress1}
              onChange={event => {
                this.props.handleInputChange("businessAddress1", event.target.value);
              }}
            />
            <div className="row">
              <div className="col-md-6">
                <Input
                  label="Phone Number"
                  icon="phone"
                  default={this.props.phoneNumber1}
                  onChange={event => {
                    this.props.handleInputChange(
                      "phoneNumber1",
                      event.target.value
                    );
                  }}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Business Category"
                  icon="tag"
                  default={this.props.category}
                  onChange={event => {
                    this.props.handleInputChange(
                      "category",
                      event.target.value
                    );
                  }}
                />
              </div>
            </div>

            <Input
              label="Website"
              icon="internet-explorer"
              default={this.props.website}
              onChange={event => {
                this.props.handleInputChange("website", event.target.value);
              }}
            />
            <Input
              type="textarea"
              className="mt-5"
              label="Business descriptions"
              icon="pencil"
              default={this.props.businessDescription}
              rows="3"
              onChange={event => {
                this.props.handleInputChange("businessDescription", event.target.value);
              }}
            />
            <section>
              <div className="dropzone">
                <Dropzone accept="image/*" style={dropZoneStyle} onDrop={this.props.onDrop}>
                  <h4>
                    Try dropping your picture here, or click to select the
                    picture you want to upload.
                  </h4>
                </Dropzone>
                <aside style={thumbsContainer}>{thumbs}</aside>
              </div>
              <div className="text-center">
                <Button onClick={this.props.handleFormSubmit}  disabled={this.props.uploadButtonState}>
                {this.props.UploadBottonLabel} <FontAwesomeIcon icon={this.props.loadingIcon} spin size='2x' />
                </Button>
              </div>
            </section>
          </form>
        </div>
      </div>
    );
  }
}
export default RegisterBusinessPage;
