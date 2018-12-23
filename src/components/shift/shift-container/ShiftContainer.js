import React, {Component} from "react";
import ShiftCreate from "../shift-create/ShiftCreate";
import ShiftTable from "../shift-table/ShiftTable";
import axios from "axios";
import {baseUrlForTheBackend} from "../../../constants";


class ShiftContainer extends Component{

	constructor(props) {
		super(props);

		this.state = {
			shifts: []
		};

	};

	fetchShifts = () => {
		axios
			.get(baseUrlForTheBackend + '/shifts')
			.then(({data}) => {
				this.setState({
					shifts: data
				});
			})
			.catch((err) => {
			})
	};

	componentDidMount() {
		this.fetchShifts()
	};

	render() {
		return (
			<div>
				<h1>Schichten</h1>
				<ShiftTable onDataSubmit={this.fetchShifts} shifts={this.state.shifts}/>
				<ShiftCreate onDataSubmit={this.fetchShifts}/>
			</div>
		);
	}
}

export default ShiftContainer;