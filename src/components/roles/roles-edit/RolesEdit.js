import React, {Component} from 'react';
import axios from 'axios';
import {baseUrlForTheBackend} from "../../../constants";
import $ from 'jquery';

class RolesEdit extends Component {
	roleId;

	constructor(props) {
		super(props);

		this.state = {
			roleData: [],
			username: '',
			roleId: this.props.roleId,
			roleName: this.props.roleName
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

	}


	handleSubmit(event, isSaveAndCloseEvent, roleID) {

		axios.put(baseUrlForTheBackend + '/roles/' + this.state.roleId, {
			"name": this.state.roleName,
			"isActive" : this.props.roleActive

		})
			.then(function (response) {
				console.log("then");
				console.log(response);
				$(".message").empty().text("Erfolgreich gespeichert");
				if (isSaveAndCloseEvent)
					$("#editRoleNameDialog" + roleID).modal('hide');
			})
			.catch(function (error) {
				console.log("catch");
				console.log(error);
				if (isSaveAndCloseEvent) {
					$(".message").html("Fehler \"Speichern und schliessen\":<br/> Haben Sie mindestens 3 Buchstaben eingegeben?<br/>Ist der Name schon bereits vorhanden?");
				} else {

					$(".message").empty().html("Fehler: Haben Sie mindestens 3 Buchstaben eingegeben?<br/>Ist der Name schon bereits vorhanden?<br/>");
				}


			});
		console.log(this.state.roleName);
		event.preventDefault();
	}


	render() {

		return (
			<div>
				<button className="btn btn-secondary" data-toggle="modal"
						data-target={'#editRoleNameDialog' + this.state.roleId}>
					bearbeiten
				</button>
				<div className="modal fade" id={'editRoleNameDialog' + this.state.roleId} tabIndex="-1" role="dialog"
					 aria-labelledby="createShiftDialogTitle" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLongTitle">Rollenamen bearbeiten</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<form>
									<label>
										alter Rollenname<br/>
										<input
											value={this.props.roleName}
											type="text"
											className="form-control"
											readOnly
										/>
									</label>
									<br/>
									<label>
										neuer Rollenname<br/>
										<input
											name={'roleName'}
											type="text"
											value={this.state.roleName}
											onChange={this.handleInputChange}
											className="form-control"
										/>
									</label>
									<input type="text" value={this.state.roleId} hidden readOnly/>
									<div className="message"></div>
									< div className="modal-footer">
										<button type="button"
												onClick={(e) => {
													this.handleSubmit(e, false, this.state.roleId)
												}}
												className="btn btn-primary">
											Speichern
										</button>
										<button type="button" onClick={(e) => {
											this.handleSubmit(e, true, this.state.roleId)
										}}
												className="btn btn-primary mr-1">
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
		)
	}


}

export default RolesEdit;
