import React, {Component} from "react";
import {baseUrlForTheBackend} from "../../../constants";
import axios from "axios";
import $ from "jquery";


class ShiftEdit extends Component {
	constructor(props) {
		super(props);

		this.state = {
			shiftId: this.props.shiftId,
			name: this.props.name,
			startTime: this.props.startTime,
			endTime: this.props.endTime,
			shorthand: this.props.shorthand,
			employeeCount: this.props.employeeCount,
			isActive: this.props.isActive,
			isMonday: this.props.isMonday,
			isTuesday: this.props.isTuesday,
			isWednesday: this.props.isWednesday,
			isThursday: this.props.isThursday,
			isFriday: this.props.isFriday,
			isSaturday: this.props.isSaturday,
			isSunday: this.props.isSunday,
			roleData: [],
			roleId: this.props.roleId
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		axios.get(baseUrlForTheBackend + '/roles')
			.then(({data}) => {
				this.setState({
					roleData: data
				});
				console.log(data);
			})
			.catch(function (error) {
				console.log('catch');
				console.log(error);
			});
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
		if (this.state.roleId === '') {
			$("#message" + id).empty().html("Bitte wählen Sie eine Rolle");
		} else {
			axios.put(baseUrlForTheBackend + '/role/' + this.state.roleId + '/shift/' + this.state.shiftId, {
				"name": this.state.name,
				"startTime": this.state.startTime,
				"endTime": this.state.endTime,
				"shorthand": this.state.shorthand,
				"employeeCount": this.state.employeeCount,
				"isActive": this.state.isActive,
				"isMonday": this.state.isMonday,
				"isTuesday": this.state.isTuesday,
				"isWednesday": this.state.isWednesday,
				"isThursday": this.state.isThursday,
				"isFriday": this.state.isFriday,
				"isSaturday": this.state.isSaturday,
				"isSunday": this.state.isSunday
			})
				.then(function (response) {
					console.log('then');
					console.log(response);
					$("#message" + id).empty().html("&Auml;nderung wurde gespeichert");
					$('#editShiftDialog' + id).modal('hide');
				})
				.catch(function (error) {
					console.log('catch');
					console.log(error);
					$("#message" + id).empty().html("Fehler \"Speichern und schliessen\":<br/> Haben Sie mindestens 3 Buchstaben eingegeben?<br/>Ist der Name schon bereits vorhanden?");
				});
		}
		event.preventDefault();
	}

	render() {
		const roleList = this.state.roleData.map((el, index) => (
			<option selected={this.props.roleId === el.stid ? 'true' : ''} key={index}
					value={el.stid}>{el.name}</option>
		));

		return (
			<div>
				<button className="btn btn-secondary" data-toggle="modal"
						data-target={'#editShiftDialog' + this.props.shiftId}>
					bearbeiten
				</button>

				<div className="modal fade" id={'editShiftDialog' + this.props.shiftId} tabIndex="-1" role="dialog"
					 aria-labelledby="editShiftDialogTitle" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLongTitle">Schicht bearbeiten</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<form>
									<label htmlFor="name">Name</label>
									<input name={'name'} type="text" id="name" value={this.state.name}
										   onChange={this.handleInputChange} className="form-control"/>
									<div className="form-row">
										<div className="col">
											<label htmlFor="startTime">Von</label>
											<input name={'startTime'} type="number" step={1} id="startTime"
												   value={this.state.startTime} onChange={this.handleInputChange}
												   className="form-control"/>
										</div>
										<div className="col">
											<label htmlFor="startTime">Bis</label>
											<input name={'endTime'} type="number" step={1} id="endTime"
												   value={this.state.endTime}
												   onChange={this.handleInputChange} className="form-control"/>
										</div>
									</div>
									<label htmlFor="shorthand">Shorthand</label>
									<input name={'shorthand'}
										   type="text"
										   id="shorthand"
										   value={this.state.shorthand}
										   onChange={this.handleInputChange}
										   className="form-control"
									/>
									<div className="form-check">
										<input
											name={'isMonday'}
											defaultChecked={this.state.isMonday}
											type="checkbox"
											id="monday"
											className="form-check-input"
											onClick={this.handleInputChange}
										/>
										<label className="form-check-label" htmlFor="monday">
											Montag
										</label>
									</div>
									<div className="form-check">
										<input
											name={'isTuesday'}
											defaultChecked={this.state.isTuesday}
											type="checkbox"
											id="tuesday"
											className="form-check-input"
											onClick={this.handleInputChange}
										/>
										<label className="form-check-label" htmlFor="tuesday">
											Dienstag
										</label>
									</div>
									<div className="form-check">
										<input
											name={'isWednesday'}
											className="form-check-input"
											type="checkbox"
											id="wednesday"
											defaultChecked={this.state.isWednesday}
											onClick={this.handleInputChange}
										/>
										<label className="form-check-label" htmlFor="wednesday">
											Mittwoch
										</label>
									</div>
									<div className="form-check">
										<input
											name={'isThursday'}
											className="form-check-input"
											type="checkbox"
											id="thursday"
											defaultChecked={this.state.isThursday}
											onClick={this.handleInputChange}
										/>
										<label className="form-check-label" htmlFor="thursday">
											Donnerstag
										</label>
									</div>
									<div className="form-check">
										<input
											name={'isFriday'}
											className="form-check-input"
											type="checkbox"
											id="friday"
											defaultChecked={this.state.isFriday}
											onClick={this.handleInputChange}
										/>
										<label className="form-check-label" htmlFor="friday">
											Freitag
										</label>
									</div>
									<div className="form-check">
										<input
											name={'isSaturday'}
											className="form-check-input"
											type="checkbox"
											id="saturday"
											defaultChecked={this.state.isSaturday}
											onClick={this.handleInputChange}
										/>
										<label className="form-check-label" htmlFor="saturday">
											Samstag
										</label>
									</div>
									<div className="form-check">
										<input
											name={'isSunday'}
											className="form-check-input"
											type="checkbox"
											id="sunday"
											defaultChecked={this.state.isSunday}
											onClick={this.handleInputChange}
										/>
										<label className="form-check-label" htmlFor="sunday">
											Sonntag
										</label>
									</div>
									<label htmlFor="employeeCount">Anzahl Mitarbeiter</label>
									<input name={'employeeCount'} type="number" id="employeeCount"
										   value={this.state.employeeCount} onChange={this.handleInputChange}
										   className="form-control"/>
									<div className="form-group">
										<label htmlFor="role">Rolle</label>
										<select className="form-control"
												name={'roleId'}
												id="role"
												onChange={this.handleInputChange}
										>
											{roleList}
										</select>
									</div>
									<div className="form-check">
										<label className="form-check-label" id="shiftActive">
											<input
												htmlFor="shiftActive"
												name={'isActive'}
												defaultChecked={this.state.roleActive}
												type="checkbox"
												className="form-check-input"
												onClick={this.handleInputChange}
											/>
											aktive Schicht
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

export default ShiftEdit;
