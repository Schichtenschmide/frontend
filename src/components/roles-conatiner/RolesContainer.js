import React, {Component} from 'react';
import './RolesContainer.css';
import RolesTable from "../roles-table/RolesTable";
import RolesCreate from "../roles-create/RolesCreate";


class RolesContainer extends Component {

	render() {
		return (
			<div>
				<h1>Rollen</h1>
				<RolesTable/>
				<br/>
				<button className="btn btn-primary"> Rolle hinzufügen</button>
				<hr/>
				<div>'RolesCreate'</div>
				<RolesCreate/>
			</div>
		);
	}
}

export default RolesContainer;