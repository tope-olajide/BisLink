import React, { Component } from "react";
import { Input, Button } from "mdbreact";
import "./style.css";
class EditProfileForm extends Component {
  render() {
    return (
      <div className="card col-md-5 p-4 my-3 centra">
        <form>
          <h4 className="h4 text-center mt-4 mb-4">Edit my profile</h4>
          <div className="grey-text">
            <Input
              label="Firstname"
              icon=""
              group
              type="text"
              validate
              error="wrong"
              success="right"
            />
            <Input label="Lastname" icon="" group type="text" validate />
            <Input label="Email Address" icon="" group type="email" validate />
            <Input label="Username" icon="" group type="email" validate />
            <Input label="Phone Number" icon="" group type="email" validate />
            <Input label="Location" icon="" group type="email" validate />
            <div class="form-group">
              <label for="exampleInputFile" class="bmd-label-floating">
                Profile Picture
              </label>
              <input
                type="file"
                class="form-control-file"
                id="exampleInputFile"
              />
            </div>
            <Input type="textarea" label="About Me" icon="pencil" rows="3" />
          </div>
          <div className="text-center">
            <Button>Update my profile</Button>
          </div>
        </form>{" "}
      </div>
    );
  }
}
export default EditProfileForm;
