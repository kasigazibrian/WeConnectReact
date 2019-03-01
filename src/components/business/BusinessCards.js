import React from 'react'
import {
  Card, CardHeader, CardText, CardBody, Col, Row,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const BusinessCards = (props) => {

  // Function to destructure the business list
  let businesses = props.businesses.map((business, index) => {
	return (
	  <Col sm={"4"} key={index}>
		<Card body style={{marginTop: '20px', height: '90%'}}>
		  <CardBody>
			<CardHeader tag="h1">{business.business_name}</CardHeader>
			<CardTitle></CardTitle>
			<CardSubtitle>{business.business_category}</CardSubtitle>
			<CardText>{business.business_description}</CardText>
			<a href={`/businesses/${business.business_id}`}><Button className="btn-info">View Details</Button></a>
		  </CardBody>
		</Card>
	  </Col>
	);
  });

  return (
	<Row>
	  {businesses}
	</Row>
  );
};

export default BusinessCards
