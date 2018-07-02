import React from 'react';
import { Alert, Container } from 'reactstrap';
import { toast } from 'react-toastify'
import axios from 'axios'
import NavigationBar from "../home/NavigationBar";
import Config from '../../App.config'

class LogOut extends React.Component{
	constructor(props){
		super(props);
		this.state = {
				isAuthenticated: false,
				hasLoggedOut: false

		}
	}

	componentDidMount = () => {
		// Check for user authentication
		if(localStorage.getItem('token') !== null){
				axios.defaults.headers.common['access-token'] = localStorage.getItem('token');
				axios.post(`${Config.API_BASE_URL}/api/v2/auth/logout`, {
					headers: {'Content-Type':'application/json', 'Accept': 'application/json'}
				})
			
				.then(response=> {
					if (response.data.Status === "Success")
					{
						localStorage.removeItem('token');
						localStorage.removeItem('username')
						localStorage.removeItem('id')
						toast.success(response.data.Message,{position: toast.POSITION.TOP_CENTER});
						this.setState({hasLoggedOut: true})

					}
				})
			.catch( error =>{
				if(error.response !== undefined){
					localStorage.removeItem('token');
					localStorage.removeItem('username');
					toast.error(error.response.data.Message,{position: toast.POSITION.BOTTOM_CENTER});
				}
				else{
					toast.error("Server ERROR Contact Administrator",{position: toast.POSITION.BOTTOM_CENTER});
				}
			})
		}
		else{
			this.props.history.push('/login')
			toast.error("Please login to view this page",{position: toast.POSITION.BOTTOM_CENTER});
		}
}
render(){
	// Check if user has logged out successfully
	if(this.state.hasLoggedOut){
			setTimeout(()=> {
					this.props.history.push('/')
			}, 3000);
	}

return (
		<div>
				<NavigationBar auth={this.state.isAuthenticated}/>
				<Container>
				<Alert color="success" style={{marginTop: "20px"}}>
					You have successfully logged out!
				</Alert>
					<label>Click <a href="/login">here</a> to login again!</label>
				</Container>
		</div>

  );
 }
}
export default LogOut;