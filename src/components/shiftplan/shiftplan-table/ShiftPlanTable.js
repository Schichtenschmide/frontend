import React, {Component} from "react";
import axios from 'axios';
import {baseUrlForTheBackend} from "../../../constants";

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
			})
	}

	render() {
		const listItems = this.state.shiftPlanData.map((el, index) => (
			<tr key={index}>
				<td>{el.shift.name}</td>
				<td>{el.shift.startTime}</td>
				<td>{el.shift.endTime}</td>
				<td style={el.isActive === false ? ({textDecoration: 'line-through'}) : ({})}>{el.weekNumber}</td>
				<td style={el.isActive === false ? ({textDecoration: 'line-through'}) : ({})}>{el.year}</td>
			</tr>
		));

		return <div className="ShiftPlanTable">
			<table className="table">
				<thead className="thead-light">
				<tr>
					<th scope="col">Name</th>
					<th scope="col">Start</th>
					<th scope="col">Ende</th>
					<th scope="col">Wochennummer</th>
					<th scope="col">Jahr</th>
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
