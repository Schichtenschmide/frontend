import React, {Component} from 'react';
import {RoleModel} from "../../../models/DefaultRoleModel";
import axios from 'axios';
import {baseUrlForTheBackend} from "../../../constants";


class RolesTable extends Component {
	roles;

	render() {

		function getStarWarsAPI() {
			return axios.get('https://swapi.co/api/people/1')
				.then(function (response) {
					// handle success
					console.log(response.data.name);
					console.log(response);
				})
				.catch(function (error) {
					// handle error
					console.log(error);
				});
		}

		function RolesList(props) {
			const roles = props.roles;
			axios.get( baseUrlForTheBackend + '/roles')
				.then(function (response) {
				// handle success
				console.log(response);
			})
				.catch(function (error) {
					// handle error
					console.log(error);
				});
			const listItems = roles.map((role) =>
				<tr  key={role}>
					<td>{role}</td>
					<td><span className="glyphicon glyphicon-pencil">bearbeiten</span></td>
					<td><span className="glyphicon glyphicon-trash">löschen</span></td>
				</tr>
			);
			return (
				<table className="table">
					<thead className="thead-light">
					<tr>
						<th scope="col">Rolle</th>
						<th scope="col"></th>
						<th scope="col"></th>
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