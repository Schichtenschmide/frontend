import React, {Component} from "react";
import $ from "jquery";
import axios from "axios";
import {baseUrlForTheBackend} from "../../../constants";


class ShiftPlanCreate extends Component {

	constructor(props) {
		super(props);

		this.state = {
			shiftData: [],
			roleData: [],
			shiftId: '',
			weekNumber: '',
			isActive: '',


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

	componentDidMount() {
		axios.get(baseUrlForTheBackend + '/shifts')
			.then(({data}) => {
				this.setState({
					shiftData: data
				});
				console.log(data);
			})
			.catch(function (error) {
				console.log('catch');
				console.log(error);
			});
	}

	handleSubmit(event, isSaveAndCloseEvent) {
		if (this.state.shiftId === '' || this.state.weekNumber === '' || this.state.year === '')
			$("#createShiftPlanMessage").empty().html("Bitte wählen Sie eine Schicht, eine Wochennummer und Jahr");
		else {
			axios.post(baseUrlForTheBackend + '/shift/' + this.state.shiftId + '/shiftplans',
				{
					weekNumber: this.state.weekNumber,
					year: this.state.year,
					isActive: this.state.isActive
				})
				.then(function (response) {
					console.log('then');
					console.log(response);
					$("#createShiftPlanMessage").empty().html("Schicht wurde hinzugef&uuml;gt");
					if(isSaveAndCloseEvent)
						$('#createShiftPlan').modal('hide');

				})
				.catch(function (error) {
					console.log('catch');
					console.log(error);
					$("#createShiftPlanMessage").empty().html("Fehler: <br/>Sind alles Zahlen? <br/> Gibt es diese Schicht in dieser Wohche und Jahr bereits?");
				});
		}

		event.preventDefault();
	}

	render() {
		const shiftList = this.state.shiftData.map((el, index) => (
			<option key={index} value={el.stid}>{el.name}</option>
		));
		return (
			<div>
				<button className="btn btn-secondary" data-toggle="modal"
						data-target={'#createShiftPlan'}>
					Schichtenplan erstellen
				</button>
				<div className="modal fade" id={'createShiftPlan'} tabIndex="-1" role="dialog"
					 aria-labelledby="editShiftDialogTitle" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLongTitle">Schichtenplan erstellen</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<form>
									<h4>Schritt 1: Schicht und Datum wählen</h4>
									<div className="form-group">
										<label htmlFor="shift">Schicht</label>
										<select className="form-control"
												name={'shiftId'}
												id="shift"
												onChange={this.handleInputChange}
										>
											<option/>
											{shiftList}
										</select>
									</div>
									<label htmlFor="weekNumber">Wochennummer</label>
									<input name={'weekNumber'} type="text" id="weekNumber" value={this.state.weekNumber}
										   onChange={this.handleInputChange} className="form-control"/>
									<label htmlFor="year">Jahr</label>
									<input name={'year'} type="text" id="year" value={this.state.year}
										   onChange={this.handleInputChange} className="form-control"/>
									<div className="form-check">
										<input name={'isActive'} type="checkbox" id="isActive"
											   value={this.state.isActive} onChange={this.handleInputChange}/>
										<label htmlFor="isActive">Aktiver Schichtplan</label>
									</div>
									<div id={'createShiftPlanMessage'}/>
									<div className="modal-footer">
										<button type="button"
												onClick={(e) => {
													this.handleSubmit(e, false)
												}}
												className="btn btn-primary">
											Speichern
										</button>
										<button type="button" onClick={(e) => {
											this.handleSubmit(e, true)
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

export default ShiftPlanCreate;

/**
 *
 import React, {Component} from "react";
 import {baseUrlForTheBackend} from "../../../constants";
 import axios from "axios";
 import $ from "jquery";


 class ShiftDeactivate extends Component {


	handleSubmit(event) {
		const id = this.props.shiftId;
			axios.put(baseUrlForTheBackend + '/role/' + this.props.roleId + '/shift/' + this.props.shiftId, {
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
				"isSunday": this.props.isSunday
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


				</div>
			</div>
		);
	}
}

 export default ShiftDeactivate;

 */
