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

export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            is_authenticated: this.props.getAuth()
        };
    }

    componentWillMount(){
        if (localStorage.getItem('token') === null){
            this.setState({is_authenticated: false})
        }
        else( this.setState({is_authenticated: true}) )
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <NavigationBar auth={this.state.is_authenticated}/>

            <div className="search-bar">
                <Container>
                    <div className="my-logo">
                    </div>
                        <Navbar color="dark" light expand="md">
                            <NavbarBrand className='my-labels' href="/">Search for Businesses</NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem className='nav-item-name-properties'>
                                        {/*<NavLink href="/components/"> </NavLink>*/}

                                        <input className="my-input" type="text" id="components"/>

                                    </NavItem>
                                    <NavItem className='nav-item-name-properties'>
                                        <label className='my-labels'>Filter By:</label>
                                    </NavItem>
                                    <NavItem className='nav-item-name-properties'>
                                        {/*<Label for="exampleSelect" >Select</Label>*/}
                                        <Input type="select" name="select" id="exampleSelect" >
                                            <option>Category</option>
                                            <option>Entertainment</option>
                                            <option>Real Estate</option>
                                            <option>sd</option>
                                            <option>sdfsdf</option>
                                        </Input>
                                    </NavItem >
                                    <NavItem className='nav-item-name-properties'>
                                        <Input type="select" name="select" id="exampleSelect" >
                                            <option style={{color: 'blue'}}>Location</option>
                                            <option>Wakiso</option>
                                            <option>Kabale</option>
                                            <option>Mbarara</option>
                                            <option>Rukungiri</option>
                                        </Input>
                                    </NavItem>
                                    <NavItem style={{marginRight: "20px"}}>

                                        <Button color="primary">Search</Button>

                                    </NavItem>
                                     <NavItem style={{marginRight: "20px"}}>





                                     </NavItem>
                                    {/*</UncontrolledDropdown>*/}
                                </Nav>
                            </Collapse>
                        </Navbar>

                </Container>
            </div>

            </div>
        );
    }
}