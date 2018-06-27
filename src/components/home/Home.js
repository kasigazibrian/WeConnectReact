import React from 'react';
import { Jumbotron, Button, Container } from 'reactstrap';


class MyJumbotron extends React.Component{
    constructor(){
        super();

    }
    render(){
    return (

        <div>
        
            <Jumbotron>
                <h1 className="display-3">WELCOME!</h1>
                <p className="lead">This is a simple business advertising company. You can register your business with
                    us by simply creating an account.</p>
                <hr className="my-2" />
                <p>You can view registered businesses by simply clicking the button below.</p>
                <p className="lead">
                    <Button tag={"a"} href={"/businesses"} color="info">View Registered Businesses</Button>
                </p>
            </Jumbotron>
         
        </div>
    );
}
}

export default MyJumbotron;
