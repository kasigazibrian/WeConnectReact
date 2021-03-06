import React from 'react';
import NavigationBar from "../home/NavigationBar";
import axios from "axios";
import {Redirect} from 'react-router-dom'
import {toast} from 'react-toastify'
import {
  Container, Col,
  Button, Modal, ModalHeader, ModalBody,
  ModalFooter, FormGroup,
  FormFeedback, Table, Input
} from 'reactstrap';
import Config from '../../App.config'
import BusinessCards from '../business/BusinessCards';

class UserProfile extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
	  modal: false,
	  password: '',
	  confirmPassword: '',
	  valid: false,
	  invalid: false,
	  isAuthenticated: false,
	  userProfile: {},
	  businesses: []
	};
	this.togglePasswordResetModal = this.togglePasswordResetModal.bind(this);
  }

  componentWillMount = () => {
	// Check for user authentication
	if (localStorage.getItem('token') !== null) {
	  this.setState({isAuthenticated: true})
	  axios.defaults.headers.common['access-token'] = localStorage.getItem('token');
	  // Get user profile infromation
	  axios.get(`${Config.API_BASE_URL}/api/v2/auth/register`, {
		headers: {'Content-Type': 'application/json'}
	  })
		.then(response => {
		  this.setState({
			userProfile: response.data.User,
			businesses: response.data.Businesses,
		  });
		})
		.catch(error => {
		  if (error.response !== undefined) {
			toast.error(error.response.data.Message, {position: toast.POSITION.BOTTOM_CENTER});
		  } else {
			toast.error("Server ERROR Contact Administrator", {position: toast.POSITION.BOTTOM_CENTER});
		  }
		});

	} else {
	  (this.setState({isAuthenticated: false}))
	}
  };

  // Display password reset modal when the reset password button is selected
  togglePasswordResetModal = () => {
	this.setState({
	  modal: !this.state.modal
	});
  };
  // function to help give user feedback to ensure the passwords match
  handleConfirmPasswordChange = event => {
	if (event.target.value !== this.state.password) {
	  this.setState({invalid: true, valid: false})
	} else {
	  this.setState({[event.target.name]: event.target.value, invalid: false, valid: true})
	}
  };
  // Get content input into the password field and save it in the state
  handlePasswordChange = event => {
	this.setState({[event.target.name]: event.target.value})

  };
  // Handle submission of the reset password modal form
  handleSubmit = event => {
	event.preventDefault();
	if (this.state.valid) {
	  const newPassword = {new_password: this.state.password};
	  // make post request to the API with the new password
	  axios.defaults.headers.common['access-token'] = localStorage.getItem('token');
	  axios.post(`${Config.API_BASE_URL}/api/v2/auth/reset-password`, JSON.stringify(newPassword), {
		headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
	  })
		.then(response => {
		  if (response.data.Status === "Success") {
			toast.success(response.data.Message, {position: toast.POSITION.TOP_CENTER});
			this.setState({modal: !this.state.modal})

		  }
		})
		.catch(error => {
		  if (error.response !== undefined) {
			toast.error(error.response.data.Message, {position: toast.POSITION.BOTTOM_CENTER});
		  } else {
			toast.error("Server ERROR Contact Administrator", {position: toast.POSITION.BOTTOM_CENTER});
		  }
		})
	} else {
	  toast.error("The passwords must match", {position: toast.POSITION.BOTTOM_CENTER});
	}
  }

  render() {
	// Check if user is authenticated and redirect them if false
	if (this.state.isAuthenticated === false) {
	  toast.error("Please login to view this page", {position: toast.POSITION.BOTTOM_CENTER});
	  return (<Redirect to={{
		pathname: '/login'
	  }}/>);
	}

	let {businesses} = this.state
	return (
	  <div className="user-profile-background-image">
		<NavigationBar auth={this.state.isAuthenticated}/>
		<Container><br/>
		  <div className="row">
			<div className="col-6 ">
			  <h1 id="userprofile"> User Profile </h1><br/>
			  <Table striped>
				<thead>
				<tr>
				  <th>First Name:</th>
				  <td>{this.state.userProfile.first_name}</td>
				</tr>
				</thead>
				<tbody>
				<tr>
				  <th scope="row">Last Name:</th>
				  <td>{this.state.userProfile.last_name}</td>
				</tr>
				<tr>
				  <th scope="row">Username:</th>
				  <td>{this.state.userProfile.username}</td>
				</tr>
				<tr>
				  <th scope="row">Email:</th>
				  <td>{this.state.userProfile.email}</td>
				</tr>
				<tr>
				  <th scope="row">Gender:</th>
				  <td>{this.state.userProfile.gender}</td>
				</tr>
				</tbody>
			  </Table>
			</div>
			<div className="col-6 bg-info">
			  <div className="my-buttons">
				<Button className={"btn btn-lg btn-secondary btn-block"} onClick={this.togglePasswordResetModal}>Change
				  Password</Button>
				<a href="/register" className={"btn btn-lg btn-secondary btn-block"}>Register Business</a>
			  </div>
			</div>
		  </div>
		  <br/><br/>
		  <h1 id="registered_businesses">Your Registered Businesses</h1>
		  <hr/>
		  <BusinessCards businesses={businesses}/>
		</Container>
		<div>
		  <form onSubmit={this.handleSubmit}>
			<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
			  <ModalHeader toggle={this.togglePasswordResetModal}>Reset Password</ModalHeader>
			  <ModalBody>
				<FormGroup>
				  <Col sm={"12"}>
					<label id="information"> You are trying to reset your password. If you CANCEL, your password will
					  not be changed.</label>
				  </Col>
				</FormGroup>
				<FormGroup>
				  <Col sm={"6"}>
					<label id="new_password_label">New Password:</label>
					<input name="password" onChange={this.handlePasswordChange} type="password" id="new_password"
						   style={{borderRadius: "20px"}} className="form-control" required="true">
					</input>
				  </Col>
				</FormGroup>
				<FormGroup>
				  <Col sm={"6"}>
					<label id="confirm_password">Confirm Password:</label>
					<Input valid={this.state.valid} invalid={this.state.invalid} name="confirmPassword"
						   onChange={this.handleConfirmPasswordChange} type="password" id="confirm_password_input"
						   style={{borderRadius: "20px"}} className="form-control" required="true">
					</Input>
					<FormFeedback valid={this.state.valid}>Please Ensure Passwords are matching</FormFeedback>
				  </Col>
				</FormGroup>
			  </ModalBody>
			  <ModalFooter>
				<Button color="primary" onClick={this.handleSubmit}>Reset Password</Button>
				<Button color="secondary" onClick={this.togglePasswordResetModal}>Cancel</Button>
			  </ModalFooter>
			</Modal>
		  </form>
		</div>
	  </div>
	);
  }
}

export default UserProfile
