import React, {Component} from "react";
import $ from "jquery";
import axios from "axios";
import {baseUrlForTheBackend} from "../../../constants";
import icons from "glyphicons";


class DailyScheduleCreate extends Component {

	constructor(props) {
		super(props);

		this.state = {
			shift: this.props.shift,
			date: this.props.date
		};
	}

    /*onClick={()=>{this.props.onAddClick(this.state.date, this.state.shift)}}*/
	render() {
		return (
			<div>
				<button className="btn btn-primary">
                    {icons.plus}
				</button>
			</div>
		);
	}
}

export default DailyScheduleCreate;
