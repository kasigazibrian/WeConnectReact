import React from 'react';
// import "./stylesheet.css";
import {  Form, FormGroup, Label, Container, Col, Input } from 'reactstrap';
import axios from "axios";
import { toast } from 'react-toastify'
import NavigationBar from "../home/NavigationBar";
import zxcvbn from "zxcvbn"
import { Redirect } from 'react-router-dom'


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
                    confirmPassword: '',
                    isAuthenticated: false,
                    suggestions: [],
                    score: "",
                    message: "",
                    added_successfully: false
                }

}

    componentWillMount(){
        if (localStorage.getItem('token') === null){
            this.setState({isAuthenticated: false})
        }
        else( this.setState({isAuthenticated: true}) )
    }

    handlePasswordChange = e => {
        let evaluation = zxcvbn(e.target.value);
        this.setState({password: e.target.value, score: evaluation.score,
            suggestions: evaluation.feedback.suggestions, message: ""});

    };

    handleChange = e =>{
        this.setState({[e.target.name] : e.target.value})

    };

   
    handleSubmit = event => {
        event.preventDefault();
        if (this.state.password !== this.state.confirmPassword){
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
                this.setState({added_successfully: true})
                toast.success(res.data.Message+'! You can now login!',{position: toast.POSITION.BOTTOM_CENTER});
            })
            .catch(error=>{
                toast.error(error.response.data.Message,{position: toast.POSITION.BOTTOM_CENTER});
            })
    }
    };
    render() {

        if (this.state.added_successfully){
            return (
                <div>
                    <Redirect to={{
                        pathname: '/login',
                        state: {isAuthenticated: true }
                    }} />
                </div>
            );
        }
        const {suggestions, score} = this.state;
        let css_class = "";
        let message = "";
        if (score === 0){
            css_class = "weak";
            message = "Weak";

        }
        else if (score === 1){
            css_class = "fair";
            message = "Fair";
        }
        else if (score === 2){
            css_class = "good";
            message = "Good";
        }
        else if (score === 3){
            css_class = "strong";
            message = "Strong";
        }
        else if (score === 4){
            css_class = "very-strong";
            message = "Very Strong";
        }
        else {
            message = "";
            css_class = ""
        }

        return (
            <div className="signup-background-image">
                <NavigationBar auth={this.state.isAuthenticated}/>
            <div className={"signup-wrapping"}>
                <Container >
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup  >
                            <Col sm={"9"}>
                                <h1 className="my-h1">Please Sign up</h1>
                            </Col>
                        </FormGroup>
                        <FormGroup >
                            <Col sm={"9"}>
                                <label id="first-name" className="label-fontcolor"  >First Name:</label>
                                <input onChange={this.handleChange} name="first_name" type="text" id="first_name"
                                       style={{borderRadius: "20px"}} className="form-control" required="true">

                                </input>
                            </Col>
                        </FormGroup>
                        <FormGroup >
                            <Col sm={"9"}>
                                <label id="last-name" name="last_name"  className="label-fontcolor"  >Last Name:</label>
                                <input name="last_name" onChange={this.handleChange} type="text" id="last_name"
                                       style={{borderRadius: "20px"}}
                                       className="form-control" required="true">

                                </input>
                            </Col>
                        </FormGroup>
                        <FormGroup >
                            <Col sm={"9"}>
                                <label id="username_label" className="label-fontcolor"  >Username:</label>
                                <input name="username" onChange={this.handleChange} type="text" id="username"
                                       style={{borderRadius: "20px"}} className="form-control" required="true">

                                </input>
                            </Col>
                        </FormGroup>
                        <FormGroup >
                            <Col sm={"9"}>
                                <label id="password" className="label-fontcolor"  >Password:</label>
                                <Input name="password" onChange={this.handlePasswordChange} type="password" id="password-input"
                                       style={{borderRadius : "20px"}} className="form-control" required="true">

                                </Input>  <span id="passwordStrength" className={css_class} >{message}</span>
                                <ul>
                                    {suggestions.map((suggestion, index)=>
                                        <li className="label-fontcolor" key={index}>{suggestion}</li>)}
                                </ul>
                            </Col>
                        </FormGroup>
                        <FormGroup >
                            <Col sm={"9"}>
                                <label className="label-fontcolor"  >Confirm Password:</label>
                                <input name="confirmPassword" type="password" onChange={this.handleChange} id="confirm-password"
                                       style={{borderRadius : "20px"}}
                                       className="form-control" required="true">

                                </input>
                            </Col>
                        </FormGroup>
                        <FormGroup >
                            <Col sm={"9"}>
                                <label id="email" className="label-fontcolor">Email:</label>
                                <input name="email" id="email-input" onChange={this.handleChange} type="text" style={{borderRadius: "20px"}}
                                       className="form-control" required="true">

                                </input>
                            </Col>
                        </FormGroup>
                        <FormGroup check >

                            <label id="gender"  className="label-fontcolor"  >Gender:</label>

                            <Col sm={"9"}>

                                <Label check className={"label-fontcolor"}>
                                    <Input onChange={this.handleChange} type="radio" value={"male"} name="gender" />
                                     Male
                                </Label>
                            </Col>
                            <Col sm={"9"}>
                                <Label check className={"label-fontcolor"}>
                                    <Input type="radio" onChange={this.handleChange} value={"female"} name="gender" />
                                    Female
                                </Label>
                            </Col>
                            <Col sm={"9"}>
                                <Label check className={"label-fontcolor"}>
                                    <Input type="radio" onChange={this.handleChange} value={"other"} name="gender" />
                                    Other
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

                    </form>
                </Container>
            </div>
            </div>
        );
    }
}