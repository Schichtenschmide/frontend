import React, {Component} from 'react';
import ShiftPlanCreate from "../shiftplan-create/DailyScheduleCreate";
import ShiftPlanTable from "../shiftplan-table/DailyScheduleTable";
import axios from "axios/index";
import {baseUrlForTheBackend} from "../../../constants";


class DailyScheduleContainer extends Component {
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
    componentDidMount() {
        this.fetchShifts();
        this.fetchDailyschedules();
    }

	render() {
		return (
			<div>
				<h1>Wochenplan</h1>
				<ShiftPlanTable onDataSubmit={this.fetchDailySchedules} dailyschedules={this.state.dailyschedules} shifts={this.state.shifts}/>

			</div>
		);
	}
}

/*<ShiftPlanCreate/>*/

export default DailyScheduleContainer;
