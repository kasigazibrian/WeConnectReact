import React from 'react';
import "./stylesheet.css";
import {  Form, FormGroup, Label, Container, Col, Input } from 'reactstrap';
import axios from "axios/index";
import { toast } from 'react-toastify'
import NavigationBar from "./NavigationBar";


export default class SignupForm extends React.Component {
    constructor(props) {
        super(props);
                this.state = {
                    username: '',
                    password: '',
                    email: '',
                    first_name: '',
                    last_name: '',
                    gender: '',
                    confirm_password: '',
                    is_authenticated: this.props.getAuth()
                }

}

    componentWillMount(){
        if (localStorage.getItem('token') === null){
            this.setState({is_authenticated: false})
        }
        else( this.setState({is_authenticated: true}) )
    }

    handleConfirmPassword = event => {
           this.setState({confirm_password: event.target.value})

    };

    handleUsernameChange = event => {
        this.setState({ username: event.target.value });
        console.log(event.target.value)

    };
    handlePasswordChange = e => {
            this.setState({password: e.target.value});
            console.log(e.target.value)

    };
    handleEmailChange = e => {
        this.setState({email: e.target.value});
        console.log(e.target.value)
    };

    handleFirstNameChange = e =>{
        this.setState({first_name : e.target.value});
        console.log(e.target.value)
    };

    handleLastNameChange = e =>{
        this.setState({last_name : e.target.value})
    };

    handleGenderChange = e =>{
        this.setState({gender : e.target.value});
        console.log(e.target.value)
    };
    handleSubmit = event => {
        event.preventDefault();

        if (this.state.password !== this.state.confirm_password){

            console.log(false);
            toast.error("Passwords must match",{position: toast.POSITION.BOTTOM_CENTER});
        }
        else{
        const user = {
            username: this.state.username,
            password: this.state.password,
            last_name: this.state.last_name,
            first_name: this.state.first_name,
            gender: this.state.gender,
            email: this.state.email
        };

        axios.post('http://localhost:5000/api/v2/auth/register',
            JSON.stringify(user),
            {
                headers: {'Content-Type':'application/json'}
            })
            .then(res => {
                toast.success(res.data.Message,{position: toast.POSITION.BOTTOM_CENTER});
                console.log(res.data);
            })
            .catch(error=>{
                toast.error(error.response.data.Message,{position: toast.POSITION.BOTTOM_CENTER});
                console.log(error.response.data);
            })
    }
    };
    render() {


        return (
            <div className="signup-background-image">
                <NavigationBar auth={this.props.getAuth()}/>
            <div className={"signup-wrapping"}>
                <Container >
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup  >
                            <Col sm={"9"}>
                                <h1 className="my-h1">Please Sign up</h1>
                            </Col>
                        </FormGroup>
                        <FormGroup >
                            <Col sm={"9"}>
                                <label id="first-name" className="label-fontcolor"  >First Name:</label>
                                <input onChange={this.handleFirstNameChange} type="text" id="first_name"
                                       style={{borderRadius: "20px"}} className="form-control" required="true">

                                </input>
                            </Col>
                        </FormGroup>
                        <FormGroup >
                            <Col sm={"9"}>
                                <label id="last-name"  className="label-fontcolor"  >Last Name:</label>
                                <input onChange={this.handleLastNameChange} type="text" id="last_name"
                                       style={{borderRadius: "20px"}}
                                       className="form-control" required="true">

                                </input>
                            </Col>
                        </FormGroup>
                        <FormGroup >
                            <Col sm={"9"}>
                                <label id="username_label" className="label-fontcolor"  >Username:</label>
                                <input onChange={this.handleUsernameChange} type="text" id="username"
                                       style={{borderRadius: "20px"}} className="form-control" required="true">

                                </input>
                            </Col>
                        </FormGroup>
                        <FormGroup >
                            <Col sm={"9"}>
                                <label id="password" className="label-fontcolor"  >Password:</label>
                                <input onChange={this.handlePasswordChange} type="password" id="password-input"
                                       style={{borderRadius : "20px"}} className="form-control" required="true">

                                </input>
                            </Col>
                        </FormGroup>
                        <FormGroup >
                            <Col sm={"9"}>
                                <label className="label-fontcolor"  >Confirm Password:</label>
                                <input type="password" onChange={this.handleConfirmPassword} id="confirm-password"
                                       style={{borderRadius : "20px"}}
                                       className="form-control" required="true">

                                </input>
                            </Col>
                        </FormGroup>
                        <FormGroup >
                            <Col sm={"9"}>
                                <label id="email" className="label-fontcolor">Email:</label>
                                <input id="email-input" onChange={this.handleEmailChange} type="text" style={{borderRadius: "20px"}}
                                       className="form-control" required="true">

                                </input>
                            </Col>
                        </FormGroup>
                        <FormGroup check >

                            <label id="gender"  className="label-fontcolor"  >Gender:</label>

                            <Col sm={"9"}>

                                <Label check className={"label-fontcolor"}>
                                    <Input onChange={this.handleGenderChange} type="radio" value={"male"} name="gender" />
                                     Male
                                </Label>
                            </Col>
                            <Col sm={"9"}>
                                <Label check className={"label-fontcolor"}>
                                    <Input type="radio" onChange={this.handleGenderChange} value={"female"} name="gender" />
                                    Female
                                </Label>
                            </Col>

                        </FormGroup><br/>
                        <FormGroup>
                            <Col sm={"9"}>
                                <button style={{borderRadius : "20px"}} className={"btn btn-lg btn-info btn-block"}>
                                    Sign up
                                </button>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={"10"}>
                                <Label className={"label-fontcolor"}>Already have an account? Click
                                    <Label tag={"a"} href={"/login"}> here</Label> to Login
                                </Label>
                            </Col>
                        </FormGroup>

                    </Form>
                </Container>
            </div>
            </div>
        );
    }
}