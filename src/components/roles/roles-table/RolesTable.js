import React, {Component} from 'react';
import axios from 'axios';
import {baseUrlForTheBackend} from "../../../constants";
import RolesEdit from "../roles-edit/RolesEdit";
import RolesDeactivate from "../roles-deactivate/RolesDeactivate";


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
			})
	}

	render() {

		const listItems = this.state.roleData.map((el, index) =>
			<tr key={index}>
				<td><span style={el.isActive === false ? ({textDecoration: 'line-through'}) : ({})}>{el.name}</span></td>
				<td>
					<span id="edit" className="glyphicon glyphicon-pencil">
						<RolesEdit
							roleName={el.name}
							roleId={el.stid}
							roleActive={el.isActive}
						/>
					</span>
				</td>
				<td>
					<span id="delete" className="glyphicon glyphicon-trash">
						<RolesDeactivate
							roleName={el.name}
							roleId={el.stid}
							roleActive={el.isActive}
							title={el.isActive === true ? ('deaktivieren') : ('aktivieren')}
						/>
					</span>
				</td>
			</tr>
		);
		console.log(this.state.roleData);
		return <table className="table">
			<thead className="thead-light">
			<tr>
				<th scope="col">Rolle</th>
				<th scope="col">&nbsp;</th>
				<th scope="col">&nbsp;</th>
			</tr>
			</thead>
			<tbody>
			{listItems}
			</tbody>
		</table>


	}
}

export default RolesTable;
