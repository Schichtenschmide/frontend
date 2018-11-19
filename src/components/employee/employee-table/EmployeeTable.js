import React, {Component} from "react";
import EmployeeDeleteDialog from "../employee-delete-dialog/EmployeeDeleteDialog";

class EmployeeTable extends Component{
	render(){
		return(

			//TODO implement employee table
			<div className="EmployeeTable">

				<table className="table">
					<thead className="thead-light">
					<tr>
						<th scope="col">Vorname</th>
						<th scope="col">Nachname</th>
						<th scope="col">Rolle</th>
						<th scope="col"></th>
					</tr>
					</thead>
					<tbody>
					<tr><td>Walter</td><td>Red</td><td>Koch</td><td><EmployeeDeleteDialog firstName={'Walter'} lastName={'Red'} id={1}/></td></tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default EmployeeTable;