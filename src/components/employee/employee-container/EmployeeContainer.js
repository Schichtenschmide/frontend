import React, {Component} from 'react';

import EmployeeCreateDialog from "../employee-create-dialog/EmployeeCreateDialog";
import EmployeeTable from "../employee-table/EmployeeTable";
import axios from "axios";
import {baseUrlForTheBackend} from "../../../constants";


class EmployeeContainer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			employees: []
		};

	};

	fetchEmployees = () => {
		axios
			.get(baseUrlForTheBackend + '/employees')
			.then(({data}) => {
				this.setState({
					employees: data
				});
			})
			.catch((err) => {
			})
	};

	componentDidMount() {
		this.fetchEmployees()
	};

	render() {
		return (
			<div className="EmployeeContainer">
				<h1>Mitarbeiter</h1>
				<EmployeeTable onDataSubmit={this.fetchEmployees} employees={this.state.employees}/>
				<EmployeeCreateDialog onDataSubmit={this.fetchEmployees}/>
			</div>

		);
	}
}

export default EmployeeContainer;
