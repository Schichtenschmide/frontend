import React, {Component} from 'react';
import axios from 'axios';
import {baseUrlForTheBackend} from "../../../constants";
import RolesEdit from "../roles-edit/RolesEdit";
import RolesDeactivate from "../roles-deactivate/RolesDeactivate";
import icons from "glyphicons";


class RolesTable extends Component {

	constructor(props) {
		super(props);

		this.state = {
			roleData: []
		};
	}

	componentDidMount() {
		axios
			.get(baseUrlForTheBackend + '/roles')
			.then(({data}) => {
				this.setState({
					roleData: data
				});
			})
			.catch((err) => {
				console.log(err);
			})
	}

	//
	render() {
		const listItems = this.state.roleData.map((el, index) =>
			<tr key={index}>
				<td> {el.isActive ? icons.checkHeavy : icons.crossHeavy} </td>
				<td> {el.name} </td>
				<td>
					<RolesEdit
						roleName={el.name}
						roleId={el.stid}
						roleIsActive={el.isActive}
					/>
				</td>
				<td>
					<RolesDeactivate
						roleName={el.name}
						roleId={el.stid}
						roleIsActive={el.isActive}
						title={el.isActive === true ? ('deaktivieren') : ('aktivieren')}
					/>
				</td>
			</tr>
		);

		return (
			<table className="table">
				<thead className="thead-light">
				<tr>
					<th scope="col">Aktiv</th>
					<th scope="col">Rolle</th>
					<th scope="col"/>
					<th scope="col"/>
				</tr>
				</thead>
				<tbody>
				{listItems}
				</tbody>
			</table>
		)
	}
}

export default RolesTable;
