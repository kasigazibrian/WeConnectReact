import React from 'react';
import logo from '../../images/logo.png';
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
            isAuthenticated: this.props.auth
        };
    }




    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
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
                        <DropdownItem tag={"a"} href="authuser/userprofile">
                            User Profile
                        </DropdownItem>
                    </DropdownMenu>;
        let auth_nav = this.state.isAuthenticated ? authBtns : unauthBtns;
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/"><img src={logo} alt="We Connect!" height="42px" width="42px"/></NavbarBrand>
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