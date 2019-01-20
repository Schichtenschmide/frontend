import React, {Component} from "react";
import axios from 'axios';
import {baseUrlForTheBackend} from "../../../constants";
import ShiftPlanAddEmployee from "../shiftplan-addEmployee/shiftplanAddEmployee";
import icons from 'glyphicons';
import DailyScheduleEdit from "../shiftplan-edit/ShiftPlanEdit";

class ShiftPlanTable extends Component {

	constructor(props) {
		super(props);

		this.state = {
			shifts: [],
			dailyschedules: []

		};
	}

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


	fetchDailyschedules = () => {

		var date = new Date();

		console.log(date);


		axios
			.get(baseUrlForTheBackend + '/dailyschedulesofweek/' + date)
			.then(({data}) => {
				this.setState({
					dailyschedules: data
				});
			})
			.catch((err) => {
			})
	};

    forLoopMonday = (shift) => {
        var row

        row = this.state.dailyschedules.map(function(el, index){
            if (el.shift.name==shift.name) {
                if (shift.isMonday && el.shift.isMonday) {
                    var selectedRowMonday = true;
                } else {
                    var selectedRowMonday = false;
                }
                /*<td>{selectedRowMonday ? el.employees[0].firstName  : 'false' }</td>;*/
                /* <DailyScheduleEdit
                        dailyscheduleId={el.identifier}
                        employeeId={el.employees[0].identifier}
                        onDataSubmit={this.props.onDataSubmit}
                    />*/
                return <td><span id="edit" className="glyphicon glyphicon-pencil">
                    </span></td>;

            } else {
                return;
            }
        });
        return row;
    }
    forLoopTuesday = (shift) => {
        var row

        row = this.state.dailyschedules.map(function(el, index){
            if (el.shift.name==shift.name) {
                if (shift.isTuesday && el.shift.isTuesday) {
                    var selectedRowTuesday = true;
                } else {
                    var selectedRowTuesday = false;
                }
                return <td>{selectedRowTuesday ? 'true' : 'false' }</td>;
            } else {
                return;
            }
        });
        return row;
    }
    forLoopWednesday = (shift) => {
        var row

        row = this.state.dailyschedules.map(function(el, index){
            if (el.shift.name==shift.name) {
                if (shift.isWednesday && el.shift.isWednesday) {
                    var selectedRowWednesday = true;
                } else {
                    var selectedRowWednesday = false;
                }
                return <td>{selectedRowWednesday ? 'true' : 'false' }</td>;
            } else {
                return;
            }
        });
        return row;
    }
    forLoopThursday = (shift) => {
        var row

        row = this.state.dailyschedules.map(function(el, index){
            if (el.shift.name==shift.name) {
                if (shift.isThursday && el.shift.isThursday) {
                    var selectedRowThursday = true;
                } else {
                    var selectedRowThursday = false;
                }
                return <td>{selectedRowThursday ? 'true' : 'false' }</td>;
            } else {
                return;
            }
        });
        return row;
    }
    forLoopFriday = (shift) => {
        var row

        row = this.state.dailyschedules.map(function(el, index){
            if (el.shift.name==shift.name) {
                if (shift.isActive) {
                    var shiftActiveClass='active';
                } else {
                    var shiftActiveClass='inactive';
                }
                if (shift.isFriday && el.shift.isFriday) {
                    var selectedRowFriday = true;
                } else {
                    var selectedRowFriday = false;
                }
                return <td className={shiftActiveClass}>{selectedRowFriday ? 'true' : 'false' }</td>;
            } else {
                return;
            }
        });
        return row;
    }
    forLoopSaturday = (shift) => {
        var row

        row = this.state.dailyschedules.map(function(el, index){
            if (el.shift.name==shift.name) {
                if (shift.isActive) {
                    var shiftActiveClass='active';
                } else {
                    var shiftActiveClass='inactive';
                }
                if (shift.isSaturday && el.shift.isSaturday) {
                    var selectedRowSaturday = true;
                } else {
                    var selectedRowSaturday = false;
                }
                return <td className={shiftActiveClass}>{selectedRowSaturday ? 'true' : 'false' }</td>;
            } else {
                return;
            }
        });
        return row;
    }
    forLoopSunday = (shift) => {
        var row

        row = this.state.dailyschedules.map(function(el, index){
            if (el.shift.name==shift.name) {
                if (shift.isSunday && el.shift.isSunday) {
                    var selectedRowSunday = true;
                    el.employees.getName()
                } else {
                    var selectedRowSunday = false;
                }
                return <td>{selectedRowSunday ? el.employees.getName() : 'false' }</td>;
            }
        });
        return row;
    }

