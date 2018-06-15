import React from 'react';
import {  Form, FormGroup, Container, Col, Row, Label } from 'reactstrap';
import NavigationBar from "./NavigationBar";
import TinyMCE from 'react-tinymce'
import './stylesheet.css'
import axios from "axios";
import { toast } from "react-toastify"

export default class BusinessRegistration extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            is_authenticated: false,
            review: '',
            business_name: '',
            business_category: '',
            business_location: '',
            contact_number: '',
            business_email: '',
            business_description: '',
            business_id: ''


        }
    }
    componentWillMount(){
        if (localStorage.getItem('token') === null){
            this.setState({is_authenticated: false});

        }
        else( this.setState({is_authenticated: true}) )
    }

    componentDidMount(){
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
                console.log(error.response.data);
                toast.error("Business with id "+id +" not found", {position: toast.POSITION.BOTTOM_CENTER})

            });
    }

    handleReviewChange = (e) =>{
        console.log(e.target.value);
        this.setState({review: e.target.value})
    };

    render(){
        return(
            <div>
                <NavigationBar auth={this.state.is_authenticated}/>
                <Container >
                    <Row>

                        <Col xs="7">
                            <div className="my-content-left">
                    <Form>
                        <FormGroup  >

                                <h1 style={{fontSize: "40px"}} className="my-label-fontcolor">Business Profile</h1>

                        </FormGroup>
                        <FormGroup >

                                <b><label id="user" className="my-label-fontcolor">Business Name:</label></b><br/>
                                <Label className="profile-labels">{this.state.business_name}</Label>

                        </FormGroup>
                        <FormGroup >

                                <b><label id="user" className="my-label-fontcolor"  >Business Location:</label></b><br/>
                                <Label className="profile-labels"> {this.state.business_location}</Label>

                        </FormGroup>
                        <FormGroup >

                                <b><label id="user" className="my-label-fontcolor">Business Email:</label></b><br/>
                                <Label className="profile-labels">{this.state.business_email}</Label>

                        </FormGroup>
                        <FormGroup >

                                <b><label className="my-label-fontcolor">Contact Number:</label></b><br/>
                                <Label className="profile-labels">{this.state.contact_number}</Label>

                        </FormGroup>
                        <FormGroup >

                                <b><label className="my-label-fontcolor"  >Business Description:</label></b><br/>
                                <Label className="profile-labels"> {this.state.business_description}</Label>

                        </FormGroup>
                        <FormGroup>

                                <b><Label for="business_category">Business Category:</Label></b><br/>
                                <Label className="profile-labels">{this.state.business_category}</Label>

                        </FormGroup>

                                    <b><Label for="text_area">Reviews:</Label></b><br/>
                                     <label className="profile-labels">This business is awesome</label><br/>
                                    <label className="profile-labels">This business rocks</label>

                        <FormGroup>

                                <b><Label for="text_area">Add Business Review:</Label></b><br/>
                                <TinyMCE
                                    content="<p>This is the initial content of the editor</p>"
                                    config={{
                                        plugins: 'autolink link image lists print preview',
                                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
                                    }}
                                    onChange={this.handleReviewChange}
                                />

                        </FormGroup>
                        <FormGroup>

                                <button style={{borderRadius : "20px"}} className={"btn btn-lg btn-info btn-block"} >Add Review </button>

                        </FormGroup>
                    </Form>
                            </div>
                        </Col>
                        <Col xs="5">

                            <div className="my-buttons">

                                <a href={`/edit_business/${this.state.business_id}`} style={{borderRadius : "20px"}} className={"btn btn-lg btn-info btn-block"} >Edit Business </a>

                                <a href={`/delete_business/${this.state.business_id}`} style={{borderRadius : "20px"}} className={"btn btn-lg btn-danger btn-block"} >Delete Business </a>
                            </div>

                        </Col>

                    </Row>
                </Container>
            </div>
        );
    }
}


