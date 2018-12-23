import React, {Component} from "react";
import EmployeeDeactivate from "../employee-deactivate/EmployeeDeactivate";
import EmployeeEdit from "../employee-edit/EmployeeEdit";
import icons from "glyphicons";

class EmployeeTable extends Component {

	render() {
		const listItems = this.props.employees.map((el, index) => (

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
							onDataSubmit={this.props.onDataSubmit}
						/>
					</span>
				</td>
				<td>
					<span id="delete" className="glyphicon glyphicon-trash">
						<EmployeeDeactivate employeeId={el.stid}
											firstName={el.firstName}
											lastName={el.lastName}
											employmentRate={el.employmentRate}
											isActive={el.isActive}
											buttonTitle={el.isActive === true ? ('deaktivieren') : ('aktivieren')}
											roleId={el.role.stid}
											onDataSubmit={this.props.onDataSubmit}
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
