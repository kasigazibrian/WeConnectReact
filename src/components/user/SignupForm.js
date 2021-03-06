import React from 'react';
import {FormGroup, Label, Container, Col, Input} from 'reactstrap';
import axios from "axios";
import {toast} from 'react-toastify'
import NavigationBar from "../home/NavigationBar";
import zxcvbn from "zxcvbn"
import {Redirect} from 'react-router-dom'
import Config from '../../App.config'

export default class SignupForm extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
	  username: '',
	  password: '',
	  email: '',
	  firstName: '',
	  lastName: '',
	  gender: '',
	  confirmPassword: '',
	  isAuthenticated: false,
	  suggestions: [],
	  score: "",
	  message: "",
	  addedSuccessfully: false
	}

  }

  componentWillMount() {
	// Check for user authentiucation
	if (localStorage.getItem('token') === null) {
	  this.setState({isAuthenticated: false})
	} else {
	  (this.setState({isAuthenticated: true}))
	}
  }

  // Function to handle password change
  handlePasswordChange = e => {
	let evaluation = zxcvbn(e.target.value);
	this.setState({
	  password: e.target.value, score: evaluation.score,
	  suggestions: evaluation.feedback.suggestions, message: ""
	});

  };
  // Function to handle user input change and set state
  handleChange = e => {
	this.setState({[e.target.name]: e.target.value})

  };

  // Function to hanlde the signup form submission and post the user data to the API
  handleSubmit = event => {
	event.preventDefault();

	if (this.state.password !== this.state.confirmPassword) {
	  // toast.error("Passwords must match",{position: toast.POSITION.BOTTOM_CENTER});
	} else {
	  const user = {
		username: this.state.username,
		password: this.state.password,
		last_name: this.state.lastName,
		first_name: this.state.firstName,
		gender: this.state.gender,
		email: this.state.email
	  };
	  // Make post request to register new user
	  axios.post(`${Config.API_BASE_URL}/api/v2/auth/register`,
		JSON.stringify(user),
		{
		  headers: {'Content-Type': 'application/json'}
		})
		.then(res => {
		  this.setState({addedSuccessfully: true})
		  toast.success(res.data.Message + '! You can now login!', {position: toast.POSITION.BOTTOM_CENTER});
		})
		.catch(error => {
		  if (error.response !== undefined) {
			toast.error(error.response.data.Message, {position: toast.POSITION.BOTTOM_CENTER});
		  } else {
			toast.error("Server ERROR Contact Administrator", {position: toast.POSITION.BOTTOM_CENTER});
		  }
		})
	}
  };

  render() {
	// Check if user is already logged in and redirect them to home page
	if (this.state.isAuthenticated) {
	  toast.warn('You are already logged in!! Please log out to view this page', {position: toast.POSITION.TOP_RIGHT})
	  return (
		<Redirect to={{
		  pathname: '/',
		}}/>
	  )
	}
	// Check if user has been registered successfully and redirect them
	if (this.state.addedSuccessfully) {
	  return (
		<div>
		  <Redirect to={{
			pathname: '/login',
			state: {isAuthenticated: true}
		  }}/>
		</div>
	  );
	}
	const {suggestions, score} = this.state;
	let cssClass = "";
	let message = "";
	// Show password strength
	if (score === 0) {
	  cssClass = "weak";
	  message = "Weak";

	} else if (score === 1) {
	  cssClass = "fair";
	  message = "Fair";
	} else if (score === 2) {
	  cssClass = "good";
	  message = "Good";
	} else if (score === 3) {
	  cssClass = "strong";
	  message = "Strong";
	} else if (score === 4) {
	  cssClass = "very-strong";
	  message = "Very Strong";
	} else {
	  message = "weak";
	  cssClass = "Weak"
	}

	return (
	  <div className="signup-background-image">
		<NavigationBar auth={this.state.isAuthenticated}/>
		<div className={"signup-wrapping"}>
		  <Container>
			<form onSubmit={this.handleSubmit}>
			  <FormGroup>
				<Col sm={"9"}>
				  <h1 className="my-h1">Please Sign up</h1>
				</Col>
			  </FormGroup>
			  <FormGroup>
				<Col sm={"9"}>
				  <label id="first-name" className="label-fontcolor">First Name:</label>
				  <input onChange={this.handleChange} name="firstName" type="text" id="first_name"
						 style={{borderRadius: "20px"}} className="form-control" required="true">
				  </input>
				</Col>
			  </FormGroup>
			  <FormGroup>
				<Col sm={"9"}>
				  <label id="last-name" name="last_name" className="label-fontcolor">Last Name:</label>
				  <input name="lastName" onChange={this.handleChange} type="text" id="last_name"
						 style={{borderRadius: "20px"}}
						 className="form-control" required="true">
				  </input>
				</Col>
			  </FormGroup>
			  <FormGroup>
				<Col sm={"9"}>
				  <label id="username_label" className="label-fontcolor">Username:</label>
				  <input name="username" onChange={this.handleChange} type="text" id="username"
						 style={{borderRadius: "20px"}} className="form-control" required="true">
				  </input>
				</Col>
			  </FormGroup>
			  <FormGroup>
				<Col sm={"9"}>
				  <label id="password" className="label-fontcolor">Password:</label>
				  <Input name="password" onChange={this.handlePasswordChange} type="password" id="password-input"
						 style={{borderRadius: "20px"}} className="form-control" required="true">
				  </Input> <span id="passwordStrength" className={cssClass}>{message}</span>
				  <ul>
					{suggestions.map((suggestion, index) =>
					  <li className="label-fontcolor" key={index}>{suggestion}</li>)}
				  </ul>
				</Col>
			  </FormGroup>
			  <FormGroup>
				<Col sm={"9"}>
				  <label className="label-fontcolor">Confirm Password:</label>
				  <input name="confirmPassword" type="password" onChange={this.handleChange} id="confirm-password"
						 style={{borderRadius: "20px"}} className="form-control" required="true">

				  </input>
				</Col>
			  </FormGroup>
			  <FormGroup>
				<Col sm={"9"}>
				  <label id="email" className="label-fontcolor">Email:</label>
				  <input name="email" id="email-input" onChange={this.handleChange} type="text"
						 style={{borderRadius: "20px"}}
						 className="form-control" required="true">
				  </input>
				</Col>
			  </FormGroup>
			  <FormGroup check>
				<label id="gender" className="label-fontcolor">Gender:</label>
				<Col sm={"9"}>
				  <Label check className={"label-fontcolor"}>
					<Input onChange={this.handleChange} type="radio" value={"male"} name="gender"/>
					Male
				  </Label>
				</Col>
				<Col sm={"9"}>
				  <Label check className={"label-fontcolor"}>
					<Input type="radio" onChange={this.handleChange} value={"female"} name="gender"/>
					Female
				  </Label>
				</Col>
				<Col sm={"9"}>
				  <Label check className={"label-fontcolor"}>
					<Input type="radio" onChange={this.handleChange} value={"other"} name="gender"/>
					Other
				  </Label>
				</Col>
			  </FormGroup><br/>
			  <FormGroup>
				<Col sm={"9"}>
				  <button style={{borderRadius: "20px"}} className={"btn btn-lg btn-info btn-block"}>
					Sign up
				  </button>
				</Col>
			  </FormGroup>
			  <FormGroup>
				<Col sm={"10"}>
				  <Label className={"label-fontcolor"}>Already have an account? Click
					<Label tag={"a"} href={"/login"}> here</Label> to Login
				  </Label>
				</Col>
			  </FormGroup>
			</form>
		  </Container>
		</div>
	  </div>
	);
  }
}
