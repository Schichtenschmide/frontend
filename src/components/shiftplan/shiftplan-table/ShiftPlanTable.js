import React, {Component} from "react";
import axios from 'axios';
import {baseUrlForTheBackend} from "../../../constants";
import ShiftPlanAddEmployee from "../shiftplan-addEmployee/shiftplanAddEmployee";

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
		const listItems = this.state.shiftPlanData.map((el, index) => (
			<tr key={index}>
				<td style={el.isActive === false ? ({textDecoration: 'line-through'}) : ({})}>{el.shift.name}</td>
				<td style={el.isActive === false ? ({textDecoration: 'line-through'}) : ({})}>{el.shift.startTime}</td>
				<td style={el.isActive === false ? ({textDecoration: 'line-through'}) : ({})}>{el.shift.endTime}</td>
				<td style={el.isActive === false ? ({textDecoration: 'line-through'}) : ({})}>{el.weekNumber}</td>
				<td style={el.isActive === false ? ({textDecoration: 'line-through'}) : ({})}>{el.year}</td>
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
					/>
				</td>
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
					<th scope="col">Name</th>
					<th scope="col">Start</th>
					<th scope="col">Ende</th>
					<th scope="col">Wochennummer</th>
					<th scope="col">Jahr</th>
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
