import React from 'react'
import {
		DropdownMenu,
		DropdownItem 
	} from 'reactstrap';
	import SignOut from 'react-icons/lib/fa/sign-out';
	import BriefCase from 'react-icons/lib/fa/briefcase';
	import User from 'react-icons/lib/fa/user-md'

const AuthButtons = ()=>{
	return (
		<DropdownMenu >
				<DropdownItem tag={"a"} href="/logout">
				<SignOut/>	Logout 
				</DropdownItem>
				<DropdownItem tag={"a"} href="/register">
				<BriefCase/>	Register Business 
				</DropdownItem>
				<DropdownItem tag={"a"} href="/authuser/userprofile">
				<User/>	User Profile 
				</DropdownItem>
		</DropdownMenu>);
}
export default AuthButtons