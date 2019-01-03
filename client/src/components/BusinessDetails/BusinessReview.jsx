import React, {Component} from 'react'
import Image from "react-graceful-image";
import "./style.css";
class BusinessReview extends Component{
    render (){
        return (
<>
                <div className="row mt-4 user-review">
                  <div className="commenter-avatar col-md-3">
                    <Image
                      className="pt-0"
                      src={this.props.commenterImageUrl}
                      alt="Card image cap"
                    />{" "}
                    <br />
                    <p className="">{this.props.commenterUsername}</p>
                  </div>
                  <div className="commenter-review col-md-9">
                    <h5 className="text-left pt-0">
                      {this.props.reviewTitle}
                    </h5>
                    <p className="text-left">
{this.props.reviewContent}
                    </p>
                  </div>
              </div></>
        )
    }
}
export default BusinessReview