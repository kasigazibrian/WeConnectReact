import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

export default class NavigationBar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            is_authenticated: this.props.auth
        };
    }




    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentWillMount(){
        // this.setState({is_authenticated: this.props.getAuth()})
        console.log(this.state.is_authenticated)
    }

    render() {
        let unauthBtns = <DropdownMenu >
                            <DropdownItem tag={"a"} href="/login">
                                Login
                            </DropdownItem>
                            <DropdownItem tag={"a"} href={"/signup"}>
                                Signup
                            </DropdownItem>
                        </DropdownMenu>;
        let authBtns = <DropdownMenu >
                        <DropdownItem tag={"a"} href="/logout">
                            Logout
                        </DropdownItem>
                        <DropdownItem tag={"a"} href="/register">
                            Register Business
                        </DropdownItem>
                        <DropdownItem tag={"a"} href="/reset_password">
                            Reset Password
                        </DropdownItem>
                    </DropdownMenu>;
        let auth_nav = this.state.is_authenticated ? authBtns : unauthBtns;
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/">We Connect!</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav  navbar>
                            <NavItem>
                                <NavLink href="/businesses">Businesses</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/search">Search</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar >
                                <DropdownToggle nav caret>
                                    Account
                                </DropdownToggle>
                                {auth_nav}
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}