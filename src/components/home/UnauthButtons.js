import React from 'react'
import {
	DropdownMenu,
	DropdownItem 
} from 'reactstrap';
import Login from 'react-icons/lib/fa/sign-in';
import Signup from 'react-icons/lib/fa/user-plus'

const UnauthButtons = () => {
	return (
		<DropdownMenu >
			<DropdownItem tag={"a"} href="/login">
				<Login/>	Login 
			</DropdownItem>
			<DropdownItem tag={"a"} href={"/signup"}>
				<Signup/>	Signup 
			</DropdownItem>
	  </DropdownMenu> 
	);
}

export default UnauthButtons