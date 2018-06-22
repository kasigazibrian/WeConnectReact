import React from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import NavigationBar from "./NavigationBar";
import {   FormGroup, Container, Col, Input, Label } from 'reactstrap';
import {withRouter, Redirect } from 'react-router-dom'

class EditBusiness extends React.Component{
    constructor(props){
        super(props);

        this.state={
            is_authenticated: this.props.getAuth(),
            business_name: "",
            business_category: "",
            business_location: "",
            business_email: "",
            contact_number: "",
            business_description: "",
            business_id: "",
            updated_successfully: false
        }
    }

    componentWillMount() {
        if (localStorage.getItem('token') === null) {
            this.setState({is_authenticated: true});
            this.props.history.push('/login');
            toast.error("Please login", {position: toast.POSITION.BOTTOM_CENTER});

        }
        else {
            this.setState({is_authenticated: true});
            const  id  = this.props.match.params.business_id;
            axios.get(`http://localhost:5000/api/v2/businesses/${id}`)
                .then(response=> {
                    console.log(response.data);
                    this.setState({business_name: response.data.Businesses[0].business_name});
                    this.setState({business_category: response.data.Businesses[0].business_category});
                    this.setState({business_location: response.data.Businesses[0].business_location});
                    this.setState({contact_number: response.data.Businesses[0].contact_number});
                    this.setState({business_email: response.data.Businesses[0].business_email});
                    this.setState({business_description: response.data.Businesses[0].business_description});
                    this.setState({business_id: response.data.Businesses[0].business_id});
                })
                .catch(error =>{
                    toast.error(error.response.data.Message, {position: toast.POSITION.BOTTOM_CENTER});
                    this.props.history.push('/');

                });
        };
    }
    handleBusinessNameUpdate = event => {
        this.setState({business_name: event.target.value});
        console.log(event.target.value)

    };

    handleBusinessCategoryUpdate = event => {
        this.setState({ business_category: event.target.value });
        console.log(event.target.value)

    };
    handleBusinessLocationUpdate = e => {
        this.setState({business_location: e.target.value});
        console.log(e.target.value)

    };
    handleBusinessEmailUpdate = e => {
        this.setState({business_email: e.target.value});
        console.log(e.target.value)
    };

    handleBusinessDescriptionUpdate = e =>{
        this.setState({business_description: e.target.value});
        console.log(e.target.value)
    };

    handleContactNumberUpdate = e =>{
        this.setState({contact_number : e.target.value});
        console.log(e.target.value)
    };
    handleUpdateSubmit = event => {
        const id = this.props.match.params.business_id;
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
        axios.put(`http://localhost:5000/api/v2/businesses/${id}`,
            JSON.stringify(business),
            {headers: {'Content-Type': 'application/json'}
            })
            .then(res => {
                toast.success(res.data.Message, {position: toast.POSITION.BOTTOM_CENTER});
                console.log(res.data);
                this.setState({updated_successfully: true})
            })
            .catch(error => {
                toast.error(error.response.data.Message, {position: toast.POSITION.BOTTOM_CENTER});
                console.log(error.response.data);
            })
    };
render(){

    if (this.state.updated_successfully){
        return(
            <Redirect to={`/businesses/${this.state.business_id}`}/>
        )
    }

    return(
    <div>
        <NavigationBar auth={this.state.is_authenticated}/>
        <Container>
            <form onSubmit={this.handleUpdateSubmit}>
                <FormGroup>
                    <Col sm={"6"}>
                        <h1 style={{fontSize: "28px"}}>Edit Business </h1>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={"6"}>
                        <Label id="user">Business Name:</Label>
                        <input value={this.state.business_name} onChange={this.handleBusinessNameUpdate} type="text" style={{borderRadius: "20px"}} className="form-control" required="true"/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={"6"}>
                        <Label id="user">Business Location:</Label>
                        <input value={this.state.business_location} onChange={this.handleBusinessLocationUpdate} type="text" style={{borderRadius: "20px"}} className="form-control" required="true"/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={"6"}>
                        <Label id="user">Business Email:</Label>
                        <input value={this.state.business_email} onChange={this.handleBusinessEmailUpdate} type="text" style={{borderRadius: "20px"}} className="form-control" required="true"/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={"6"}>
                        <Label for="contact_number">Contact Number:</Label>
                        <input value={this.state.contact_number} onChange={this.handleContactNumberUpdate} type="text" id="contact_number" style={{borderRadius: "20px"}}
                               className="form-control" required="true"/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={"6"}>
                        <Label>Business Description:</Label>
                        <Input onChange={this.handleBusinessDescriptionUpdate} value={this.state.business_description} type="textarea" id="description" style={{borderRadius: "20px"}}
                               className="form-control" required="true"/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={"6"}>
                        <Label for="exampleSelect">Business Category:</Label>
                        <Input onChange={this.handleBusinessCategoryUpdate} type="select" name="select" id="exampleSelect">
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
                                className={"btn btn-lg btn-info btn-block"}>Save Changes
                        </button>
                    </Col>
                </FormGroup>
            </form>
        </Container>
    </div>
    );
}
}
export default withRouter(EditBusiness)