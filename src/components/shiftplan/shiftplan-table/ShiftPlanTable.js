import React, {Component} from "react";
import axios from 'axios';
import {baseUrlForTheBackend} from "../../../constants";
import ShiftPlanAddEmployee from "../shiftplan-addEmployee/shiftplanAddEmployee";
import icons from 'glyphicons';
import ShiftPlanEdit from "../shiftplan-edit/ShiftPlanEdit";

class ShiftPlanTable extends Component {

	constructor(props) {
		super(props);

		this.state = {
			shiftPlanData: []
		};
	}

	componentDidMount() {
		axios
			.get(baseUrlForTheBackend + '/shiftplans')
			.then(({data}) => {
				this.setState({
					shiftPlanData: data
				});
			})
			.catch((err) => {
				console.log(err);
			})
	}

	render() {
		//TODO add a "Tab" that filters the diffrent roles. or Dropdown?
		const listItems = this.state.shiftPlanData.map((el, index) => (
			<tr key={index}>
				<td> {el.isActive ? icons.checkHeavy : icons.crossHeavy} </td>
				<td>{el.shift.name}</td>
				<td>{el.shift.startTime < 10 ? '0' + el.shift.startTime + ':00' : el.shift.startTime + ':00'}</td>
				<td>{el.shift.endTime < 10 ? '0' + el.shift.endTime + ':00' : el.shift.endTime + ':00'}</td>
				<td>{el.weekNumber}</td>
				<td>{el.year}</td>
				<td>
					<ShiftPlanAddEmployee
						shiftName={el.shift.name}
						shiftStartTime={el.shift.startTime}
						shiftEndTime={el.shift.endTime}
						shiftPlanId={el.stid}
						shiftId={el.shiftId}
						weekNumber={el.weekNumber}
						year={el.year}
						isActive={el.isActive}
						employees={el.employees}
					/>
				</td>
				<td><ShiftPlanEdit/></td>
			</tr>
		));

		/*
			roleId: this.props.roleId,
			employeeId: this.props.employeeId
		*/

		return <div className="ShiftPlanTable">
			<table className="table">
				<thead className="thead-light">
				<tr>
					<th scope="col">Aktiv</th>
					<th scope="col">Name</th>
					<th scope="col">Start</th>
					<th scope="col">Ende</th>
					<th scope="col">Wochennummer</th>
					<th scope="col">Jahr</th>
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

export default ShiftPlanTable;
