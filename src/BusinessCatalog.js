import React from 'react';
import {  Card, CardHeader, CardText, CardBody, Container, Col, Row,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
import axios from 'axios';
import NavigationBar from "./NavigationBar";
import { Link } from "react-router-dom"


export default class BusinessCatalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            businesses: [],
            is_authenticated: false


        }
    }
    componentWillMount(){
        if (localStorage.getItem('token') !== null){
            this.setState({is_authenticated: true})
        }
        else( this.setState({is_authenticated: false}) )
    }


    componentDidMount(){
        axios.get(`http://localhost:5000/api/v2/businesses`)
            .then(response=> {
                console.log(response.data);
                this.setState({businesses: response.data.Businesses});
            })
            .catch(error =>{
                console.log(error.response.data);

            });


}

    render(){

        let businesses = this.state.businesses.map((business, index)=>{
            return (
                <Col sm={"4"} key={index}>
                    <Card body style={{marginTop: '20px'}} >

                        <CardBody>
                            <CardHeader tag="h1" >{business.business_name}</CardHeader>
                            <CardTitle></CardTitle>
                            <CardSubtitle>{business.business_category}</CardSubtitle>
                            <CardText>{business.business_description}</CardText>
                            <Link to={`/businesses/${business.business_id}`}><Button className="btn-info" >View Details</Button></Link>
                        </CardBody>
                    </Card>
                </Col>
            );
        })

       return(
           <div>
           <NavigationBar auth={this.state.is_authenticated}/>
           <Container fluid>
               <Row>
                   {businesses}
               </Row>
           </Container>
           </div>
       )

};
}

