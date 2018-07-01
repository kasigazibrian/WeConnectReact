import React from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import NavigationBar from "../home/NavigationBar";
import {   FormGroup, Container, Col, Input } from 'reactstrap';
import {Redirect, withRouter} from 'react-router-dom'

class EditBusiness extends React.Component{
	constructor(props){
			super(props);

			this.state={
					businessId: this.props.match.params.business_id,
					isAuthenticated: false,
					businessName: "",
					businessCategory: "",
					businessLocation: "",
					businessEmail: "",
					contactNumber: "",
					businessDescription: "",
					updatedSuccessfully: false
			}
	}

	componentWillMount = () => {
			if (localStorage.getItem('token') === null) {
					this.setState({isAuthenticated: false});
					this.props.history.push('/login');
					toast.error("Please login", {position: toast.POSITION.BOTTOM_CENTER});

			}
			else {
					this.setState({isAuthenticated: true});
					axios.get(`http://localhost:5000/api/v2/businesses/${this.state.businessId}`)
							.then(response=> {
									this.setState({
											businessName: response.data.Businesses[0].business_name,
											businessCategory: response.data.Businesses[0].business_category,
											businessLocation: response.data.Businesses[0].business_location,
											businessEmail: response.data.Businesses[0].business_email,
											contactNumber: response.data.Businesses[0].contact_number,
											businessDescription: response.data.Businesses[0].business_description,
											businessId: response.data.Businesses[0].business_id
									})
							})
							.catch(error =>{
								if(error.response !== undefined){
									// console.log(error.response)
									toast.error(error.response.data.Message,{position: toast.POSITION.BOTTOM_CENTER});
								}
								else{
									toast.error("Server ERROR Contact Administrator",{position: toast.POSITION.BOTTOM_CENTER});
								}

							});
			}
	}
	handleChange = event => {
			this.setState({[event.target.name]: event.target.value});
			
	};
	
	handleUpdateSubmit = event => {
			event.preventDefault();
			// console.log(this.state.businessId)
			const business = {
					business_name: this.state.businessName,
					business_category: this.state.businessCategory,
					business_location: this.state.businessLocation,
					business_email: this.state.businessEmail,
					contact_number: this.state.contactNumber,
					business_description: this.state.businessDescription
			};
			axios.defaults.headers.common['access-token'] = localStorage.getItem('token');
			axios.put(`http://localhost:5000/api/v2/businesses/${this.state.businessId}`,
					JSON.stringify(business),
					{headers: {'Content-Type': 'application/json'}
					})
					.then(res => {
						this.setState({updatedSuccessfully: true})
						toast.success(res.data.Message,{position: toast.POSITION.BOTTOM_CENTER});
					})
					.catch(error => {
						if(error.response !== undefined){
							// console.log(error.response)
							toast.error(error.response.data.Message,{position: toast.POSITION.BOTTOM_CENTER});
						}
						else{
							toast.error("Server ERROR Contact Administrator",{position: toast.POSITION.BOTTOM_CENTER});
						}
					})
	};
render(){

	if (this.state.updatedSuccessfully){
			return(
			
				<Redirect to={`/businesses/${this.state.businessId}`}/>	
			
			)
	}

	return(
	<div>
			<NavigationBar auth={this.state.isAuthenticated}/>
			<Container>
					<form onSubmit={this.handleUpdateSubmit}>
							<FormGroup>
									<Col sm={"6"}>
											<h1 id="heading" style={{fontSize: "28px"}}>Edit Business Details </h1>
									</Col>
							</FormGroup>
							<FormGroup>
									<Col sm={"6"}>
											<label >Business Name:</label>
											<input name="businessName" value={this.state.businessName} onChange={this.handleChange} type="text" style={{borderRadius: "20px"}} className="form-control" />
									</Col>
							</FormGroup>
							<FormGroup>
									<Col sm={"6"}>
											<label >Business Location:</label>
											<Input name="businessLocation" value={this.state.businessLocation} onChange={this.handleChange} type="text" style={{borderRadius: "20px"}} className="form-control" />
									</Col>
							</FormGroup>
							<FormGroup>
									<Col sm={"6"}>
											<label >Business Email:</label>
											<Input name="businessEmail" value={this.state.businessEmail} onChange={this.handleChange} type="text" style={{borderRadius: "20px"}} className="form-control"/>
									</Col>
							</FormGroup>
							<FormGroup>
									<Col sm={"6"}>
											<label>Contact Number:</label>
											<Input value={this.state.contactNumber} onChange={this.handleChange} type="text" id="contact_number" style={{borderRadius: "20px"}}
															className="form-control" name="contactNumber" />
									</Col>
							</FormGroup>
							<FormGroup>
									<Col sm={"6"}>
											<label>Business Description:</label>
											<Input name="businessDescription" onChange={this.handleChange} value={this.state.businessDescription} type="textarea" id="description" style={{borderRadius: "20px"}}
															className="form-control" />
									</Col>
							</FormGroup>
							<FormGroup>
									<Col sm={"6"}>
											<label >Business Category:</label>
											<Input value={this.state.businessCategory} onChange={this.handleChange} type="select" name="businessCategory" id="exampleSelect">
													<option value="Entertainment">Entertainment</option>
													<option value="Real Estate">Real Estate</option>
													<option value="Education">Education</option>
													<option value="Automobiles">Automobiles</option>
													<option value="Health and Medicine">Health and Medicine</option>
													<option value="Food retail and service">Food retail and service.</option>
													<option value="Beauty and fragrances.">Beauty and fragrances.</option>
													<option value="Sports and outdoors.">Sports and outdoors</option>
											</Input>
									</Col>
							</FormGroup>
							<FormGroup>
									<Col sm={"6"}>
											<button style={{borderRadius: "20px"}}
															className={"btn btn-lg btn-info btn-block"}>Save Changes
											</button>
									</Col>
							</FormGroup>
					</form>
			</Container>
	</div>
	);
}
}
export default withRouter(EditBusiness)