import React from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import NavigationBar from "../home/NavigationBar";
import {   FormGroup, Container, Col, Input, Label } from 'reactstrap';
import {Redirect, withRouter } from 'react-router-dom'

class EditBusiness extends React.Component{
    constructor(props){
        super(props);

        this.state={
            isAuthenticated: this.props.getAuth(),
            business_name: "",
            business_category: "",
            business_location: "",
            business_email: "",
            contact_number: "",
            business_description: "",
            business_id: "",
            updatedSuccessfully: false
        }
    }

    componentWillMount() {
        if (localStorage.getItem('token') === null) {
            this.setState({isAuthenticated: false});
            this.props.history.push('/login');
            toast.error("Please login", {position: toast.POSITION.BOTTOM_CENTER});

        }
        else {
            this.setState({isAuthenticated: true});
            const id  = this.props.match.params.business_id;
            axios.get(`http://localhost:5000/api/v2/businesses/${id}`)
                .then(response=> {
                    this.setState({
                        business_name: response.data.Businesses[0].business_name,
                        business_category: response.data.Businesses[0].business_category,
                        business_location: response.data.Businesses[0].business_location,
                        contact_number: response.data.Businesses[0].contact_number,
                        business_email: response.data.Businesses[0].business_email,
                        business_description: response.data.Businesses[0].business_description,
                        business_id: response.data.Businesses[0].business_id
                    })
                })
                .catch(error =>{
                    if(error.response !== undefined){
                        toast.error(error.response.data.Message, {position: toast.POSITION.BOTTOM_CENTER});
                    }

                });
        }
    }
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});


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
                // console.log(res)
                // toast.success(res.data.Message, {position: toast.POSITION.BOTTOM_CENTER});
                this.setState({updatedSuccessfully: true})
            })
            .catch(error => {
                if(error.response !== undefined){
                    // console.log(error)
                    // toast.error(error.response.data.Message, {position: toast.POSITION.BOTTOM_CENTER});
                }
            })
    };
render(){

    if (this.state.updatedSuccessfully){
        return(
            <Redirect to={`/businesses/${this.state.business_id}`}/>
        )
    }

    return(
    <div>
        <NavigationBar auth={this.state.isAuthenticated}/>
        <Container>
            <form onSubmit={this.handleUpdateSubmit}>
                <FormGroup>
                    <Col sm={"6"}>
                        <h1 id="heading" style={{fontSize: "28px"}}>Edit Business </h1>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={"6"}>
                        <label >Business Name:</label>
                        <input name="business_name" value={this.state.business_name} onChange={this.handleChange} type="text" style={{borderRadius: "20px"}} className="form-control" required="true"/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={"6"}>
                        <label >Business Location:</label>
                        <input name="business_location" value={this.state.business_location} onChange={this.handleChange} type="text" style={{borderRadius: "20px"}} className="form-control" required="true"/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={"6"}>
                        <label >Business Email:</label>
                        <input name="business_email" value={this.state.business_email} onChange={this.handleChange} type="text" style={{borderRadius: "20px"}} className="form-control" required="true"/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={"6"}>
                        <label>Contact Number:</label>
                        <input value={this.state.contact_number} onChange={this.handleChange} type="text" id="contact_number" style={{borderRadius: "20px"}}
                               className="form-control" name="contact_number" required="true"/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={"6"}>
                        <label>Business Description:</label>
                        <Input name="business_description" onChange={this.handleChange} value={this.state.business_description} type="textarea" id="description" style={{borderRadius: "20px"}}
                               className="form-control" required="true"/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={"6"}>
                        <label >Business Category:</label>
                        <Input name="business_category" onChange={this.handleChange} type="select" name="businessCategory" id="exampleSelect">
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
                        <button type="submit" style={{borderRadius: "20px"}}
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