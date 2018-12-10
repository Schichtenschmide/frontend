import React, {Component} from 'react';
import axios from 'axios';
import {baseUrlForTheBackend} from "../../../constants";
import $ from "jquery";


class EmployeeDeactivate extends Component {

	constructor(props) {
		super(props);
		this.state = {
			'isEmployeeActive': this.props.isEmployeeActive
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
		const id = this.props.id;
		axios.put(baseUrlForTheBackend +'/roles/'+ this.props.roleId + '/employee/' + this.props.id,
			{
				'firstName': this.props.firstName,
				'lastName': this.props.lastName,
				'isActive': this.state.isEmployeeActive
			})
			.then(function (response) {
				console.log(response);
				$("#message" + id).empty().text("Erfolgreich gespeichert");

				$('#deactivateEmployeeDialog' + id).modal('hide');
			})
			.catch(function (error) {
				console.log(error);
				$("#message" + id).html("Fehler! Bitte versuchen Sie es später.");
			});
		event.preventDefault();
	}

	render() {
		return (
			<div>
				<button className="btn btn-secondary" data-toggle="modal"
						data-target={'#deactivateEmployeeDialog' + this.props.id}>
					{this.props.buttonTitle}
				</button>
				<div className="modal fade" id={'deactivateEmployeeDialog' + this.props.id} tabIndex="-1" role="dialog"
					 aria-labelledby="deleteEmployeeDialogTitle" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLongTitle">Mitarbeiter de/reaktivieren</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<h2>{this.props.firstName} {this.props.lastName}</h2>
								<div className="form-check">
									<label className="form-check-label" id="employeeActive">
										<input
											htmlFor="employeeActive"
											name={'isEmployeeActive'}
											defaultChecked={this.state.isEmployeeActive}
											type="checkbox"
											className="form-check-input"
											onClick={this.handleInputChange}
										/>
										Die Person ist {this.state.isEmployeeActive === true ? "aktiv" : "deaktiviert"}
									</label>
								</div>
								<div id={'message' + this.props.id}/>
								< div className="modal-footer">
									<button type="button" onClick={this.handleSubmit} className="btn btn-primary">
										Speichern und Schliessen
									</button>
									< button type="button" className="btn btn-secondary" data-dismiss="modal">
										Abbrechen
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default EmployeeDeactivate;
