import React, {Component} from 'react';
import RolesTable from "../roles-table/RolesTable";
import RolesCreate from "../roles-create/RolesCreate";
import axios from "axios";
import {baseUrlForTheBackend} from "../../../constants";



class RolesContainer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			roles: []
		};

	};

	fetchRoles = () => {
		axios
			.get(baseUrlForTheBackend + '/roles')
			.then(({data}) => {
				this.setState({
					roles: data
				});
			})
			.catch((err) => {
			})
	};

	componentDidMount() {
		this.fetchRoles()
	};

	render() {
		return (
			<div>
				<h1>Rollen</h1>
				<RolesTable onDataSubmit={this.fetchRoles} roles={this.state.roles} />
				<RolesCreate onDataSubmit={this.fetchRoles} />
			</div>
		);
	}
}

export default RolesContainer;
