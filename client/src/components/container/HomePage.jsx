import React, { Component } from "react";
import { validateUser, validateEmail } from '../../utils/validator';
import HomeAnimation from '../presentational/HomeAnimation';
import NaBar from '../presentational/NavBar'
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      username: "",
      authName: "",
      email: "",
      password: "",
      confirmPassword: "",
      isLoading: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
   /*  this.handleSignInForm = this.handleSignInForm.bind(this); */
    this.handleSignUpForm = this.handleSignUpForm.bind(this);
  }
  handleInputChange(key, value) {
      this.setState({ [key]: value });
    console.log(value)
  }
  handleSignInForm () {
    console.log("sign in")
  }
  handleSignUpForm() {
    console.log('[evt.target.name]')
    const signUpError = validateUser(this.state.fullname, this.state.username, this.state.password);
    if (signUpError) {
/*       this.setState({
        isLoading: false
      }); */
      alert(signUpError);
    }
    else if (!(validateEmail(this.state.email))) {
      alert('Please enter a valid email address');
    } else if (this.state.password === this.state.confirmPassword) {
      alert ('success!')
/*       this.props.signUp(this.state.fullname, this.state.email, this.state.username, this.state.password, )
        .then(() => {
          notify('info', `Welcome <br/><em>${this.state.username}</em>`);
          setTimeout(() => {
            window.location = '/recipes/?page=1&limit=10';
          }, 300);
        },
        (error) => {
          this.setState({
            isLoading: false
          });
          notify('error', error.response.data.message.replace(';;', '\n'));
        }); */
    } else {
/*       this.setState({
        isLoading: false
      }); */
      alert ( 'Passwords does not match!');
    }
  }
  render() {
    return (<div>
      < NaBar handleSignUp = { this.handleSignUpForm } 
      handleSignIn = { this.handleSignInForm }
      handleInputChange = { this.handleInputChange }
      />
      <HomeAnimation />
    </div>)
  }
}
export default HomePage;
