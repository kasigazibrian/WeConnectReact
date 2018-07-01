import React from 'react';
import {  Card, CardHeader, CardText, CardBody, Container, Col, Row,
	CardTitle, CardSubtitle, Button } from 'reactstrap';
import axios from 'axios';
import NavigationBar from "../home/NavigationBar";
import 'rc-pagination/assets/index.css';
import Pagination from 'rc-pagination';
import { toast } from 'react-toastify'
import Config from '../../App.config'


class BusinessCatalog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			businesses: [],
			isAuthenticated: false,
			activePage: 1,
			count: 1,
			perPage: 6
		}
	}
	componentWillMount = () =>{
		if (localStorage.getItem('token') !== null){
			this.setState({isAuthenticated: true})
		}
		else( this.setState({isAuthenticated: false}) )
	}
	onChange = (page, pageSize) => {
		axios.get(`${Config.API_BASE_URL}/api/v2/businesses?limit=${pageSize}&page=${page}`)
			.then(response=> {
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

	componentDidMount = ()=>{
		axios.get(`${Config.API_BASE_URL}/api/v2/businesses?limit=${this.state.perPage}&page=${this.state.activePage}`)
			.then(response=> {
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

}
showTotal = (total)=> `Total ${total} Businesses`;


	render(){
		let businesses = this.state.businesses.map((business, index)=>{
			return (
				<Col sm={"4"} key={index}>
					<Card body style={{marginTop: '20px'}} >

						<CardBody>
							<CardHeader tag="h1" >{business.business_name}</CardHeader>
							<CardTitle></CardTitle>
							<CardSubtitle>{business.business_category}</CardSubtitle>
							<CardText>{business.business_description}</CardText>
							<a href={`/businesses/${business.business_id}`}><Button className="btn-info" >View Details</Button></a>
						</CardBody>
					</Card>
				</Col>
			);
		})

	   return(
		   <div >
		   <NavigationBar auth={this.state.isAuthenticated}/>

		   <Container fluid>

			   <Pagination current={this.state.isActive}
						   total={this.state.count}
						   onChange={this.onChange}
						   pageSize ={this.state.perPage}
							 hideOnSinglePage
							 showLessItems
						   style={{ marginTop: "15px"}}
						   showTitle={false}
						   showTotal={this.showTotal}/>

			   <Row>
				   {businesses}

			   </Row>

		   </Container>
		   </div>
	   )

};
}
export default BusinessCatalog
