import React from 'react';
// import "./stylesheet.css";
import { FormGroup, Label, Container, Col} from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify'
import {  Redirect } from 'react-router-dom'
import NavigationBar from "../home/NavigationBar";

export default class LoginForm extends React.Component {
	constructor(props){
		super(props);
		this.state= {
				username: '',
				password: '',
				isAuthenticated: false
		}
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });

	};
	postRequest = (user) =>{
		axios.post('http://localhost:5000/api/v2/login',
		JSON.stringify(user),
		{
				headers: {'Content-Type':'application/json'}
		})
		.then(response => {
				if (response.data.Status === "Success") {
						toast.success(response.data.Message, {position: toast.POSITION.TOP_CENTER});
						localStorage.setItem('token', response.data.Token)
						localStorage.setItem('username', response.data.User.username)
						localStorage.setItem('id', response.data.User.user_id)  
						this.setState({isAuthenticated: true, userProfile: response.data.User});

				}


		})
		.catch(error=>{
			if(error.response !== undefined){
				toast.error(error.response.data.Message,{position: toast.POSITION.BOTTOM_CENTER});
			}
			else{
				toast.error("Server ERROR Contact Administrator",{position: toast.POSITION.BOTTOM_CENTER});
			}
		})
}

handleSubmit = event => {
	event.preventDefault();
	const user = {
			username: this.state.username,
			password: this.state.password

	};
	this.postRequest(user)
};

render() {
	if (this.state.isAuthenticated){
		return (
				<div>
						
						<Redirect to={{
								pathname: '/authuser/userprofile',
								state: {isAuthenticated: true }
						}} />
		
				</div>
		);
	}

	return (
			<div className="login-background-image">
				<NavigationBar auth={this.state.isAuthenticated}/>
					<div className="login-wrapping">
						<Container >
						<form onSubmit={this.handleSubmit}>
								<FormGroup  >
										<Col sm={"9"}>
												<h1 className="my-h1">Please Sign in </h1>
										</Col>
									</FormGroup>
									<FormGroup >
										<Col sm={"9"}>
												<label id="username" name="username" className="label-fontcolor"  >Username:</label>
												<input name="username" type="text" style={{borderRadius: "20px"}} onChange={this.handleChange}
															className="form-control" required="true">

												</input>
										</Col>
									</FormGroup>
									<FormGroup >
											<Col sm={"9"}>
													<label className="label-fontcolor">Password:</label>
													<input name="password" type="password" onChange={this.handleChange}
																id="password" style={{borderRadius : "20px"}} className="form-control"
																required="true">

													</input>
											</Col>
									</FormGroup>
									<FormGroup>
										<Col sm={"9"}>
												<button style={{borderRadius : "20px"}} className={"btn btn-lg btn-info btn-block"}>
														Log in
												</button>
										</Col>
									</FormGroup>
									<FormGroup>
										<Col sm={"10"}>
												<Label className={"label-fontcolor"}>Don't have an account? Click
														<Label tag={"a"} href={"/signup"}> here</Label> to register</Label>
										</Col>
									</FormGroup>
							</form>
						</Container>
					</div>
			</div>
		);
	}
}