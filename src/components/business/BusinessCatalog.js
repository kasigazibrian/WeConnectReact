import React from 'react';
import {Container} from 'reactstrap';
import axios from 'axios';
import NavigationBar from "../home/NavigationBar";
import 'rc-pagination/assets/index.css';
import Select from 'rc-select';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/en_US';
import {toast} from 'react-toastify'
import Config from '../../App.config'
import BusinessCards from './BusinessCards';


class BusinessCatalog extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
	  businesses: [],
	  isAuthenticated: false,
	  isActive: 1,
	  count: 1,
	  perPage: 6
	}
  }

  componentWillMount() {
	// Funtion to check for user authentication
	if (localStorage.getItem('token') !== null) {
	  this.setState({isAuthenticated: true})
	} else {
	  (this.setState({isAuthenticated: false}))
	}
  }

  // Funtion to get businesses
  getBusinesses = (page, pageSize) => {
	axios.get(`${Config.API_BASE_URL}/api/v2/businesses?limit=${pageSize}&page=${page}`)
	  .then(response => {
		this.setState({
		  businesses: response.data.Businesses,
		  count: response.data.count,
		  perPage: response.data.limit,
		  isActive: response.data.page
		});
	  })
	  .catch(error => {
		if (error.response !== undefined) {
		  toast.error(error.response.data.Message, {position: toast.POSITION.BOTTOM_CENTER});
		} else {
		  toast.error("Server ERROR Contact Administrator", {position: toast.POSITION.BOTTOM_CENTER});
		}
	  });
  };
  // Get the new business list on pagination change
  onChange = (page, pageSize) => {
	this.getBusinesses(page, pageSize)

  };
  // Get the new businesses on businesses per page change
  onShowSizeChange = (page, pageSize) => {
	this.getBusinesses(page, pageSize)
  };

  componentDidMount() {
	// Function to obtain paginated businesses
	this.getBusinesses(this.state.isActive, this.state.perPage)
  };

// Function to return the total count of businesses on the page
  showTotal = (total) => `Total ${total} Businesses`;

  // Function to render the component
  render() {
	let {businesses} = this.state;
	return (
	  <div>
		<NavigationBar auth={this.state.isAuthenticated}/>
		<Container fluid>
		  <Pagination current={this.state.isActive}
					  selectComponentClass={Select}
					  total={this.state.count}
					  onChange={this.onChange}
					  defaultPageSize={this.state.perPage}
					  showSizeChanger
					  showLessItems
					  pageSizeOptions={['6', '12', '18', '24']}
					  style={{marginTop: "15px"}}
					  showTitle={false}
					  locale={localeInfo}
					  onShowSizeChange={this.onShowSizeChange}
					  showTotal={this.showTotal}/>
		  <BusinessCards businesses={businesses}/>
		</Container>
	  </div>
	)

  };
}

export default BusinessCatalog
