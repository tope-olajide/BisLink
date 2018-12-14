import React, { Component } from "react";
import AddBusiness from './../presentation/RegisterBusinessPage';
class BusinessList extends Component {
    constructor() {
        super();
        this.state = {
            businessName: "",
            tagline: "",
            businessAddress1: "",
            businessAddress2: "",
            phoneNumber1: "",
            phoneNumber2: "",
            website: "",
            category: "",
            businessImageUrl: "",
            businessImageId: "",
            businessDescription: "",
          files: [],
          filesToBeSent: [],
          imageUrl: "",
          imageId: ""
        };
        this.onDrop = this.onDrop.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
      }
      onDrop(files) {
        this.setState({
        filesToBeSent: files,
          files: files.map(file => ({
            ...file,
            preview: URL.createObjectURL(file)
          }))
        });
      }
      handleInputChange(key, value) {
        this.setState({ [key]: value });
      }
    render () {
        return (
<AddBusiness
          files={this.state}
          onDrop={this.onDrop}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
 />
        )
    }
}
export default BusinessList