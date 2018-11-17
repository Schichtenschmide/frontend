import React, {Component} from 'react';
import ShiftPlanCreate from "../shiftplan-create/ShiftPlanCreate";


class ShiftPlanContainer extends Component {

	render() {
		return (
			<div>
				<h1>Wochenplan</h1>
				<ShiftPlanCreate/>
			</div>
		);
	}
}

export default ShiftPlanContainer;