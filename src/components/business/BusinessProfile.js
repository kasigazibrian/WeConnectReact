import React from 'react';
import {  FormGroup, Container, Col, Row, Label } from 'reactstrap';
import NavigationBar from "../home/NavigationBar";
import TinyMCE from 'react-tinymce'
import axios from "axios";
import { toast } from "react-toastify"
import sanitizeHtml from 'sanitize-html';

export default class BusinessRegistration extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            review: '',
            business_name: '',
            business_category: '',
            business_location: '',
            contact_number: '',
            business_email: '',
            business_description: '',
            business_id: '',
            reviews: []


        }
    }
    componentWillMount(){
        if (localStorage.getItem('token') === null){
            this.setState({isAuthenticated: false});

        }
        else( this.setState({isAuthenticated: true}) )
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
        axios.get(`http://localhost:5000/api/v2/businesses/${id}/reviews`)
            .then(response =>{
                console.log(response.data['Business Reviews']);
                this.setState({reviews: response.data["Business Reviews"]})
            })
            .catch(error => {
                toast.error(error.response.data.Message, {position: toast.POSITION.BOTTOM_CENTER})
            })
    }

    handleReviewChange = (e) =>{
        console.log(e.target.getContent())
        this.setState({review: e.target.getContent()});
    };
    handleSubmit = e =>{
        e.preventDefault();

        const review = {review: this.state.review};
        console.log(this.state.review);
        axios.post(`http://localhost:5000/api/v2/businesses/${this.state.business_id}/reviews`, JSON.stringify(review),
        {
            headers: {'Content-Type':'application/json'}
        })
        .then(res => {
            console.log(res)
            if (res.data.Status === "Success") {
                toast.success(res.data.Message, {position: toast.POSITION.TOP_CENTER});
                this.setState({isAuthenticated: true});

            }
            else{
                toast.success(res.data.Message, {position: toast.POSITION.TOP_CENTER});
            }
    })
    .catch(error => {
        toast.error(error.response.data.Message, {position: toast.POSITION.BOTTOM_CENTER});
    })
}

    render(){
        const {reviews} =  this.state;
        // console.log(reviews["review"])
        function createMarkup(review){
            // return {__html: review};
            return {__html: review.review};
          }
        

        let review_list = reviews.map((review, index)=>(<ul key={index}><li  dangerouslySetInnerHTML={createMarkup(review)}>
           </li></ul>));
      
        return(
            <div>
                <NavigationBar auth={this.state.isAuthenticated}/>
                <Container >
                    <Row>

                        <Col xs="7">
                            <div className="my-content-left">
                    <form onSubmit={this.handleSubmit}>
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
                                    {review_list}

                        <FormGroup>

                                <b><Label for="text_area">Add Business Review:</Label></b><br/>
                                <TinyMCE
                                    config={{
                                        
                                        menubar: false,
                                        statusbar: false,
                                        plugins: 'autolink link image lists print preview',
                                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
                                    }}
                                    content="<p>Add a business review here</p>"
                                    id = "content"
                                    onChange={this.handleReviewChange}
                                    />

                        </FormGroup>
                        <FormGroup>

                                <button style={{borderRadius : "20px"}} className={"btn btn-lg btn-info btn-block"} >Add Review </button>

                        </FormGroup>
                    </form>
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


