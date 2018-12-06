import React, {Component} from "react";
import EmployeeDeactivate from "../employee-deactivate/EmployeeDeactivate";
import axios from 'axios';
import {baseUrlForTheBackend} from "../../../constants";
import EmployeeEdit from "../employee-edit/EmployeeEdit";

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
				<td style={el.active === false ? ({textDecoration: 'line-through'}) : ({})}>{el.firstName}</td>
				<td style={el.active === false ? ({textDecoration: 'line-through'}) : ({})}>{el.lastName}</td>
				<td>{el.employmentRate} </td>
				<td>
					<span id="edit" className="glyphicon glyphicon-pencil">
						<EmployeeEdit
							employeeId={el.stid}
							firstName={el.firstName}
							lastName={el.lastName}
							employmentRate={el.employmentRate}
							isActive={el.isActive}
						/>
					</span>
				</td>
				<td>
							<span id="delete" className="glyphicon glyphicon-trash">
								<EmployeeDeactivate id={el.stid}
													firstName={el.firstName}
													lastName={el.lastName}
													isEmployeeActive={el.isActive}
													buttonTitle={el.active === true ? ('deaktivieren') : ('aktivieren')}
								/>
							</span>
				</td>
			</tr>

		));

		/*
					el.active === true ?
				(
					<tr key={index}>
						<td>{el.name}</td>
						<td><span id="edit" className="glyphicon glyphicon-pencil">
							<RolesEdit
								roleName={el.name}
								roleId={el.stid}
								roleActive={el.active}
							/>
						</span>
						</td>
						<td>
							<span id="delete" className="glyphicon glyphicon-trash">
								<RolesDeactivate
									roleName={el.name}
									roleId={el.stid}
									roleActive={el.active}
									title={'deaktivieren'}
								/>
							</span>
						</td>
					</tr>
				)
				:
				(
					<tr key={index}>
						<td><span style={{textDecoration: 'line-through'}}>{el.name}</span></td>
						<td>
							<span id="edit" className="glyphicon glyphicon-pencil">
								<RolesEdit
									roleName={el.name}
									roleId={el.stid}
									roleActive={el.active}
								/>
							</span>
						</td>
						<td>
							<span id="delete" className="glyphicon glyphicon-trash">
								<RolesDeactivate
									roleName={el.name}
									roleId={el.stid}
									roleActive={el.active}
									title={'aktivieren'}
								/>
							</span>
						</td>
					</tr>
				)
		);
		* */

		return <div className="EmployeeTable">
			<table className="table">
				<thead className="thead-light">
				<tr>
					<th scope="col">Vorname</th>
					<th scope="col">Nachname</th>
					<th scope="col">%</th>
					<th scope="col"> </th>
					<th scope="col"> </th>
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

/*

	render() {

		const listItems = this.state.roleData.map((el, index) =>
			el.active === true ?
				(
					<tr key={index}>
						<td>{el.name}</td>
						<td><span id="edit" className="glyphicon glyphicon-pencil">
							<RolesEdit
								roleName={el.name}
								roleId={el.stid}
								roleActive={el.active}
							/>
						</span>
						</td>
						<td>
							<span id="delete" className="glyphicon glyphicon-trash">
								<RolesDeactivate
									roleName={el.name}
									roleId={el.stid}
									roleActive={el.active}
									title={'deaktivieren'}
								/>
							</span>
						</td>
					</tr>
				)
				:
				(
					<tr key={index}>
						<td><span style={{textDecoration: 'line-through'}}>{el.name}</span></td>
						<td>
							<span id="edit" className="glyphicon glyphicon-pencil">
								<RolesEdit
									roleName={el.name}
									roleId={el.stid}
									roleActive={el.active}
								/>
							</span>
						</td>
						<td>
							<span id="delete" className="glyphicon glyphicon-trash">
								<RolesDeactivate
									roleName={el.name}
									roleId={el.stid}
									roleActive={el.active}
									title={'aktivieren'}
								/>
							</span>
						</td>
					</tr>
				)
		);
	}
* */