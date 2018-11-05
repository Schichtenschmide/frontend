import React, {Component} from 'react';
import {Roles} from "../../models/Roles";
import "./RolesTable.css"


class RolesTable extends Component {
	roles;

	render() {

		function RolesList(props) {
			const roles = props.roles;
			let i = 0;
			const listItems = roles.map((role) =>
				<tr><td key={i++}>{role}</td></tr>
			);
			return (
				<table>
					<thead><tr><td key={'#'}>Rolle</td></tr></thead>
					<tbody>{listItems}</tbody>
				</table>
			);
		}

		const theRoles = new Roles();

		const element = (
			<RolesList roles={theRoles.roleList}/>
		);

		return (
			element
		);
	}
}

export default RolesTable;