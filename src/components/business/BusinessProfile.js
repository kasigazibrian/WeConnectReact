import React from 'react';
import {  FormGroup, Container, Col, Row, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import NavigationBar from "../home/NavigationBar";
import TinyMCE from 'react-tinymce'
import axios from "axios";
import {  Redirect } from 'react-router-dom'
import { toast } from "react-toastify"
import Trash from 'react-icons/lib/fa/trash';
import Edit from 'react-icons/lib/fa/edit';
import Config from '../../App.config'

class BusinessProfile extends React.Component{
  constructor(props) {
		super(props);
		this.state = {
			isAuthenticated: false,
			modal: false,
			review: '',
			disabled: false,
			deletedSuccessfully: false,
			businessId: this.props.match.params.business_id,
			business: {},
			reviews: [{review: "None"}]
		}
	}
	componentWillMount = ()=>{
		// Function to check for user authentication
		if (localStorage.getItem('token') === null){
			this.setState({isAuthenticated: false});
			}
		else( this.setState({isAuthenticated: true}) )
		}

	getReviews = (businessId)=>{
		// Function to check for user authentication
		axios.get(`${Config.API_BASE_URL}/api/v2/businesses/${businessId}/reviews`)
		.then(response =>{
				this.setState({reviews: response.data["Business Reviews"]})
		})
		.catch(error => {
			if(error.response !== undefined){
				toast.info("No business reviews found",{position: toast.POSITION.BOTTOM_CENTER});
			}
			else{
				toast.error("Server ERROR Contact Administrator",{position: toast.POSITION.BOTTOM_CENTER});
			}
		})
	}
 componentDidMount = ()=>{
	 // Function to return a specific business
	axios.get(`${Config.API_BASE_URL}/api/v2/businesses/${this.state.businessId}`)
		.then(response=> {
				this.setState({business: response.data.Businesses[0]
			})
		})
		.catch(error =>{
			toast.error("Business with id "+ this.state.businessId +" not found", {position: toast.POSITION.BOTTOM_CENTER})

		});
		this.getReviews(this.state.businessId)
	}

	// Function to toggle modal view option
	toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
	
	//Function to obtain review changes
  handleReviewChange = (e) =>{
		this.setState({review: e.target.getContent()});
		};
	
	// Function to handle adding a review permission
	handleAddReviewPermissions = (businessOwnerID) =>{
		if(parseInt(localStorage.getItem('id'), 10) === businessOwnerID) return "collapse"; else return "show";
	}

	// Function to handle create and edit permissions
	handleCreateEditPermissions = (businessOwnerID) =>{
		if(parseInt(localStorage.getItem('id'), 10) === businessOwnerID) return "show";	else return "collapse";
	}
	
	// Function to handle deleting of a business
	handleDelete = (e)=>{
		e.preventDefault();
		const id = this.state.businessId;
			axios.defaults.headers.common['access-token'] = localStorage.getItem('token');
			axios.delete(`${Config.API_BASE_URL}/api/v2/businesses/${id}`, {
					headers: {'Content-Type':'application/json'}
			})
				.then(response=> {
						if (response.data.Status === "Success")
						{
							toast.success(response.data.Message,{position: toast.POSITION.TOP_CENTER});
							this.setState({modal: !this.state.modal, deletedSuccessfully: true})
						}
						else{
							toast.error(response.data.Message, {position: toast.POSITION.BOTTOM_CENTER});
					  }
				})
				.catch( error =>
				{
					if(error.response !== undefined){
						toast.error(error.response.data.Message,{position: toast.POSITION.BOTTOM_CENTER});
					}
					else{
						toast.error("Server ERROR Contact Administrator",{position: toast.POSITION.BOTTOM_CENTER});
					}
		} )
	}
	// Function to convert the reviews into html 
	createMarkup = (review) =>{
		return {__html: review.review};
	}

	// Funtion to handle adding a review to a business
  handleSubmit = e =>{
		e.preventDefault();
		const review = {review: this.state.review};
		axios.post(`${Config.API_BASE_URL}/api/v2/businesses/${this.state.businessId}/reviews`, JSON.stringify(review),
		{
				headers: {'Content-Type':'application/json'}
		})
		.then(res => {
				if (res.data.Status === "Success") {
					toast.success(res.data.Message, {position: toast.POSITION.TOP_CENTER});
					this.getReviews(this.state.businessId)
					
				}
				else{
						toast.success(res.data.Message, {position: toast.POSITION.TOP_CENTER});
				}
    })
		.catch(error => {
			if(error.response !== undefined){
				toast.error(error.response.data.Message,{position: toast.POSITION.BOTTOM_CENTER});
			}
			else{
				toast.error("Server ERROR Contact Administrator",{position: toast.POSITION.BOTTOM_CENTER});
			}
			
		})
}

render(){
	const {reviews, business } =  this.state;
	if(this.state.isAuthenticated === false){
		toast.error("Please login to view this page", {position: toast.POSITION.BOTTOM_CENTER});
		return (<Redirect to={{
			pathname: '/login'
		}} />);
	}
	if(this.state.deletedSuccessfully === true){
		return (<Redirect push=
			{true} to={{
			pathname: '/businesses'
		}} />);
	}
  // Get adding a review permisiion
	let addReviewPermission = this.handleAddReviewPermissions(business.business_owner_id)
	// Get create and delete permission
	let createEditPermission = this.handleCreateEditPermissions(business.business_owner_id)
	// Function to destructure the reviews
	let review_list = reviews.map((review, index)=>(<ul className="review" key={index}><li  dangerouslySetInnerHTML={this.createMarkup(review)}>
		</li>
		<li className="profile-labels">Added on: {review.date_created}</li><br/>
		</ul>));

	return(
			<div>
					<NavigationBar auth={this.state.isAuthenticated}/>
					<div className="background-profile-image">
					<Container style={{color: "white"}}>
						<Row>
							<Col xs="6" className="bg-secondary">
										<div className="content-left">
											<FormGroup >
												<h1 id="profile-heading" style={{fontSize: "40px"}}>Business Profile </h1>
													<div className={createEditPermission} >
														<Button tag={"a"} className="btn-info" href={`/edit_business/${this.state.business.business_id}`}><Edit/></Button> 
														<Button style={{marginLeft: "5px"}} onClick={this.toggle} className="btn-danger"> <Trash/></Button>
												</div>
											</FormGroup> 
											<FormGroup >
												<b><label id="businessName" >Business Name:</label></b><br/>
												<Label className="profile-labels">{this.state.business.business_name}</Label>
											</FormGroup>
											<FormGroup >
												<b><label id="businessLocation"  >Business Location:</label></b><br/>
												<Label className="profile-labels"> {this.state.business.business_location}</Label>
											</FormGroup>
											<FormGroup >
												<b><label id="businessEmail" >Business Email:</label></b><br/>
												<Label className="profile-labels">{this.state.business.business_email}</Label>
											</FormGroup>
											<FormGroup >
												<b><label >Contact Number:</label></b><br/>
												<Label className="profile-labels">{this.state.business.contact_number}</Label>
											</FormGroup>
											<FormGroup >
												<b><label   >Business Description:</label></b><br/>
												<Label className="profile-labels"> {this.state.business.business_description}</Label>
											</FormGroup>
											<FormGroup>
												<b><Label >Business Category:</Label></b><br/>
												<Label className="profile-labels">{this.state.business.business_category}</Label>
											</FormGroup>
								 </div>
								</Col>
							<Col xs="6" className="bg-secondary">
								<Container>
									<div className="content-right">
										<form id="add-review" onSubmit={this.handleSubmit}>
										  <div className={addReviewPermission}>
												<FormGroup >
													<h3 >Add Business Review:</h3>
													<TinyMCE
														config={{	
																menubar: false,
																statusbar: false,
																plugins: 'autolink link image lists print preview',
																toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
														}}
														content="<p>Add a business review here</p>"
														id = "content"
														onChange={this.handleReviewChange}
														/>
												</FormGroup>
												<FormGroup>
													<Button  style={{borderRadius : "20px"}} className={"btn btn-lg btn-info btn-block"} >Add Review </Button>
												</FormGroup>
											</div>
												<FormGroup>
													<h4> Business Reviews:</h4>
													{review_list}
												</FormGroup>
										</form>
									</div>
									</Container>
								</Col>

						</Row>
					</Container>
					<div>
							<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
								<ModalHeader toggle={this.toggle}>Delete Business</ModalHeader>
								<ModalBody>
									Are you sure you want to delete {this.state.business.business_name}?
								</ModalBody>
								<ModalFooter>
									<Button id="delete_business" onClick={this.handleDelete} color="danger">Delete business</Button>
									<Button color="secondary" onClick={this.toggle}>Cancel</Button>
								</ModalFooter>
							</Modal>
					</div>
					</div>
			</div>
	);
}
}
export default BusinessProfile

