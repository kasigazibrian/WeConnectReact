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

    componentWillMount(){
        console.log(this.props.getAuth());
    }
    componentDidMount(){
        console.log(this.state.is_authenticated);
    }


    handleUsernameChange = event => {
        this.setState({ username: event.target.value });
        console.log(event.target.value)

    };
    handlePasswordChange = e => {
        this.setState({password: e.target.value});
        console.log(e.target.value)

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
            .then(res => {

                if (res.data.Status === "Success") {
                    toast.success(res.data.Message, {position: toast.POSITION.TOP_CENTER});
                    localStorage.setItem('token', res.data.Token);
                    this.setState({is_authenticated: true});

                }
                else{

                    console.log(false);

                }


            })
            .catch(error=>{
                toast.error(error.response.data.Message,{position: toast.POSITION.BOTTOM_CENTER});
                console.log(error.response.data);
                console.log(error.response);
                console.log(error)

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
                                 <label id="username" className="label-fontcolor"  >Username:</label>
                                 <input type="text" style={{borderRadius: "20px"}} onChange={this.handleUsernameChange}
                                        className="form-control" required="true">

                                 </input>
                             </Col>
                         </FormGroup>
                         <FormGroup >
                             <Col sm={"9"}>
                                 <label className="label-fontcolor"  >Password:</label>
                                 <input type="password" onChange={this.handlePasswordChange}
                                        id="password" style={{borderRadius : "20px"}} className="form-control"
                                        required="true">

                                 </input>
                             </Col>
                         </FormGroup>
                        <FormGroup>
                            <Col sm={"9"}>
                                <Label check  className="rememberme">
                                    <Input type="checkbox" />
                                        Remember Me
                                </Label>
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