import React, {Component} from "react";
import ShiftCreate from "../shift-create/ShiftCreate";


class ShiftContainer extends Component{
	render() {
		return (
			<div>
				<h1>Schichten</h1>
				<ShiftCreate/>
			</div>
		);
	}
}

export default ShiftContainer;