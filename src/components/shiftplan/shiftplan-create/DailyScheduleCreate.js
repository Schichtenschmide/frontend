import React, {Component} from "react";
import icons from "glyphicons";


class DailyScheduleCreate extends Component {

	constructor(props) {
		super(props);

		this.state = {
			shift: this.props.shift,
			date: this.props.date
		};
		console.log("date" + this.props.date);
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

