import React from 'react';
import { FormGroup, Container, Col, Input, Label } from 'reactstrap';
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
					business_name: "",
					business_category: "",
					business_location: "",
					business_email: "",
					contact_number: "",
					business_description: "",
					isAuthenticated: false,
					registeredSuccessfully: false
			}
	}
	componentWillMount() {
		if (localStorage.getItem('token') === null)
				(this.setState({isAuthenticated: false}))
		else
		(this.setState({isAuthenticated: true}))
	}

	handleChange = event => {
		this.setState({[event.target.name]: event.target.value});
	};

	handleSubmit = event => {
		event.preventDefault();

		const business = {
			business_name: this.state.business_name,
			business_category: this.state.business_category,
			business_location: this.state.business_location,
			business_email: this.state.business_email,
			contact_number: this.state.contact_number,
			business_description: this.state.business_description
		};
		axios.defaults.headers.common['access-token'] = localStorage.getItem('token');
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
				if(error.response !== undefined){
					toast.error(error.response.data.Message,{position: toast.POSITION.BOTTOM_CENTER});
				}
				else{
					toast.error("Server ERROR Contact Administrator",{position: toast.POSITION.BOTTOM_CENTER});
				}
			})
	};



	render(){
		if(this.state.isAuthenticated !== true){
			toast.error("Please login to view this page", {position: toast.POSITION.BOTTOM_CENTER});
			return (<Redirect to={{
					pathname: '/login'
			}} />);
		}

		if(this.state.registeredSuccessfully) {
			return (<Redirect to={{
							pathname: '/businesses'
					}} />);
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
								<input name="business_name" onChange={this.handleChange} type="text" style={{borderRadius: "20px"}} className="form-control" required="true"/>
							</Col>
						</FormGroup>
						<FormGroup>
								<Col sm={"6"}>
									<Label id="user">Business Location:</Label>
									<input name="business_location" onChange={this.handleChange} type="text" style={{borderRadius: "20px"}} className="form-control" required="true"/>
								</Col>
						</FormGroup>
						<FormGroup>
								<Col sm={"6"}>
									<Label id="user">Business Email:</Label>
									<input name="business_email" onChange={this.handleChange} type="email" style={{borderRadius: "20px"}} className="form-control" required="true"/>
								</Col>
						</FormGroup>
						<FormGroup>
								<Col sm={"6"}>
									<Label for="contact_number">Contact Number:</Label>
									<input name="contact_number" onChange={this.handleChange} type="text" id="contact_number" style={{borderRadius: "20px"}}
														className="form-control" required="true"/>
								</Col>
						</FormGroup>
						<FormGroup>
								<Col sm={"6"}>
									<Label>Business Description:</Label>
									<Input name="business_description" onChange={this.handleChange} type="textarea" id="business_description" style={{borderRadius: "20px"}}
														className="form-control" required="true"/>
								</Col>
						</FormGroup>
						<FormGroup>
								<Col sm={"6"}>
									<Label for="exampleSelect">Business Category:</Label>
									<Input name="business_category" onChange={this.handleChange} type="select" id="businessCategory">
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
