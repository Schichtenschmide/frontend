import React, {Component} from 'react';
import {RoleModel} from "../../models/DefaultRoleModel";
import "./RolesTable.css"


class RolesTable extends Component {
	roles;

	render() {

		function RolesList(props) {
			const roles = props.roles; 
			const listItems = roles.map((role) =>
				<tr><td key={role.indexOf(role)}>{role}</td></tr>
			);
			return (
				<table>
					<thead><tr><td key={'#'}>Rolle</td></tr></thead>
					<tbody>{listItems}</tbody>
				</table>
			);
		}

		const element = (
			<RolesList roles={RoleModel.roleList}/>
		);

		return (
			element
		);
	}
}

export default RolesTable;