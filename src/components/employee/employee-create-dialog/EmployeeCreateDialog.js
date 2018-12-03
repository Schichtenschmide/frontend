import React, {Component} from 'react';
import axios from "axios";
import {baseUrlForTheBackend} from "../../../constants";
import $ from "jquery";


class EmployeeCreateDialog extends Component {

	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			employmentRate: '',
			isActive: 'false'

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

	handleSubmit(event, isSaveAndCloseEvent) {
		axios.post(baseUrlForTheBackend + '/employees', {
			"firstName": this.state.firstName,
			"lastName": this.state.lastName,
			"employmentRate": this.state.employmentRate,
			"isActive": this.state.isActive
		})
			.then(function (response) {
				console.log('then');
				console.log(response);
				$("#message").empty().html("Mitarbeiter wurde hinzugef&uuml;gt");
				if (isSaveAndCloseEvent)
					$('#createEmployeeDialog').modal('hide');
			})
			.catch(function (error) {
				console.log('catch');
				console.log(error);
				$("#message").empty().html("Fehler: Haben Sie mindestens 3 Buchstaben eingegeben?<br/>Ist der Mitarbeiter bereits vorhanden?");
				if (isSaveAndCloseEvent)
					$("#message").empty().html("Fehler \"Speichern und schliessen\":<br/> Haben Sie mindestens 3 Buchstaben eingegeben?<br/>Ist der Mitarbeiter bereits vorhanden?");
			});

		console.log(this.state.firstName);
		console.log(this.state.lastName);
		console.log(this.state.employmentRate);
		console.log(this.state.isActive);
		event.preventDefault();
	}

	render() {
		return (
			<div>
				<button className="btn btn-primary" data-toggle="modal" data-target="#createEmployeeDialog">
					Mitarbeiter hinzufügen
				</button>
				<div className="modal fade" id="createEmployeeDialog" tabIndex="-1" role="dialog"
					 aria-labelledby="createEmployeeDialogTitle" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLongTitle">Mitarbeiter hinzufügen</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<form onSubmit={this.handleSubmit}>
									<label htmlFor="firstName">Vorname</label>
									<input name={'firstName'} type="text" id="firstName"
										   value={this.state.firstName} onChange={this.handleInputChange}
										   className="form-control"/>
									<label htmlFor="lastName">Nachname</label>
									<input name={'lastName'} type="text" id="lastName" value={this.state.lastName}
										   onChange={this.handleInputChange} className="form-control"/>
									<label htmlFor="employmentRate">Stellenprozenzsatz</label>
									<input name={'employmentRate'} type="number" id="employmentRate"
										   value={this.state.employmentRate} onChange={this.handleInputChange}
										   className="form-control"/>
									<input name={'isActive'} type="checkbox" id="isActive"
										   value={this.state.isActive} onChange={this.handleInputChange}/>
									<label htmlFor="isActive">Aktiver Mitarbeiter</label>
									<div id="message"></div>
									< div className="modal-footer">
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

export default EmployeeCreateDialog;
