import React, {Component} from "react";
import {baseUrlForTheBackend} from "../../../constants";
import axios from "axios";
import $ from "jquery";


class ShiftDeactivate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isActive: this.props.isActive,
			message: null
		};

		this.modalRef = React.createRef();
	};

	handleInputChange = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.updateActivation();
	};

	hide() {
		$(this.modalRef.current).modal("hide");
	};

	show() {
		$(this.modalRef.current).modal("show");
	};

	updateActivation() {
		axios.put(baseUrlForTheBackend + '/shift/' + this.props.shiftId, {
			"name": this.props.name,
			"startTime": this.props.startTime,
			"endTime": this.props.endTime,
			"shorthand": this.props.shorthand,
			"employeeCount": this.props.employeeCount,
			"isActive": this.state.isActive,
			"isMonday": this.props.isMonday,
			"isTuesday": this.props.isTuesday,
			"isWednesday": this.props.isWednesday,
			"isThursday": this.props.isThursday,
			"isFriday": this.props.isFriday,
			"isSaturday": this.props.isSaturday,
			"isSunday": this.props.isSunday,
			"roleId":this.props.roleId
		})
			.then( () => {
				this.setState({message:null});
				this.hide();

				this.props.onDataSubmit();

			})
			.catch(() => {
				this.setState({message:"Es ist ein Fehler aufgetreten"});
				this.show();
			});

	};


	render() {
		return (
			<div>
				<button className="btn btn-secondary" data-toggle="modal"
						data-target={'#deactivateShiftDialog' + this.props.shiftId}>
					 {this.props.isActive === true ? 'deaktivieren' : 'aktivieren'}
				</button>

				<div ref={this.modalRef} className="modal fade" id={'deactivateShiftDialog' + this.props.shiftId} tabIndex="-1" role="dialog"
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
												name={'isActive'}
												defaultChecked={this.state.isActive}
												type="checkbox"
												className="form-check-input"
												onClick={this.handleInputChange}
											/>
											Die Schicht ist {this.state.isActive === true ? "aktiv" : "deaktiviert"}
										</label>
									</div>

									<div id={'message' + this.props.shiftId}>{this.state.message}</div>
									<div className="modal-footer">
										<button type="button" onClick={(e) => {
											this.handleSubmit(e)
										}}
												className="btn btn-primary mr-1"
												id="saveAndCloseButton"
										>
											Speichern
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
