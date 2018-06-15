import React from "react";
import {  Form, FormGroup, Col } from 'reactstrap';
import NavigationBar from "./NavigationBar";
import { Redirect } from 'react-router-dom'
import {toast} from "react-toastify";
import axios from "axios";
export default class ResetPassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            is_authenticated: this.props.getAuth(),
            new_password: '',
            confirm_password: '',
            reset_status: false
        }
    }

    componentWillMount() {
        if (localStorage.getItem('token') === null) {
            this.setState({is_authenticated: false});
            return (
                <div>
                    <Redirect to={{
                        pathname: '/businesses',
                        state: {is_authenticated: true }
                    }} />
                </div>)
        }
        else {
            this.setState({is_authenticated: true});

        }
    }

    handlePasswordChange = event=>
    {
        this.setState({new_password: event.target.value});
        console.log(event.target.value)
    };

    handleConfirmPasswordChange = event=>
    {
        this.setState({confirm_password: event.target.value});
        console.log(event.target.value)
    };


    handleSubmit = event => {


        event.preventDefault();


        const new_password = {
            new_password: this.state.new_password

        };

        if(this.state.new_password === this.state.confirm_password){
            axios.defaults.headers.common['access-token'] = localStorage.getItem('token');
            axios.post('http://localhost:5000/api/v2/auth/reset-password',
                JSON.stringify(new_password),
                {
                    headers: {'Content-Type':'application/json'}
                })
                .then(res => {

                    if (res.data.Status === "Success") {
                        this.setState({reset_status: true});

                        toast.success(res.data.Message, {position: toast.POSITION.TOP_CENTER});

                    }
                    else{

                        console.log(false);

                    }


                })
                .catch(error=>{
                    toast.error(error.response.data.Message,{position: toast.POSITION.BOTTOM_CENTER});


                })
        }
        else {
            toast.error("Passwords must much",{position: toast.POSITION.BOTTOM_CENTER});
        }

    };

    render(){

        if (this.state.reset_status){
            return (
                <div>
                    <Redirect to={{
                        pathname: '/businesses',
                        state: {is_authenticated: true }
                    }} />
                </div>);

        }

        return(
            <div>
                <NavigationBar auth={this.state.is_authenticated}/>

                <div className="reset-password-wrapping">
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup  >
                        <Col sm={"6"}>
                            <h1 className="my-h1">Please Enter New Password</h1>
                        </Col>
                    </FormGroup>
                    <FormGroup >
                        <Col sm={"6"}>
                            <label id="first-name" className="label-fontcolor"  >New Password:</label>
                            <input onChange={this.handlePasswordChange} type="password" id="first_name"
                                   style={{borderRadius: "20px"}} className="form-control" required="true">

                            </input>
                        </Col>
                    </FormGroup>
                    <FormGroup >
                        <Col sm={"6"}>
                            <label id="first-name" className="label-fontcolor"  >Confirm Password:</label>
                            <input onChange={this.handleConfirmPasswordChange} type="password" id="first_name"
                                   style={{borderRadius: "20px"}} className="form-control" required="true">

                            </input>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={"6"}>
                            <button style={{borderRadius : "20px"}} className={"btn btn-lg btn-info btn-block"}>
                                Reset Password
                            </button>
                        </Col>
                    </FormGroup>
                </Form>
                </div>

            </div>
        )
    }
}