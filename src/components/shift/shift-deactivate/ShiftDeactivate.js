import React, {Component} from "react";
import {baseUrlForTheBackend} from "../../../constants";
import axios from "axios";
import $ from "jquery";


class ShiftDeactivate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			shiftIsActive: this.props.shiftIsActive
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleSubmit(event) {
		const id = this.props.shiftId;
			axios.put(baseUrlForTheBackend + '/shift/' + this.props.shiftId, {
				"name": this.props.name,
				"startTime": this.props.startTime,
				"endTime": this.props.endTime,
				"shorthand": this.props.shorthand,
				"employeeCount": this.props.employeeCount,
				"isActive": this.state.shiftIsActive,
				"isMonday": this.props.isMonday,
				"isTuesday": this.props.isTuesday,
				"isWednesday": this.props.isWednesday,
				"isThursday": this.props.isThursday,
				"isFriday": this.props.isFriday,
				"isSaturday": this.props.isSaturday,
				"isSunday": this.props.isSunday,
				"roleId":this.props.roleId
			})
				.then(function (response) {
					console.log('then');
					console.log(response);
					$("#message" + id).empty().html("&Auml;nderung wurde gespeichert");
					$('#deactivateShiftDialog' + id).modal('hide');
				})
				.catch(function (error) {
					console.log('catch');
					console.log(error);
					$("#message" + id).empty().html("Fehler: Speichern und schliessen");
				});

		event.preventDefault();
	}

	render() {
		return (
			<div>
				<button className="btn btn-secondary" data-toggle="modal"
						data-target={'#deactivateShiftDialog' + this.props.shiftId}>
					 {this.props.shiftIsActive === true ? 'deaktivieren' : 'aktivieren'}
				</button>

				<div className="modal fade" id={'deactivateShiftDialog' + this.props.shiftId} tabIndex="-1" role="dialog"
					 aria-labelledby="editShiftDialogTitle" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLongTitle">Schicht de/reaktivieren</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<form>


									<div className="form-check">
										<label className="form-check-label" id="shiftActive">
											<input
												htmlFor="shiftActive"
												name={'shiftIsActive'}
												defaultChecked={this.state.shiftIsActive}
												type="checkbox"
												className="form-check-input"
												onClick={this.handleInputChange}
											/>
											Die Schicht ist {this.state.shiftIsActive === true ? "aktiv" : "deaktiviert"}
										</label>
									</div>

									<div id={'message' + this.props.shiftId}/>
									<div className="modal-footer">
										<button type="button" onClick={(e) => {
											this.handleSubmit(e)
										}}
												className="btn btn-primary mr-1"
												id="saveAndCloseButton"
										>
											Speichern und schliessen
										</button>
										< button type="button" className="btn btn-secondary" data-dismiss="modal">
											Abbrechen
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ShiftDeactivate;
