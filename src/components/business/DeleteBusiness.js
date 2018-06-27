import React from 'react';
import {withRouter} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import NavigationBar from "../home/NavigationBar";
import { Alert, Container } from 'reactstrap';


class DeleteBusiness extends React.Component {
    constructor(props){
        super(props);

        this.state={
            isAuthenticated: this.props.getAuth(),
            deletedSuccessfully: false,
            error_message: ''
        }
    }
    componentDidMount(){
        if(localStorage.getItem('token') !== null){
            // console.log(localStorage.getItem('token'))
            const id = this.props.match.params.business_id;
            // console.log(this.props.match)
            axios.defaults.headers.common['access-token'] = localStorage.getItem('token');
            axios.delete(`http://localhost:5000/api/v2/businesses/${id}`, {
                headers: {'Content-Type':'application/json'}
            })

                .then(response=> {
                    if (response.data.Status === "Success")
                    {
                        toast.success(response.data.Message,{position: toast.POSITION.TOP_CENTER});
                        this.setState({deletedSuccessfully: true})

                    }
                    else{
                        toast.error(response.data.Message, {position: toast.POSITION.BOTTOM_CENTER});
                    }


                })
                .catch( error =>
                {
                    toast.error(error.response.data.Message, {position: toast.POSITION.BOTTOM_CENTER});

                })

        }
        else
        {
            this.setState({deletedSuccessfully: false});
            toast.error("Please login", {position: toast.POSITION.BOTTOM_CENTER});
            this.props.history.push('/login')

        }

    }


    render(){

        let alert_success = <Alert color="success" style={{marginTop: "20px"}}>
            Business has been deleted successfully!
            <p>You will be redirected after 8 seconds</p>
        </Alert>;
        let alert_failure = <Alert color="danger" style={{marginTop: "20px"}}>
            <p> Delete failed!</p>
            {this.state.error_message}

        </Alert>;

        let alert = this.state.deletedSuccessfully ? alert_success: alert_failure;
        if(this.state.deletedSuccessfully){

            setTimeout(()=> {
                this.props.history.push('/businesses')
            }, 8000);
        }

        return(
            <div>
                <NavigationBar auth={this.state.isAuthenticated}/>
                <Container>
                    {alert}

                </Container>
            </div>
        );

    }
}
export default withRouter(DeleteBusiness);