	componentDidMount() {
		this.fetchShifts();
		this.fetchDailyschedules();
	}
    /*<td> {el.isMonday&&el.isMonday==true ? icons.checkHeavy : icons.crossHeavy} </td>
                <td> {el.isTuesday ? icons.checkHeavy : icons.crossHeavy} </td>
                <td> {el.isWednesday ? icons.checkHeavy : icons.crossHeavy} </td>
                <td> {el.isThursday.isActive ? icons.checkHeavy  : icons.crossHeavy} </td>
                <td> {el.isFriday ? icons.checkHeavy : icons.crossHeavy} </td>
                <td> {el.isSaturday ? icons.checkHeavy : icons.crossHeavy} </td>
                <td> {el.isSunday ? icons.checkHeavy : icons.crossHeavy} </td>*/
	render() {

        //TODO add a "Tab" that filters the diffrent roles. or Dropdown?
		const listItems = this.state.shifts.map((el, index) => (

			<tr key={index}>
				<td> {el.isActive ? icons.checkHeavy : icons.crossHeavy} </td>
				<td>{el.name}</td>
				<td>{el.startTime < 10 ? '0' + el.startTime + ':00' : el.startTime + ':00'}</td>
				<td>{el.endTime < 10 ? '0' + el.endTime + ':00' : el.endTime + ':00'}</td>
                {this.forLoopMonday(el)}
                {this.forLoopTuesday(el)}
                {this.forLoopWednesday(el)}
                {this.forLoopThursday(el)}
                {this.forLoopFriday(el)}
                {this.forLoopSaturday(el)}
                {this.forLoopSunday(el)}
			</tr>
		));


		const schedules = this.state.shifts.map((el, index) => (
			<tr key={index}>
				<td> {el.isActive ? icons.checkHeavy : icons.crossHeavy} </td>
				<td>{el.name}</td>
				<td>{el.startTime < 10 ? '0' + el.startTime + ':00' : el.startTime + ':00'}</td>
				<td>{el.endTime < 10 ? '0' + el.endTime + ':00' : el.endTime + ':00'}</td>
				<td> {el.isMonday ? icons.checkHeavy : icons.crossHeavy} </td>
				<td> {el.isTuesday ? icons.checkHeavy : icons.crossHeavy} </td>
				<td> {el.isWednesday ? icons.checkHeavy : icons.crossHeavy} </td>
				<td> {el.isThursday.isActive ? icons.checkHeavy : icons.crossHeavy} </td>
				<td> {el.isFriday ? icons.checkHeavy : icons.crossHeavy} </td>
				<td> {el.isSaturday ? icons.checkHeavy : icons.crossHeavy} </td>
				<td> {el.isSunday ? icons.checkHeavy : icons.crossHeavy} </td>
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
					<th scope="col">Aktiv</th>
					<th scope="col">Name</th>
					<th scope="col">Start</th>
					<th scope="col">Ende</th>
					<th scope="col">Mo.</th>
					<th scope="col">Di.</th>
					<th scope="col">Mi.</th>
					<th scope="col">Do.</th>
					<th scope="col">Fr.</th>
					<th scope="col">Sa.</th>
					<th scope="col">So.</th>
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
