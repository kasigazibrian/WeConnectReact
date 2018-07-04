import React from 'react';
import { Alert, Container } from 'reactstrap';
import { toast } from 'react-toastify'
import axios from 'axios'
import NavigationBar from "./NavigationBar";
import {Redirect, withRouter } from 'react-router-dom'

class LogOut extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            is_authenticated: this.props.getAuth(),
            has_logged_out: false

        }
    }
    // componentWillMount(){
    //     if (localStorage.getItem('token') === null){
    //         this.setState({is_authenticated: false})
    //     }
    //     else( this.setState({is_authenticated: true}) )
    // }


    componentDidMount(){
        if(localStorage.getItem('token') !== null){
            console.log(localStorage.getItem('token'));
            axios.defaults.headers.common['access-token'] = localStorage.getItem('token');
            axios.post('http://localhost:5000/api/v2/auth/logout', {
                headers: {'Content-Type':'application/json'}
            })

                .then(response=> {
                    if (response.data.Status === "Success")
                    {
                        console.log(response.data);
                        localStorage.removeItem('token');
                        toast.success(response.data.Message,{position: toast.POSITION.TOP_CENTER});
                        this.setState({has_logged_out: true})

                    }
                    else{
                        toast.error(response.data.Message, {position: toast.POSITION.BOTTOM_CENTER});
                    }


                })
                .catch( error =>
                {
                    localStorage.removeItem('token');
                    toast.error(error.response.data.Message, {position: toast.POSITION.BOTTOM_CENTER});
                    console.log(error.response.data.Message)
                })

        }
        else
            {
                this.setState({has_logged_out: true})

            }

    }


    render(){
        if(this.state.has_logged_out){
            setTimeout(()=> {
                this.props.history.push('/')
            }, 8000);
        }


    return (
        <div>
            <NavigationBar auth={this.state.is_authenticated}/>
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