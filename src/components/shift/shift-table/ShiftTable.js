import React, {Component} from "react";
import {baseUrlForTheBackend} from "../../../constants";
import axios from 'axios';


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
		/*
		employeeCount: 1
endTime: 2400
friday: false
isFriday: false
isMonday: false
isSaturday: false
isSunday: false
isThursday: false
isTuesday: false
isWednesday: false
links: [{rel: "self", href: "http://localhost:8080/shifts/3"},…]
monday: false
name: "Nacht"
saturday: false
shorthand: "ns"
startTime: 2300
stid: 3
sunday: false
thursday: false
tuesday: false
wednesday: false
		* */
		const listItems = this.state.shiftData.map((el, index) =>
			<tr key={index}>
				<td><span style={el.active === false ? ({textDecoration: 'line-through'}) : ({})}>{el.name}</span></td>
				<td>{el.startTime}</td>
				<td>{el.endTime}</td>
				<td>{el.employeeCount}</td>
				<td>{el.isMonday  ? 'Mo ':''}{el.isTuesday ? 'Di ':''}{el.isWednesday ? 'Mi ':''} {el.isThursday ? 'Do ':''} {el.isFriday ? 'Fr ':''}{el.isSaturday ? 'Sa ':''}{el.isSunday ? 'So ':''}</td>

				<td>
					<span id="edit" className="glyphicon glyphicon-pencil">
						bearbeiten
					</span>
				</td>
				<td>
					<span id="delete" className="glyphicon glyphicon-trash">
						deaktivieren
					</span>
				</td>
			</tr>
		);

		return <table className="table">
			<thead className="thead-light">
			<tr>
				<th scope="col">Schicht</th>
				<th scope="col">Beginn;</th>
				<th scope="col">Ende</th>
				<th scope="col">Mitarbeiter</th>
				<th scope="col">Wochentage</th>
				<th scope="col"> </th>
				<th scope="col"> </th>

			</tr>
			</thead>
			<tbody>
			{listItems}
			</tbody>
		</table>
	}

}

export default ShiftTable;

