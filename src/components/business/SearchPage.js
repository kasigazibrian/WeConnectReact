import React from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	Button, Input, Container } from 'reactstrap';
import NavigationBar from "../home/NavigationBar";
import axios from 'axios'
import {toast} from "react-toastify";
import { Redirect } from 'react-router-dom'
import logo from '../../images/logo.png';
import Config from '../../App.config'

export default class SearchPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			isAuthenticated: this.props.getAuth(),
			category: "",
			location: "",
			businessName: "",
			perPage: 6,
			isActive: 1,
			count: 0,
			businesses: []
		};
	}

	componentWillMount = ()=>{
		// Check for user authentication
		if (localStorage.getItem('token') === null){
			this.setState({isAuthenticated: false})
		}
		else( this.setState({isAuthenticated: true}) )
	}
	// Function to handle search input values
	handleSearchInputChange = event =>{
		if(event.target.value === "Location" || event.target.value === "Category"){this.setState({[event.target.name]: ""})}
		else{ this.setState({[event.target.name]: event.target.value})}
	};
	// Function to handle submit of the search input values
	handleSubmit = event =>{
		const { businessName, category, location, isActive, perPage} = this.state;
		event.preventDefault();
		// Search get request to the API
		axios.get(`${Config.API_BASE_URL}/api/v2/businesses?q=${businessName}&category=${category}&location=${location}&limit=${perPage}&page=${isActive}`,
			{
				headers: {'Content-Type':'application/json'}
			})
			.then(response=> {
				toast.success("We have found "+response.data.count + " results", {position: toast.POSITION.TOP_CENTER});
				// Set businesses state with recieved data
				this.setState({
					businesses: response.data.Businesses, 
					count: response.data.count,
					perPage: response.data.limit,
					isActive: response.data.page
				});
			})
			.catch(error =>{
				if(error.response !== undefined){
					toast.error(error.response.data.Message,{position: toast.POSITION.BOTTOM_CENTER});
				}
				else{
					toast.error("Server ERROR Contact Administrator",{position: toast.POSITION.BOTTOM_CENTER});
				}

			});

	};
	// Function to toggle navigation bar when window is not maximised
	toggle = ()=> {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	render() {
	 	const { count } = this.state;
		// Check if search results have been obtained successfully
		if (count > 0){
			return (
				<div>
					<Redirect to={{
						pathname: '/search_results',
						state: {searchObject: this.state}
					}} />
				</div>);
		}


		return (
			<div>
				<NavigationBar auth={this.state.isAuthenticated}/>
					<div className="search-bar">
						<Container>
							<div className="my-logo"></div>
								<form onSubmit={this.handleSubmit}>
									<Navbar color="dark" light expand="md">
										<NavbarBrand href="/search" className="text-light"><img src={logo} alt="We Connect!" height="45px" width="42px" />Search for Businesses</NavbarBrand>
										<NavbarToggler onClick={this.toggle} />
										<Collapse isOpen={this.state.isOpen} navbar>
											<Nav className="ml-auto" navbar>
												<NavItem className='nav-item-name-properties'>
													<input onChange={this.handleSearchInputChange} name="businessName" placeholder="Enter Business Name" className="my-input" type="text" id="components"/>
												</NavItem>
												<NavItem className='nav-item-name-properties'>
													<label  className='my-labels'>Filter By:</label>
												</NavItem>
												<NavItem className='nav-item-name-properties'>
													<Input style={{marginTop: "12px"}} onChange={this.handleSearchInputChange} type="select" name="category" id="exampleSelect">
														<option>Category</option>
														<option value="Entertainment">Entertainment</option>
														<option value="Real Estate">Real Estate</option>
														<option value="Education">Education</option>
														<option value="Automobiles">Automobiles</option>
														<option value="Health and Medicine">Health and Medicine</option>
														<option value="Computers & Electronics">Computers & Electronics</option>
													</Input>
												</NavItem >
												<NavItem className='nav-item-name-properties'>
													<Input style={{marginTop: "12px"}} onChange={this.handleSearchInputChange} type="select" name="location" id="exampleSelect" >
														<option style={{color: 'blue'}}>Location</option>
														<option value="wakiso">Wakiso</option>
														<option value="kabale">Kabale</option>
														<option value="mbarara">Mbarara</option>
														<option value="kampala">Kampala</option>
														<option value="rukungiri">Rukungiri</option>
													</Input>
												</NavItem>
												<NavItem style={{marginRight: "20px", marginTop: "12px"}}>
													<Button color="primary">Search</Button>
												</NavItem>
												<NavItem style={{marginRight: "20px"}}>
												</NavItem>
											</Nav>
										</Collapse>
									</Navbar>
								</form>
						</Container>
					</div>
			</div>
		);
	}
}
