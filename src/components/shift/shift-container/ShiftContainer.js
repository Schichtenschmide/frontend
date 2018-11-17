import React, {Component} from "react";
import ShiftCreate from "../shift-create/ShiftCreate";
import ShiftTable from "../shift-table/ShiftTable";


class ShiftContainer extends Component{
	render() {
		return (
			<div>
				<h1>Schichten</h1>
				<ShiftTable/>
				<ShiftCreate/>
			</div>
		);
	}
}

export default ShiftContainer;