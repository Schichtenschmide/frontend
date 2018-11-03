import React, {Component} from 'react';
import {Roles} from "../../models/Roles";
 


class RolesTable extends Component {

	render() {

		function RolesList(props) {
			const roles = props.roles;
			const listItems = roles.map((role) =>
				<tr><td key={Math.random()}>{role}</td></tr>
			);
			return (
				<table>{listItems}</table>
			);
		}

		const theRoles = new Roles();

		const element = (
			<RolesList roles={theRoles.currentRoles}/>
		);

		return (
			element
		);
	}
}

export default RolesTable;