import React from 'react';
import {FormGroup, Container, Col, Input, Label} from 'reactstrap';
// import "./stylesheet1.css";
import NavigationBar from "../home/NavigationBar";
import {toast} from "react-toastify";
import axios from "axios/index";
import {Redirect} from 'react-router-dom'
import Config from '../../App.config'

class BusinessRegistration extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
	  businessName: "",
	  businessCategory: "",
	  businessLocation: "",
	  businessEmail: "",
	  contactNumber: "",
	  businessDescription: "",
	  isAuthenticated: false,
	  registeredSuccessfully: false
	}
  }

  componentWillMount() {
	// Function to check for user authentication
	if (localStorage.getItem('token') === null) {
	  (this.setState({isAuthenticated: false}))
	} else {
	  (this.setState({isAuthenticated: true}))
	}
  }

  // Function to handle user input change and set state
  handleChange = event => {
	this.setState({[event.target.name]: event.target.value});
  };

  // Function to handle form submission for registering a new business
  handleSubmit = event => {
	event.preventDefault();
	const business = {
	  business_name: this.state.businessName,
	  business_category: this.state.businessCategory,
	  business_location: this.state.businessLocation,
	  business_email: this.state.businessEmail,
	  contact_number: this.state.contactNumber,
	  business_description: this.state.businessDescription
	};
	axios.defaults.headers.common['access-token'] = localStorage.getItem('token');
	// Make post request to register a new business
	axios.post(`${Config.API_BASE_URL}/api/v2/businesses`,
	  JSON.stringify(business),
	  {
		headers: {'Content-Type': 'application/json'}
	  })
	  .then(res => {
		toast.success(res.data.Message, {position: toast.POSITION.BOTTOM_CENTER});
		this.setState({registeredSuccessfully: true});

	  })
	  .catch(error => {
		if (error.response !== undefined) {
		  toast.error(error.response.data.Message, {position: toast.POSITION.BOTTOM_CENTER});
		} else {
		  toast.error("Server ERROR Contact Administrator", {position: toast.POSITION.BOTTOM_CENTER});
		}
	  })
  };


  render() {
	// Check for user authentication and restrict page access if not authenticated
	if (this.state.isAuthenticated !== true) {
	  toast.error("Please login to view this page", {position: toast.POSITION.BOTTOM_CENTER});
	  return (<Redirect to={{
		pathname: '/login'
	  }}/>);
	}
	// Check if business registered successfully and redirect to business catalog page
	if (this.state.registeredSuccessfully) {
	  return (<Redirect to={{
		pathname: '/businesses'
	  }}/>);
	}
	return (
	  <div>
		<NavigationBar auth={this.state.isAuthenticated}/>
		<Container>
		  <form onSubmit={this.handleSubmit}>
			<FormGroup>
			  <Col sm={"6"}>
				<h1 id="heading" style={{fontSize: "28px"}}>Business Registration Form</h1>
			  </Col>
			</FormGroup>
			<FormGroup>
			  <Col sm={"6"}>
				<Label id="user">Business Name:</Label>
				<input name="businessName" onChange={this.handleChange} type="text" style={{borderRadius: "20px"}}
					   className="form-control" required="true"/>
			  </Col>
			</FormGroup>
			<FormGroup>
			  <Col sm={"6"}>
				<Label id="user">Business Location:</Label>
				<input name="businessLocation" onChange={this.handleChange} type="text" style={{borderRadius: "20px"}}
					   className="form-control" required="true"/>
			  </Col>
			</FormGroup>
			<FormGroup>
			  <Col sm={"6"}>
				<Label id="user">Business Email:</Label>
				<input name="businessEmail" onChange={this.handleChange} type="email" style={{borderRadius: "20px"}}
					   className="form-control" required="true"/>
			  </Col>
			</FormGroup>
			<FormGroup>
			  <Col sm={"6"}>
				<Label for="contact_number">Contact Number:</Label>
				<input name="contactNumber" onChange={this.handleChange} type="text" id="contact_number"
					   style={{borderRadius: "20px"}}
					   className="form-control" required="true"/>
			  </Col>
			</FormGroup>
			<FormGroup>
			  <Col sm={"6"}>
				<Label>Business Description:</Label>
				<Input name="businessDescription" onChange={this.handleChange} type="textarea" id="business_description"
					   style={{borderRadius: "20px"}}
					   className="form-control" required="true"/>
			  </Col>
			</FormGroup>
			<FormGroup>
			  <Col sm={"6"}>
				<Label for="categorySelect">Business Category:</Label>
				<Input name="businessCategory" onChange={this.handleChange} type="select" id="business_category">
				  <option value="Entertainment">Entertainment</option>
				  <option value="Real Estate">Real Estate</option>
				  <option value="Education">Education</option>
				  <option value="Automobiles">Automobiles</option>
				  <option value="Health and Medicine">Health and Medicine</option>
				  <option value="Computers & Electronics">Computers & Electronics</option>
				  <option value="Food retail and service">Food retail and service.</option>
				  <option value="Beauty and fragrances.">Beauty and fragrances.</option>
				  <option value="Sports and outdoors.">Sports and outdoors</option>
				</Input>
			  </Col>
			</FormGroup>
			<FormGroup>
			  <Col sm={"6"}>
				<button style={{borderRadius: "20px"}}
						className={"btn btn-lg btn-info btn-block"}>Register
				</button>
			  </Col>
			</FormGroup>
		  </form>
		</Container>
	  </div>
	);
  }
}

export default BusinessRegistration
