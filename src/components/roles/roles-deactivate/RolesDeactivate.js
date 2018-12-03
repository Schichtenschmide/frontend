import React, {Component} from 'react';
import axios from 'axios';
import {baseUrlForTheBackend} from "../../../constants";
import $ from 'jquery';

class RolesDeactivate extends Component {
	roleId;

	constructor(props) {
		super(props);

		this.state = {
			roleData: [],
			roleID: this.props.roleId,
			roleName: this.props.roleName,
			roleActive: this.props.roleActive
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
		axios.put(baseUrlForTheBackend + '/roles/' + this.props.roleId, {
			"name": this.state.roleName,
			"isActive": this.state.roleActive
		})
			.then(function (response) {
				console.log("then");
				console.log(response);
				$(".message").empty().text("Erfolgreich gespeichert");
				if (isSaveAndCloseEvent)
					$("#deactivateRoleNameDialog" + roleID).modal('hide');
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
						data-target={'#deactivateRoleNameDialog' + this.props.roleId}>
					{this.props.title}
				</button>

				<div className="modal fade" id={'deactivateRoleNameDialog' + this.props.roleId} tabIndex="-1"
					 role="dialog"
					 aria-labelledby="deactivateRoleNameDialogTitle" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLongTitle">Rollenamen deaktivieren</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<form>
									<label>
										Rollenname<br/>
										<input
											value={this.props.roleName}
											type="text"
											className="form-control"
											readOnly
										/>
									</label>
									<br/>
									<label>

										<input
											name={'roleActive'}
											defaultChecked={this.state.roleActive}
											type="checkbox"
											className="form-control"
											onClick={this.handleInputChange}
										/>
										Die Rolle ist {this.state.roleActive === true ? "aktiv" : "deaktiviert"}
									</label>

									<input type="text" value={this.state.roleId} hidden readOnly/>
									<div className="message"></div>
									< div className="modal-footer">
										<button
											type="button"
											onClick={(e) => {
												this.handleSubmit(e, false, this.props.roleId)
											}}
											className="btn btn-primary"
										>
											Speichern
										</button>
										<button
											type="button" onClick=
											{(e) => {
												this.handleSubmit(e, true, this.props.roleId)
											}}
											className="btn btn-primary mr-1"
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
		)
	}


}

export default RolesDeactivate;
