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
			shifts: [],
			dailyschedules: []

		};
	}

	fetchShifts = () => {
		axios
			.get(baseUrlForTheBackend + '/shifts2')
			.then(({data}) => {
				this.setState({
					shifts: data
				});
			})
			.catch((err) => {
			})
	};


	fetchDailyschedules = () => {

		var date = new Date();

		console.log(date);


		axios
			.get(baseUrlForTheBackend + '/dailyschedulesofweek/' + date)
			.then(({data}) => {
				this.setState({
					dailyschedules: data
				});
			})
			.catch((err) => {
			})
	};



	componentDidMount() {
		this.fetchShifts();
		this.fetchDailyschedules();
	}

	render() {
		//TODO add a "Tab" that filters the diffrent roles. or Dropdown?
		const listItems = this.state.shifts.map((el, index) => (
			<tr key={index}>
				<td> {el.isActive ? icons.checkHeavy : icons.crossHeavy} </td>
				<td>{el.name}</td>
				<td>{el.startTime < 10 ? '0' + el.startTime + ':00' : el.startTime + ':00'}</td>
				<td>{el.endTime < 10 ? '0' + el.endTime + ':00' : el.endTime + ':00'}</td>
				<td> {el.isMonday ? icons.checkHeavy : icons.crossHeavy} </td>
				<td> {el.isTuesday ? icons.checkHeavy : icons.crossHeavy} </td>
				<td> {el.isWednesday ? icons.checkHeavy : icons.crossHeavy} </td>
				<td> {el.isThursday.isActive ? icons.checkHeavy : icons.crossHeavy} </td>
				<td> {el.isFriday ? icons.checkHeavy : icons.crossHeavy} </td>
				<td> {el.isSaturday ? icons.checkHeavy : icons.crossHeavy} </td>
				<td> {el.isSunday ? icons.checkHeavy : icons.crossHeavy} </td>
			</tr>
		));


		const schedules = this.state.shifts.map((el, index) => (
			<tr key={index}>
				<td> {el.isActive ? icons.checkHeavy : icons.crossHeavy} </td>
				<td>{el.name}</td>
				<td>{el.startTime < 10 ? '0' + el.startTime + ':00' : el.startTime + ':00'}</td>
				<td>{el.endTime < 10 ? '0' + el.endTime + ':00' : el.endTime + ':00'}</td>
				<td> {el.isMonday ? icons.checkHeavy : icons.crossHeavy} </td>
				<td> {el.isTuesday ? icons.checkHeavy : icons.crossHeavy} </td>
				<td> {el.isWednesday ? icons.checkHeavy : icons.crossHeavy} </td>
				<td> {el.isThursday.isActive ? icons.checkHeavy : icons.crossHeavy} </td>
				<td> {el.isFriday ? icons.checkHeavy : icons.crossHeavy} </td>
				<td> {el.isSaturday ? icons.checkHeavy : icons.crossHeavy} </td>
				<td> {el.isSunday ? icons.checkHeavy : icons.crossHeavy} </td>
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
					<th scope="col">Mo.</th>
					<th scope="col">Di.</th>
					<th scope="col">Mi.</th>
					<th scope="col">Do.</th>
					<th scope="col">Fr.</th>
					<th scope="col">Sa.</th>
					<th scope="col">So.</th>
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
