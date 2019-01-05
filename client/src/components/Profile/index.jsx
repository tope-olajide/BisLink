import React, { Component } from "react";
import ProfilePage from './ProfilePage';
import toastNotification from "./../../utils/toastNotification";
import LoadingAnimation from "../commons/LoadingAnimation";
import { fetchUsersProfile } from "../../actions/authActions";
import NavigationBar from "../commons/NavigationBar";
import { connect } from "react-redux";
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoading: false,
          isError: false
        };
      }
      componentDidMount() {
        this.fetchProfile();
      }
      fetchProfile = () => {
        const  userId  = this.props.match.params.userId;
        this.setState({ isLoading: true });
        this.props
          .dispatch(fetchUsersProfile(userId))
          .then(() => {
            this.setState({
              isLoading: false,
              isError: false
            });
          })
          .catch(error => {
            this.setState({
              isLoading: false,
              isError: true
            });
            if (!error.response){
                toastNotification(["error"],'Network Error!' )
            }else {
                 toastNotification(["error"], error.response.data.message);
            }
           
          });
      }
      
    render () {
        if (this.state.isLoading) {
            return (
              <div>
                <NavigationBar />
                <LoadingAnimation />
              </div>
            );
          } else if (this.state.isError) {
            return (
              <div>
                <NavigationBar />
                <h1>An Error has occured</h1>
              </div>
            );
          }
        return (
            <ProfilePage />
        )
    }
}
const mapStateToProps = state => {
    console.log(state.authReducer)
    return {
      usersProfile: state.authReducer
    }}
export default connect(mapStateToProps)(Profile);