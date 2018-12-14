import React, { Component } from "react";
import "./RegisterBusinessPage.css";
import "./RegisterBusinessForm.css";
import { Input, Button } from "mdbreact";
import Dropzone from "react-dropzone";
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
              Register your business now and let your customers connect with
              you.
            </h1>
          </div>
        </div>
        <div className="biz-form-container card mt-5 p-5">
          <h6 className="dark-text biz-form-title  text-center ">
            Register your business
          </h6>

          <form>
            <div className="row">
              <div className="col-md-6">
                <Input
                  label="Business name"
                  icon="building"
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
                  icon="building"
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
              label="Address"
              icon="building"
              onChange={event => {
                this.props.handleInputChange("businessAddress1", event.target.value);
              }}
            />
            <Input
              label=" Address 2"
              className="mt-5"
              icon="building"
              onChange={event => {
                this.props.handleInputChange("businessAddress2", event.target.value);
              }}
            />
            <div className="row">
              <div className="col-md-6">
                <Input
                  label="Phone Number"
                  icon="building"
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
                  label="Phone Number 2"
                  icon="building"
                  onChange={event => {
                    this.props.handleInputChange(
                      "phoneNumber2",
                      event.target.value
                    );
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Input
                  label="Email Address"
                  icon="building"
                  onChange={event => {
                    this.props.handleInputChange(
                      "fullname",
                      event.target.value
                    );
                  }}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Category"
                  icon="building"
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
              icon="building"
              onChange={event => {
                this.props.handleInputChange("website", event.target.value);
              }}
            />
            <Input
              type="textarea"
              label="Business descriptions"
              icon="pencil"
              rows="3"
              onChange={event => {
                this.props.handleInputChange("fullname", event.target.value);
              }}
            />
            <section>
              <div className="dropzone">
                <Dropzone accept="image/*" onDrop={this.props.onDrop}>
                  <h4>
                    Try dropping your picture here, or click to select the
                    picture you want to upload.
                  </h4>
                </Dropzone>
                <aside style={thumbsContainer}>{thumbs}</aside>
              </div>
              <div className="text-center">
                <Button onClick={this.props.handleFormSubmit} color="primary">
                  Login
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
