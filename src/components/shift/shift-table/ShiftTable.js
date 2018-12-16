import React, {Component} from "react";
import {baseUrlForTheBackend} from "../../../constants";
import axios from 'axios';
import ShiftEdit from "../shift-edit/ShiftEdit";
import ShiftDeactivate from "../shift-deactivate/ShiftDeactivate";
import icons from "glyphicons";


class ShiftTable extends Component {
	constructor(props) {
		super(props);

		this.state = {
			shiftData: []
		};
	}

	componentDidMount() {
		axios
			.get(baseUrlForTheBackend + '/shifts')
			.then(({data}) => {
				this.setState({
					shiftData: data
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}


	render() {
		const listItems = this.state.shiftData.map((el, index) =>
			<tr key={index}>
				<td> {el.isActive ? icons.checkHeavy : icons.crossHeavy} </td>
				<td>{el.name}</td>
				<td>{el.startTime < 10 ? '0'+el.startTime+':00': el.startTime+':00' }</td>
				<td>{el.endTime < 10 ? '0'+el.endTime+':00': el.endTime+':00' }</td> 
				<td>{el.employeeCount}</td>
				<td>{el.role.name}</td>
				<td>{el.isMonday ? 'Mo ' : ''}{el.isTuesday ? 'Di ' : ''}{el.isWednesday ? 'Mi ' : ''} {el.isThursday ? 'Do ' : ''} {el.isFriday ? 'Fr ' : ''}{el.isSaturday ? 'Sa ' : ''}{el.isSunday ? 'So ' : ''}</td>
				<td>
					<ShiftEdit
						shiftId={el.stid}
						name={el.name}
						startTime={el.startTime}
						endTime={el.endTime}
						shorthand={el.shorthand}
						employeeCount={el.employeeCount}
						shiftIsActive={el.isActive}
						isMonday={el.isMonday}
						isTuesday={el.isTuesday}
						isWednesday={el.isWednesday}
						isThursday={el.isThursday}
						isFriday={el.isFriday}
						isSaturday={el.isSaturday}
						isSunday={el.isSunday}
						roleId={el.role.stid}
					/>
				</td>
				<td>
					<ShiftDeactivate
						shiftId={el.stid}
						name={el.name}
						startTime={el.startTime}
						endTime={el.endTime}
						shorthand={el.shorthand}
						employeeCount={el.employeeCount}
						shiftIsActive={el.isActive}
						isMonday={el.isMonday}
						isTuesday={el.isTuesday}
						isWednesday={el.isWednesday}
						isThursday={el.isThursday}
						isFriday={el.isFriday}
						isSaturday={el.isSaturday}
						isSunday={el.isSunday}
						roleId={el.role.stid}
					/>
				</td>
			</tr>
		);

		return <table className="table">
			<thead className="thead-light">
			<tr>
				<th scope="col">Aktiv</th>
				<th scope="col">Schicht</th>
				<th scope="col">Beginn</th>
				<th scope="col">Ende</th>
				<th scope="col">Mitarbeiter</th>
				<th scope="col">Rolle</th>
				<th scope="col">Wochentage</th>
				<th scope="col"/>
				<th scope="col"/>

			</tr>
			</thead>
			<tbody>
			{listItems}
			</tbody>
		</table>
	}

}

export default ShiftTable;

