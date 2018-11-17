import React, {Component} from 'react';
import {RoleModel} from "../../models/DefaultRoleModel";
import "./RolesTable.css"
import axios from 'axios';


class RolesTable extends Component {
	roles;

	render() {

		function getStarWarsAPI() {
			return axios.get('https://swapi.co/api/people/1')
				.then(function (response) {
					// handle success
					console.log(response);
				})
				.catch(function (error) {
					// handle error
					console.log(error);
				});
		}

		function RolesList(props) {
			const roles = props.roles;
			const listItems = roles.map((role) =>
				<tr>
					<td key={role.indexOf(role)}>{role}</td>
				</tr>
			);
			return (

				<table className="table">
					<thead className="thead-light">
					<tr>
						<th scope="col">Rolle</th>
					</tr>
					</thead>
					<tbody>
						{listItems}
					</tbody>
				</table>
			);
		}

		const element = (
			<RolesList roles={RoleModel.roleList}/>

		);

		return (

			getStarWarsAPI(),
				element
		);
	}
}

export default RolesTable;