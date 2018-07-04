import React from 'react';
import {  FormGroup, Container, Col, Row, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import NavigationBar from "../home/NavigationBar";
import TinyMCE from 'react-tinymce'
import axios from "axios";
import {  Redirect } from 'react-router-dom'
import { toast } from "react-toastify"
import Trash from 'react-icons/lib/fa/trash';
import Edit from 'react-icons/lib/fa/edit';

export default class BusinessRegistration extends React.Component{
  constructor(props) {
		super(props);
		this.state = {
			isAuthenticated: false,
			modal: false,
			review: '',
			disabled: false,
			business: {},
			reviews: [{review: "None"}]
		}
	}
componentWillMount(){
  if (localStorage.getItem('token') === null){
		this.setState({isAuthenticated: false});

		}
	else( this.setState({isAuthenticated: true}) )
	}

componentDidMount(){
	const  id  = this.props.match.params.business_id;
		axios.get(`http://localhost:5000/api/v2/businesses/${id}`)
			.then(response=> {
					console.log(response.data);
					this.setState({business: response.data.Businesses[0]
			})
		})
			.catch(error =>{
				toast.error("Business with id "+id +" not found", {position: toast.POSITION.BOTTOM_CENTER})

			});
		axios.get(`http://localhost:5000/api/v2/businesses/${id}/reviews`)
			.then(response =>{
					console.log(response.data['Business Reviews']);
					this.setState({reviews: response.data["Business Reviews"]})
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

	toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
	

  handleReviewChange = (e) =>{
		console.log(e.target.getContent())
		this.setState({review: e.target.getContent()});
		};

	handleAddReviewPermissions = (businessOwnerID) =>{
		if(parseInt(localStorage.getItem('id'), 10) === businessOwnerID) return "collapse"; else return "show";
	}
	handleCreateEditPermissions = (businessOwnerID) =>{
		if(parseInt(localStorage.getItem('id'), 10) === businessOwnerID) return "show";	else return "collapse";
	}

	handleDelete = (e)=>{
		console.log('am here')
		e.preventDefault();
		const id = this.state.business.business_id;
			axios.defaults.headers.common['access-token'] = localStorage.getItem('token');
			axios.delete(`http://localhost:5000/api/v2/businesses/${id}`, {
					headers: {'Content-Type':'application/json'}
			})
				.then(response=> {
						if (response.data.Status === "Success")
						{
								toast.success(response.data.Message,{position: toast.POSITION.TOP_CENTER});
								this.setState({modal: !this.state.modal})

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

  handleSubmit = e =>{
		e.preventDefault();

		const review = {review: this.state.review};
		console.log(this.state.review);
		axios.post(`http://localhost:5000/api/v2/businesses/${this.state.business.business_id}/reviews`, JSON.stringify(review),
		{
				headers: {'Content-Type':'application/json'}
		})
		.then(res => {
				console.log(res)
				if (res.data.Status === "Success") {
						toast.success(res.data.Message, {position: toast.POSITION.TOP_CENTER});
						this.setState({isAuthenticated: true});

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
	if(this.state.isAuthenticated === false){
		toast.error("Please login to view this page", {position: toast.POSITION.BOTTOM_CENTER});
		return (<Redirect to={{
			pathname: '/login'
		}} />);
	}
	const {reviews, business } =  this.state;
	// console.log(business.business_owner_id)
	let addReviewPermission = this.handleAddReviewPermissions(business.business_owner_id)
	let createEditPermission = this.handleCreateEditPermissions(business.business_owner_id)
	function createMarkup(review){
			return {__html: review.review};
		}
	
	let review_list = reviews.map((review, index)=>(<ul className="review" key={index}><li  dangerouslySetInnerHTML={createMarkup(review)}>
		</li>
		<li className="profile-labels">Added on: {review.date_created}</li><br/>
		</ul>));

	return(
			<div>
					<NavigationBar auth={this.state.isAuthenticated}/>
					<Container >
						<Row>
							<Col xs="6">
										<div className="content-left">
											<FormGroup  >
												<h1 style={{fontSize: "40px"}}>Business Profile </h1>
													<div className={createEditPermission} >
														<Button tag={"a"} className="btn-info" href={`/edit_business/${this.state.business.business_id}`}><Edit/></Button> 
														<Button style={{marginLeft: "5px"}} onClick={this.toggle} className="btn-danger"> <Trash/></Button>
												</div>
											</FormGroup> 
											<FormGroup >
												<b><label id="user" className="my-label-fontcolor">Business Name:</label></b><br/>
												<Label className="profile-labels">{this.state.business.business_name}</Label>
											</FormGroup>
											<FormGroup >
												<b><label id="user" className="my-label-fontcolor"  >Business Location:</label></b><br/>
												<Label className="profile-labels"> {this.state.business.business_location}</Label>
											</FormGroup>
											<FormGroup >
												<b><label id="user" className="my-label-fontcolor">Business Email:</label></b><br/>
												<Label className="profile-labels">{this.state.business.business_email}</Label>
											</FormGroup>
											<FormGroup >
												<b><label className="my-label-fontcolor">Contact Number:</label></b><br/>
												<Label className="profile-labels">{this.state.business.contact_number}</Label>
											</FormGroup>
											<FormGroup >
												<b><label className="my-label-fontcolor"  >Business Description:</label></b><br/>
												<Label className="profile-labels"> {this.state.business.business_description}</Label>
											</FormGroup>
											<FormGroup>
												<b><Label for="business_category">Business Category:</Label></b><br/>
												<Label className="profile-labels">{this.state.business.business_category}</Label>
											</FormGroup>
								 </div>
								</Col>
							<Col xs="6">
								<Container>
									<div className="content-right">
										<form onSubmit={this.handleSubmit}>
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
						<form onSubmit={this.handleDelete}>
							<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
								<ModalHeader toggle={this.toggle}>Delete Business</ModalHeader>
								<ModalBody>
									Are you sure you want to delete {this.state.business.business_name}?
								</ModalBody>
								<ModalFooter>
									<Button color="danger" type="submit">Delete business</Button>
									<Button color="secondary" onClick={this.toggle}>Cancel</Button>
								</ModalFooter>
							</Modal>
							</form>
					</div>
			</div>
	);
}
}

