import React, {Component} from "react";
import EmployeeDeactivate from "../employee-deactivate/EmployeeDeactivate";
import axios from 'axios';
import {baseUrlForTheBackend} from "../../../constants";
import EmployeeEdit from "../employee-edit/EmployeeEdit";
import icons from "glyphicons";

class EmployeeTable extends Component {
	constructor(props) {
		super(props);

		this.state = {
			employeeData: []
		};
	}

	componentDidMount() {
		axios
			.get(baseUrlForTheBackend + '/employees')
			.then(({data}) => {
				this.setState({
					employeeData: data
				});
			})
			.catch((err) => {
			})
	}

	render() {
		const listItems = this.state.employeeData.map((el, index) => (

			<tr key={index}>
				<td> {el.isActive ? icons.checkHeavy : icons.crossHeavy} </td>
				<td  >{el.firstName}</td>
				<td  >{el.lastName}</td>
				<td>{el.employmentRate} </td>
				<td>{el.role.name}</td>
				<td>
					<span id="edit" className="glyphicon glyphicon-pencil">
						<EmployeeEdit
							employeeId={el.stid}
							firstName={el.firstName}
							lastName={el.lastName}
							employmentRate={el.employmentRate}
							isActive={el.isActive}
							roleId={el.role.stid}
						/>
					</span>
				</td>
				<td>
					<span id="delete" className="glyphicon glyphicon-trash">
						<EmployeeDeactivate employeeId={el.stid}
											firstName={el.firstName}
											lastName={el.lastName}
											isEmployeeActive={el.isActive}
											buttonTitle={el.isActive === true ? ('deaktivieren') : ('aktivieren')}
											roleId={el.role.stid}
						/>
					</span>
				</td>
			</tr>

		));

		return <div className="EmployeeTable">
			<table className="table">
				<thead className="thead-light">
				<tr>
					<th scope="col">Aktiv</th>
					<th scope="col">Vorname</th>
					<th scope="col">Nachname</th>
					<th scope="col">Stellenprozent</th>
					<th scope="col">Rolle</th>
					<th scope="col"/>
					<th scope="col"/>
				</tr>
				</thead>
				<tbody>
				{listItems}
				</tbody>
			</table>
		</div>
			;
	}
}

export default EmployeeTable;
