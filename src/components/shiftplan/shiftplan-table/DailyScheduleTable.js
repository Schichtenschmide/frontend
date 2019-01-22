import React, {Component} from "react";
import axios from 'axios';
import {baseUrlForTheBackend} from "../../../constants";
import ShiftPlanAddEmployee from "../shiftplan-addEmployee/shiftplanAddEmployee";
import icons from 'glyphicons';
import DailyScheduleManageEmployees from "../shiftplan-edit/DailyScheduleEdit";
import DailyScheduleCreate from "../shiftplan-create/DailyScheduleCreate";

class DailyScheduleTable extends Component {
    getDay=(date, dayOfWeek)=> {
        var day = date.getDay() || 7;
        if( day !== 1 )
            date.setHours(-24 * (day - dayOfWeek));
        /*return date for creation*/
        return date;
    }

    forLoopMonday = (shift) => {
        var cell = false;
        const onDataSubmit = this.props.onDataSubmit;
        this.props.dailyschedules.map(function(el, index){
            var ifTrue="yes";
            if ((el.shift.identifier==shift.identifier)&&(shift.isMonday && el.isMonday)) {
                    var selectedRowMonday = true;
                cell =  <td>'+ ifTrue +'{el.employees[0].firstName}<span id="edit" className="glyphicon glyphicon-pencil"><DailyScheduleManageEmployees
                        dailyscheduleId={el.identifier}
                        employees={el.employees}
                        shift={el.shift}
                        onDataSubmit={onDataSubmit}
                        date={el.date}
                        isActive={el.isActive}
                    /></span></td>;
                }
        });
        if (cell == false) {
            if(shift.isActive) {
                cell = <td><span id="create" className="glyphicon glyphicon-plus"><DailyScheduleCreate
                date={this.getDay(new Date(),1)}/></span></td>;
            } else {
                cell = <td>false </td>;
            }
        }
        return cell;
    }
    forLoopTuesday = (shift) => {
        var cell = false;
        const onDataSubmit = this.props.onDataSubmit;

        this.props.dailyschedules.map(function(el, index){
            if ((el.shift.identifier==shift.identifier) &&(shift.isTuesday && el.isTuesday)) {
                    var selectedRowMonday = true;
                cell =  <td>'+ ifTrue +'{el.employees[0].firstName}<span id="edit" className="glyphicon glyphicon-pencil"><DailyScheduleManageEmployees
                        dailyscheduleId={el.identifier}
                        employees={el.employees}
                        shift={el.shift}
                        onDataSubmit={onDataSubmit}
                        date={el.date}
                        isActive={el.isActive}
                    /></span></td>;
                }
        });
        if (cell == false) {
            if(shift.isActive) {
                cell = <td><span id="create" className="glyphicon glyphicon-plus"><DailyScheduleCreate
                    date={this.getDay(new Date(),2)}/></span></td>;
            } else {
                cell = <td>false </td>;
            }
        }
        return cell;
    }
    forLoopWednesday = (shift) => {
        var cell = false;
        const onDataSubmit = this.props.onDataSubmit;

        this.props.dailyschedules.map(function(el, index){
            if ((el.shift.identifier==shift.identifier)&&(shift.isWednesday && el.isWednesday)) {
                    var selectedRowMonday = true;
                cell =  <td>'+ ifTrue +'{el.employees[0].firstName}<span id="edit" className="glyphicon glyphicon-pencil"><DailyScheduleManageEmployees
                        dailyscheduleId={el.identifier}
                        employees={el.employees}
                        shift={el.shift}
                        onDataSubmit={onDataSubmit}
                        date={el.date}
                        isActive={el.isActive}
                    /></span></td>;
                }
        });
        if (cell == false) {
            if(shift.isActive) {
                cell = <td><span id="create" className="glyphicon glyphicon-plus"><DailyScheduleCreate
                    date={this.getDay(new Date(),3)}/></span></td>;
            } else {
                cell = <td>false </td>;
            }
        }
        return cell;
    }
    forLoopThursday = (shift) => {
        var cell = false;
        const onDataSubmit = this.props.onDataSubmit;


        this.props.dailyschedules.map(function(el, index){
            if ((el.shift.identifier==shift.identifier)&&(shift.isThursday && el.isThursday)) {
                    var selectedRowMonday = true;
                cell =  <td>'+ ifTrue +'{el.employees[0].firstName}<span id="edit" className="glyphicon glyphicon-pencil"><DailyScheduleManageEmployees
                        dailyscheduleId={el.identifier}
                        employees={el.employees}
                        shift={el.shift}
                        onDataSubmit={onDataSubmit}
                        date={el.date}
                        isActive={el.isActive}
                    /></span></td>;
                }
        });
        if (cell == false) {
            if(shift.isActive) {
                cell = <td><span id="create" className="glyphicon glyphicon-plus"><DailyScheduleCreate
                    date={this.getDay(new Date(),4)}/></span></td>;
            } else {
                cell = <td>false </td>;
            }
        }
        return cell;
    }
    forLoopFriday = (shift) => {
        var cell = false;
        const onDataSubmit = this.props.onDataSubmit;


        this.props.dailyschedules.map(function(el, index){
            if ((el.shift.identifier==shift.identifier)&&(shift.isFriday && el.isFriday)) {
                var selectedRowMonday = true;
                cell =  <td>'+ ifTrue +'{el.employees[0].firstName}<span id="edit"
                                                                        className="glyphicon glyphicon-pencil"><DailyScheduleManageEmployees
                    dailyscheduleId={el.identifier}
                    employees={el.employees}
                    shift={el.shift}
                    onDataSubmit={onDataSubmit}
                    date={el.date}
                    isActive={el.isActive}
                /></span></td>;
            }
        });
        if (cell == false) {
            if(shift.isActive) {
                cell = <td><span id="create" className="glyphicon glyphicon-plus"><DailyScheduleCreate
                    date={this.getDay(new Date(),5)}/></span></td>;
            } else {
                cell = <td>false </td>;
            }
        }
        return cell;
    }
    forLoopSaturday = (shift) => {
        var cell = false;
        const onDataSubmit = this.props.onDataSubmit;


        this.props.dailyschedules.map(function(el, index){
            if ((el.shift.identifier==shift.identifier)&&(shift.isSaturday && el.isSaturday)) {
                    var selectedRowMonday = true;
                cell =  <td>'+ ifTrue +'{el.employees[0].firstName}<span id="edit" className="glyphicon glyphicon-pencil"><DailyScheduleManageEmployees
                        dailyscheduleId={el.identifier}
                        employees={el.employees}
                        shift={el.shift}
                        onDataSubmit={onDataSubmit}
                        date={el.date}
                        isActive={el.isActive}
                    /></span></td>;
                }
        });
        if (cell == false) {
            if(shift.isActive) {
                cell = <td><span id="create" className="glyphicon glyphicon-plus"><DailyScheduleCreate
                    date={this.getDay(new Date(),6)}/></span></td>;
            } else {
                cell = <td>false </td>;
            }
        }
        return cell;
    }
    forLoopSunday = (shift) => {
    var cell = false;
        const onDataSubmit = this.props.onDataSubmit;


        this.props.dailyschedules.map(function(el, index){
            if ((el.shift.identifier==shift.identifier)&&(shift.isSunday && el.isSunday)) {
                var selectedRowMonday = true;
                cell = <td>'+ ifTrue +'{el.employees[0].firstName}<span id="edit" className="glyphicon glyphicon-pencil"><DailyScheduleManageEmployees
                        dailyscheduleId={el.identifier}
                        employees={el.employees}
                        shift={el.shift}
                        onDataSubmit={onDataSubmit}
                        date={el.date}
                        isActive={el.isActive}
                    /></span></td>;
                }
        });
        if (!cell) {
            if(shift.isActive) {
                cell = <td><span id="create" className="glyphicon glyphicon-plus"><DailyScheduleCreate
                    date={this.getDay(new Date(),7)}/></span></td>;
            } else {
                cell = <td>false </td>;
            }
        }
        return cell;
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
		const listItems = this.props.shifts.map((el, index) => (

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

export default DailyScheduleTable;
