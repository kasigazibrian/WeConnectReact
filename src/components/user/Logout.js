import React from 'react';
import { Alert, Container } from 'reactstrap';
import { toast } from 'react-toastify'
import axios from 'axios'
import NavigationBar from "../home/NavigationBar";
import {withRouter } from 'react-router-dom'

class LogOut extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            isAuthenticated: false,
            hasLoggedOut: false

        }
    }

    componentDidMount(){
        if(localStorage.getItem('token') !== null){
            axios.defaults.headers.common['access-token'] = localStorage.getItem('token');
            axios.post('http://localhost:5000/api/v2/auth/logout', {
                headers: {'Content-Type':'application/json', 'Accept': 'application/json'}
            })
          
                .then(response=> {
                    
                    if (response.data.Status === "Success")
                    {
                        localStorage.removeItem('token');
                        toast.success(response.data.Message,{position: toast.POSITION.TOP_CENTER});
                        this.setState({hasLoggedOut: true})

                    }
                    else{
                        toast.error(response.data.Message, {position: toast.POSITION.BOTTOM_CENTER});
                    }


                })
                .catch( error =>
                {
                    console.log("########", error)
                    localStorage.removeItem('token');
                    // toast.error(error.response.data.Message, {position: toast.POSITION.BOTTOM_CENTER});
                    // console.log(error.response.data.Message)
                })

        }
        else
            {
                this.setState({hasLoggedOut: true})

            }

    }


    render(){
        if(this.state.hasLoggedOut){
            setTimeout(()=> {
                this.props.history.push('/')
            }, 5000);
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
export default withRouter(LogOut);