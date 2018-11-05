import React, {Component} from 'react';
import './RolesContainer.css';
import RolesTable from "../roles-table/RolesTable";


class RolesContainer extends Component {

	render() {
		return (
			<div>
				<h1>Rollen</h1>
				<RolesTable/>
				<br/>
				<input type="button" value="Rolle hinzufügen"/>
			</div>
		);
	}
}

export default RolesContainer;