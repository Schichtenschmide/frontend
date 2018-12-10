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

	handleSubmit(event, roleID) {
		axios.put(baseUrlForTheBackend + '/roles/' + this.props.roleId,
			{
				"name": this.state.roleName,
				"isActive": this.state.roleActive
			})
			.then(function (response) {
				console.log("then");
				console.log(response);
				$("#message" + roleID).empty().text("Erfolgreich gespeichert");
				$('#deactivateRoleNameDialog' + roleID).delay(5000).modal('hide');
			})
			.catch(function (error) {
				console.log("catch");
				console.log(error);
				$("#message" + roleID).html("Fehler! Bitte versuchen Sie es später.");
			});
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
									<div className="form-check">
										<label className="form-check-label" id="roleActive">
											<input
												htmlFor="roleActive"
												name={'roleActive'}
												defaultChecked={this.state.roleActive}
												type="checkbox"
												className="form-check-input"
												onClick={this.handleInputChange}
											/>
											Die Rolle ist {this.state.roleActive === true ? "aktiv" : "deaktiviert"}
										</label>
									</div>
									<div id={'message' + this.props.roleId}> </div>
									< div className="modal-footer">
										<button
											type="button" onClick=
											{(e) => {
												this.handleSubmit(e, this.props.roleId)
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
