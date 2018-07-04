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
    DropdownToggle } from 'reactstrap';
import AuthButtons from './AuthButtons';
import UnauthButtons from './UnauthButtons';
import BriefCase from 'react-icons/lib/fa/briefcase';
import Search from 'react-icons/lib/fa/search';
import Account from 'react-icons/lib/fa/user';

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
        let navBarButtons = this.state.isAuthenticated ? <AuthButtons/> : <UnauthButtons/>;
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/"><img src={logo} alt="We Connect!" height="42px" width="42px"/>We Connect!</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav  navbar>
                            <NavItem>
                                <NavLink href="/businesses"><BriefCase style={{marginBottom: "1px"}}/> Businesses</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/search"><Search style={{marginBottom: "2px"}}/> Search</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar >
                                <DropdownToggle nav caret>
                                    <Account style={{marginBottom: "1px"}}/>  Account 
                                </DropdownToggle>
                                {navBarButtons}
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}