import React from 'react';
import "./stylesheet.css";
import {  Alert, FormGroup, Label, Container, Col, Input } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify'
import { Redirect } from 'react-router-dom'
import NavigationBar from "./NavigationBar";

export default class LoginForm extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            username: '',
            password: '',
            is_authenticated: false
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });

    };
  
    handleSubmit = event => {


        event.preventDefault();


        const user = {
            username: this.state.username,
            password: this.state.password

        };
        axios.post('http://localhost:5000/api/v2/login',
            JSON.stringify(user),
            {
                headers: {'Content-Type':'application/json'}
            })
            .then(response => {
                console.log(response.data.Status)
                if (response.data.Status === "Success") {
                    toast.success(response.data.Message, {position: toast.POSITION.TOP_CENTER});
                    localStorage.setItem('token', response.data.Token);
                    this.setState({is_authenticated: true});

                }


            })
            .catch(error=>{
                console.log(error);
                // toast.error(error.response.data.Message,{position: toast.POSITION.BOTTOM_CENTER});
               

            })
    };

    render() {
        if (this.state.is_authenticated){
            return (
                <div>
                    <Redirect to={{
                        pathname: '/businesses',
                        state: {is_authenticated: true }
                    }} />
                </div>
            );
        }

        return (
              <div className="login-background-image">
                <NavigationBar auth={this.state.is_authenticated}/>
                  <div className="login-wrapping">


                    <Container >
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup  >
                            <Col sm={"9"}>
                                <h1 className="my-h1">Please Sign in</h1>
                            </Col>
                        </FormGroup>
                         <FormGroup >
                             <Col sm={"9"}>
                                 <label id="username" name="username" className="label-fontcolor"  >Username:</label>
                                 <input name="username" type="text" style={{borderRadius: "20px"}} onChange={this.handleChange}
                                        className="form-control" required="true">

                                 </input>
                             </Col>
                         </FormGroup>
                         <FormGroup >
                             <Col sm={"9"}>
                                 <label className="label-fontcolor"  >Password:</label>
                                 <input name="password" type="password" onChange={this.handleChange}
                                        id="password" style={{borderRadius : "20px"}} className="form-control"
                                        required="true">

                                 </input>
                             </Col>
                         </FormGroup>
                        <FormGroup>
                            <Col sm={"9"}>
                                <button style={{borderRadius : "20px"}} className={"btn btn-lg btn-info btn-block"}>
                                    Log in
                                </button>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={"10"}>
                                <Label className={"label-fontcolor"}>Don't have an account? Click
                                    <Label tag={"a"} href={"/signup"}> here</Label> to register</Label>
                            </Col>

                        </FormGroup>

                    </form>


                    </Container>

                </div>


              </div>
        );
    }
}