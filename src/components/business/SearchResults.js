import React from 'react';
import { Container } from 'reactstrap';
import NavigationBar from "../home/NavigationBar";
import BusinessCards from './BusinessCards';
import { toast } from 'react-toastify'
import Config from '../../App.config'
import axios from 'axios';
import Select from 'rc-select';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/en_US';

export default class SearchResults extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
				businesses: [],
				isAuthenticated: false,
				count: 1,
				isActive: 1,
				perPage: 6,
				name: '',
				category: '',
				location: ''
				
		}
}
componentWillMount(){
	// Check for user authentication
		if(this.props.location.state !== undefined){
				this.setState({businesses: this.props.location.state.searchObject.businesses,
				count: this.props.location.state.searchObject.count,
				name: this.props.location.state.searchObject.businessName,
				category: this.props.location.state.searchObject.category,
				location: this.props.location.state.searchObject.location,
			})
		}
		// console.log(localStorage.getItem('token'))
		if (localStorage.getItem('token') !== null){
				this.setState({isAuthenticated: true})
		}
		else( this.setState({isAuthenticated: false}) )
}
// Function to get the paginated search results
getBusinesses = (page, pageSize, name, category, location)=>{
	axios.get(`${Config.API_BASE_URL}/api/v2/businesses?q=${name}&category=${category}&location=${location}&limit=${pageSize}&page=${page}`)
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
	// Get the new business list on pagination change
	onChange = (page, pageSize) => {
		const{ name , location, category} = this.state
		this.getBusinesses(page, pageSize, name, category, location)
	
	};
	// Get the new businesses on per page change
	onShowSizeChange= (page, pageSize) => {
		const{ name , location, category} = this.state
	this.getBusinesses(page, pageSize, name, category, location)
	}

render(){
	return(
		<div>
			<NavigationBar auth={this.state.isAuthenticated}/>
			<Container fluid={true}>
			<Pagination current={this.state.isActive}
				 			selectComponentClass={Select}
						  total={this.state.count}
						  onChange={this.onChange}
						  defaultPageSize ={this.state.perPage}
							showSizeChanger
							showLessItems
							pageSizeOptions={['6','12','18','24']}
						  style={{ marginTop: "15px"}}
							showTitle={false}
							locale={localeInfo}
							onShowSizeChange={this.onShowSizeChange}
						  showTotal={this.showTotal}/>
				<BusinessCards businesses={this.state.businesses}/>
			</Container>
		</div>
	)

};
}

