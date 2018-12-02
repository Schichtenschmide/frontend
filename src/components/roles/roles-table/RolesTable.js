import React, {Component} from 'react';
import axios from 'axios';
import {baseUrlForTheBackend} from "../../../constants";
import RolesEdit from "../roles-edit/RolesEdit";


class RolesTable extends Component {

	constructor(props) {
		super(props);

		this.state = {
			roleData:[]
		};
	}

	componentDidMount(){
		axios
			.get(baseUrlForTheBackend + '/roles')
			.then(({ data })=> {
				this.setState({
					roleData: data
				});
			})
			.catch((err)=> {})
	}

	render() {

		const listItems = this.state.roleData.map((el,index) =>
			<tr  key={index}>
				<td>{el.name}</td>
				<td><span id="edit" className="glyphicon glyphicon-pencil"><RolesEdit roleName={el.name} roleId={el.stid}/></span></td>
				<td><span id ="delete" className="glyphicon glyphicon-trash"><a href={el.links[0].href} >l&ouml;schen</a></span></td>
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
