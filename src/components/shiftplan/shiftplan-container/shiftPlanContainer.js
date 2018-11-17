import React, {Component} from 'react';
import ShiftPlanCreate from "../shiftplan-create/ShiftPlanCreate";
import ShiftPlanTable from "../shiftplan-table/ShiftPlanTable";


class ShiftPlanContainer extends Component {

	render() {
		return (
			<div>
				<h1>Wochenplan</h1>
				<ShiftPlanTable/>
				<ShiftPlanCreate/>
			</div>
		);
	}
}

export default ShiftPlanContainer;