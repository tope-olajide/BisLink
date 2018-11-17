import React, { Component } from "react";
import { validateUser, validateEmail } from '../../utils/validator';
import HomeAnimation from '../presentational/HomeAnimation';
import NavBar from '../presentational/NavBar'
import { connect } from 'react-redux';
import { signUp } from '../../actions/authAction';
export class HomePage extends Component {
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
    const signUpError = validateUser(this.state);
    if (signUpError) {
      alert(signUpError);
    }
    else if (!(validateEmail(this.state.email))) {
      alert('Please enter a valid email address');
    } else if (this.state.password === this.state.confirmPassword) {
      alert ('success!')

       this.props.signUp(this.state)

        .then(() => {
          alert(`Welcome <br/><em>${this.state.username}</em>`);
          setTimeout(() => {
            window.location = '/businesses';
          }, 300);
        },
        (error) => {
          alert('error unable to signup', error.response.data.message);
        });
    } else {
      alert ( 'Passwords does not match!');
    }
  }
  render() {
    return (<div>
      < NavBar handleSignUp = { this.handleSignUpForm } 
      handleSignIn = { this.handleSignInForm }
      handleInputChange = { this.handleInputChange }
      />
      <HomeAnimation />
    </div>)
  }
}
export default connect(null, { signUp })(HomePage);
