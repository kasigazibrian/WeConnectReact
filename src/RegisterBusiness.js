import React from 'react';
import { FormGroup, Container, Col, Input, Label } from 'reactstrap';
import "./stylesheet1.css";
import NavigationBar from "./NavigationBar";
import {toast} from "react-toastify";
import axios from "axios/index";
import {Redirect} from 'react-router-dom'

export default class BusinessRegistration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            business_name: "",
            business_category: "",
            business_location: "",
            business_email: "",
            contact_number: "",
            business_description: "",
            is_authenticated: false,
            registered_successfully: false


        }
    }


    componentWillMount() {
        if (localStorage.getItem('token') === null) {
            return (
                <Redirect to={{
                    pathname: '/login',
                    state: {is_authenticated: false}
                }}/>
            )
        }
        else (this.setState({is_authenticated: true}))
    }

    handleBusinessNameChange = event => {
        this.setState({business_name: event.target.value});
        console.log(event.target.value)

    };

    handleBusinessCategoryChange = event => {
        this.setState({ business_category: event.target.value });
        console.log(event.target.value)

    };
    handleBusinessLocationChange = e => {
        this.setState({business_location: e.target.value});
        console.log(e.target.value)

    };
    handleBusinessEmailChange = e => {
        this.setState({business_email: e.target.value});
        console.log(e.target.value)
    };

    handleBusinessDescriptionChange = e =>{
        this.setState({business_description: e.target.value});
        console.log(e.target.value)
    };

    handleContactNumberChange = e =>{
        this.setState({contact_number : e.target.value});
        console.log(e.target.value)
    };
    handleSubmit = event => {
        event.preventDefault();
        const business = {
            business_name: this.state.business_name,
            business_category: this.state.business_category,
            business_location: this.state.business_location,
            business_email: this.state.business_email,
            contact_number: this.state.contact_number,
            business_description: this.state.business_description
        };
        axios.defaults.headers.common['access-token'] = localStorage.getItem('token');
        axios.post('http://localhost:5000/api/v2/businesses',
            JSON.stringify(business),
            {
                headers: {'Content-Type': 'application/json'}
            })
            .then(res => {
                toast.success(res.data.Message, {position: toast.POSITION.BOTTOM_CENTER});
                this.setState({registered_successfully: true});
                console.log(res.data);
            })
            .catch(error => {
                toast.error(error.response.data.Message, {position: toast.POSITION.BOTTOM_CENTER});
                console.log(error.response.data);
            })
    };



    render(){

        if(this.state.registered_successfully) {
            return(
            <div>
                <Redirect to={{
                    pathname: '/businesses',
                    state: {is_authenticated: true }
                }} />
            </div>);
        }
    return (
        <div>
            <NavigationBar auth={this.state.is_authenticated}/>
            <Container>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Col sm={"6"}>
                            <h1 style={{fontSize: "28px"}}>Business Registration Form</h1>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={"6"}>
                            <Label id="user">Business Name:</Label>
                            <input onChange={this.handleBusinessNameChange} type="text" style={{borderRadius: "20px"}} className="form-control" required="true"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={"6"}>
                            <Label id="user">Business Location:</Label>
                            <input onChange={this.handleBusinessLocationChange} type="text" style={{borderRadius: "20px"}} className="form-control" required="true"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={"6"}>
                            <Label id="user">Business Email:</Label>
                            <input onChange={this.handleBusinessEmailChange} type="text" style={{borderRadius: "20px"}} className="form-control" required="true"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={"6"}>
                            <Label for="contact_number">Contact Number:</Label>
                            <input onChange={this.handleContactNumberChange} type="text" id="contact_number" style={{borderRadius: "20px"}}
                                   className="form-control" required="true"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={"6"}>
                            <Label>Business Description:</Label>
                            <Input onChange={this.handleBusinessDescriptionChange} type="textarea" id="description" style={{borderRadius: "20px"}}
                                   className="form-control" required="true"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={"6"}>
                            <Label for="exampleSelect">Business Category:</Label>
                            <Input onChange={this.handleBusinessCategoryChange} type="select" name="select" id="exampleSelect">
                                <option value="Entertainment">Entertainment</option>
                                <option value="Real Estate">Real Estate</option>
                                <option value="Education">Education</option>
                                <option value="Automobiles">Automobiles</option>
                                <option value="Health and Medicine">Health and Medicine</option>
                                <option value="Computers & Electronics">Computers & Electronics</option>
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={"6"}>
                            <button style={{borderRadius: "20px"}}
                                    className={"btn btn-lg btn-info btn-block"}>Register
                            </button>
                        </Col>
                    </FormGroup>
                </form>
            </Container>
        </div>
    );
  }
}
