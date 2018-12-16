import React, {Component} from 'react';
import axios from "axios";
import {baseUrlForTheBackend} from "../../../constants";
import $ from 'jquery';
import SimpleReactValidator from 'simple-react-validator';


class RolesCreate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			roleName: '',
			roleIsActive: ''
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validator = new SimpleReactValidator();
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
		if (!this.validator.allValid()) {
			this.validator.showMessages();
			// rerender to show messages for the first time
			this.forceUpdate();
		} else {
			axios.post(baseUrlForTheBackend + '/roles', {
				"name": this.state.roleName,
				"isActive": this.state.roleIsActive
			})
				.then(function (response) {
					console.log('then');
					console.log(response);
					$("#message").empty().html("Rolle wurde hinzugef&uuml;gt");
					if (isSaveAndCloseEvent)
						$('#createUserDialog').modal('hide');
				})
				.catch(function (error) {
					console.log('catch');
					console.log(error);
					if (isSaveAndCloseEvent)
						$("#message").empty().html("Fehler \"Speichern und schliessen\":<br/>Ist der Name schon bereits vorhanden?");
					else
						$("#message").empty().html("Fehler:<br/>Ist der Name schon bereits vorhanden?");
				});

		}
		event.preventDefault();
	}

	render() {
		return (
			<div>
				<button className="btn btn-primary" data-toggle="modal" data-target="#createUserDialog">
					Rolle hinzufügen
				</button>
				<div className="modal fade" id="createUserDialog" tabIndex="-1" role="dialog"
					 aria-labelledby="createUserDialogTitle" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLongTitle">Rolle hinzufügen</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<form>
									<label>
										Rollenname<br/>
										<input
											name={'roleName'}
											type="text"
											value={this.state.roleName}
											onChange={this.handleInputChange}
										/>
									</label>
									{this.validator.message('text', this.state.roleName, 'required|min:3|max:30')}
									<div className="form-check">
										<input name={'roleIsActive'}
											   type="checkbox"
											   id="isActive"
											   defaultChecked={false}
											   onChange={this.handleInputChange}
										/>
										<label htmlFor="isActive">Aktive Rolle</label>
									</div>
									<div id="message"/>
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

export default RolesCreate;
