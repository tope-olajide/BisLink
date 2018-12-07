import React, { Component } from "react";
import "./RegisterBusinessPage.css";
import "./RegisterBusinessForm.css";
import { Input } from "mdbreact";
class RegisterBusinessPage extends Component {
  render() {
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
          <Input label="Business name" icon="building" />
        </div>
        <div className="col-md-6">
            <Input label="Tag Line" icon="building" />
        </div>
    </div>
    <Input label="Address" icon="building" />
    <Input label=" Address 2" className ='mt-5' icon="building" />
    <div className="row">
        <div className="col-md-6">
          <Input label="Phone Number" icon="building" />
        </div>
        <div className="col-md-6">
            <Input label="Phone Number 2" icon="building" />
        </div>
    </div>
    <div className="row">
        <div className="col-md-6">
          <Input label="Email Address" icon="building" />
        </div>
        <div className="col-md-6">
            <Input label="Category" icon="building" />
        </div>
    </div>
    <div className="row">
        <div className="col-md-6">
          <Input label="Website" icon="building" />
        </div>
        <div className="col-md-6">
        <div class="form-group">
            <label for="exampleInputFile" class="bmd-label-floating">Upload your business Pictures</label>
            <input type="file" class="form-control-file" id="exampleInputFile" />
            <small class="text-muted">Maximum of 10</small>
          </div>
        </div>
    </div>

<Input type="textarea" label="Business descriptions" icon="pencil" rows="3"/>
    </form>
           
    </div>
 
 
      </div>
    );
  }
}
export default RegisterBusinessPage;
