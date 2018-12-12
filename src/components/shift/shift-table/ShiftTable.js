import React, {Component} from "react";
import {baseUrlForTheBackend} from "../../../constants";
import axios from 'axios';
import ShiftEdit from "../shift-edit/ShiftEdit";
import ShiftDeactivate from "../shift-deactivate/ShiftDeactivate";


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
				<td style={el.isActive === false ? ({textDecoration: 'line-through'}) : ({})}>{el.name}</td>
				<td style={el.isActive === false ? ({textDecoration: 'line-through'}) : ({})}>{el.startTime}</td>
				<td style={el.isActive === false ? ({textDecoration: 'line-through'}) : ({})}>{el.endTime}</td>
				<td style={el.isActive === false ? ({textDecoration: 'line-through'}) : ({})}>{el.employeeCount}</td>
				<td style={el.isActive === false ? ({textDecoration: 'line-through'}) : ({})}>{el.role.name}</td>
				<td style={el.isActive === false ? ({textDecoration: 'line-through'}) : ({})}>{el.isMonday ? 'Mo ' : ''}{el.isTuesday ? 'Di ' : ''}{el.isWednesday ? 'Mi ' : ''} {el.isThursday ? 'Do ' : ''} {el.isFriday ? 'Fr ' : ''}{el.isSaturday ? 'Sa ' : ''}{el.isSunday ? 'So ' : ''}</td>
				<td>
					<span id="edit" className="glyphicon glyphicon-pencil">
						<ShiftEdit
							shiftId={el.stid}
							name={el.name}
							startTime={el.startTime}
							endTime={el.endTime}
							shorthand={el.shorthand}
							employeeCount={el.employeeCount}
							isActive={el.isActive}
							isMonday={el.isMonday}
							isTuesday={el.isTuesday}
							isWednesday={el.isWednesday}
							isThursday={el.isThursday}
							isFriday={el.isFriday}
							isSaturday={el.isSaturday}
							isSunday={el.isSunday}
							roleId={el.role.stid}
						/>
					</span>
				</td>
				<td>
					<span id="delete" className="glyphicon glyphicon-trash">
						<ShiftDeactivate
							shiftId={el.stid}
							name={el.name}
							startTime={el.startTime}
							endTime={el.endTime}
							shorthand={el.shorthand}
							employeeCount={el.employeeCount}
							isActive={el.isActive}
							isMonday={el.isMonday}
							isTuesday={el.isTuesday}
							isWednesday={el.isWednesday}
							isThursday={el.isThursday}
							isFriday={el.isFriday}
							isSaturday={el.isSaturday}
							isSunday={el.isSunday}
							roleId={el.role.stid}
						/>
					</span>
				</td>
			</tr>
		);

		return <table className="table">
			<thead className="thead-light">
			<tr>
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

