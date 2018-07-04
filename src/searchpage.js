import React from 'react';
import './stylesheet.css'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button, Input, Container } from 'reactstrap';
import NavigationBar from "./NavigationBar";
import axios from 'axios'
import {toast} from "react-toastify";
import { Redirect } from 'react-router-dom'

export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            is_authenticated: this.props.getAuth(),
            category: "",
            location: "",
            business_name: "",
            count: 0,
            businesses: []
        };
    }

    componentWillMount(){
        if (localStorage.getItem('token') === null){
            this.setState({is_authenticated: false})
        }
        else( this.setState({is_authenticated: true}) )
    }

    handleSearchInputChange = event =>{
        console.log(event.target.value);
        this.setState({business_name: event.target.value})
    };
    handleCategoryChange = event =>{
        if (event.target.value === "Category")
            (event.target.value="");
        console.log(event.target.value);
        this.setState({category: event.target.value})
    };
    handleLocationChange = event =>{

        if (event.target.value === "Location")
            (event.target.value="");
        console.log(event.target.value);
        this.setState({location: event.target.value})
    };
    handleSubmit = event =>{
        const { business_name, category, location} = this.state;
        event.preventDefault();
        axios.get(`http://localhost:5000/api/v2/businesses?q=${business_name}&category=${category}&location=${location}`,
            {
                headers: {'Content-Type':'application/json'}
            })
            .then(response=> {
                console.log(response.data);

                toast.success("We have found "+response.data.count + " results", {position: toast.POSITION.TOP_CENTER});
                this.setState({businesses: response.data.Businesses, count: response.data.count});
            })
            .catch(error =>{
                console.log(error.response.data);
                toast.error(error.response.data.Message);

            });

    };
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        const { count, businesses } = this.state;
        if (count > 0){
            return (
                <div>
                    <Redirect to={{
                        pathname: '/search_results',
                        state: {businesses: businesses }
                    }} />
                </div>);
        }


        return (
            <div>
                <NavigationBar auth={this.state.is_authenticated}/>

            <div className="search-bar">
                <Container>
                    <div className="my-logo">
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <Navbar color="dark" light expand="md">
                            <NavbarBrand className='my-labels' href="/search">Search for Businesses</NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem className='nav-item-name-properties'>
                                        {/*<NavLink href="/components/"> </NavLink>*/}

                                        <input onChange={this.handleSearchInputChange} placeholder="Enter Business Name" className="my-input" type="text" id="components"/>

                                    </NavItem>
                                    <NavItem className='nav-item-name-properties'>
                                        <label  className='my-labels'>Filter By:</label>
                                    </NavItem>
                                    <NavItem className='nav-item-name-properties'>
                                        {/*<Label for="exampleSelect" >Select</Label>*/}
                                        <Input style={{marginTop: "12px"}} onChange={this.handleCategoryChange} type="select" name="select" id="exampleSelect">
                                            <option>Category</option>
                                            <option value="Entertainment">Entertainment</option>
                                            <option value="Real Estate">Real Estate</option>
                                            <option value="Education">Education</option>
                                            <option value="Automobiles">Automobiles</option>
                                            <option value="Health and Medicine">Health and Medicine</option>
                                            <option value="Computers & Electronics">Computers & Electronics</option>
                                        </Input>
                                    </NavItem >
                                    <NavItem className='nav-item-name-properties'>
                                        <Input style={{marginTop: "12px"}} onChange={this.handleLocationChange} type="select" name="select" id="exampleSelect" >
                                            <option style={{color: 'blue'}}>Location</option>
                                            <option value="wakiso">Wakiso</option>
                                            <option value="kabale">Kabale</option>
                                            <option value="mbarara">Mbarara</option>
                                            <option value="rukungiri">Rukungiri</option>
                                        </Input>
                                    </NavItem>
                                    <NavItem style={{marginRight: "20px", marginTop: "12px"}}>

                                        <Button color="primary">Search</Button>

                                    </NavItem>
                                     <NavItem style={{marginRight: "20px"}}>

                                     </NavItem>
                                    {/*</UncontrolledDropdown>*/}
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </form>

                </Container>
            </div>

            </div>
        );
    }
}