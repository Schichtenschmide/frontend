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
			roleName: ''
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
		//TODO addRole to DB
		axios.put(baseUrlForTheBackend + '/roles/' + this.props.roleId, {
			"name": this.state.roleName,
		})
			.then(function (response) {
				console.log("then")
				console.log(response);
				$(".message").empty().text("saved");
				if (isSaveAndCloseEvent)
					$("#editRoleNameDialog" + roleID).modal('hide');

			})
			.catch(function (error) {
				console.log("catch");
				console.log(error);
				if (isSaveAndCloseEvent) {
					$(".message").empty().text("not saved save and close");
				} else {
					$(".message").text("not saved");
				}


			});
		console.log(this.state.roleName);
		event.preventDefault();
	}


	render() {

		return (
			<div>
				<button className="btn btn-secondary" data-toggle="modal"
						data-target={'#editRoleNameDialog' + this.props.roleId}>
					bearbeiten
				</button>

				<div className="modal fade" id={'editRoleNameDialog' + this.props.roleId} tabIndex="-1" role="dialog"
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
											readonly="readonly"
											className="form-control"
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
									<input type="text" value={this.props.roleId} hidden/>
									<div className="message"></div>
									< div className="modal-footer">
										<button type="button"
												onClick={(e) => {
													this.handleSubmit(e, false, this.props.roleId)
												}}
												className="btn btn-primary">
											Speichern
										</button>
										<button type="button" onClick={(e) => {
											this.handleSubmit(e, true, this.props.roleId)
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


/*
<div>
				<button className="btn btn-primary" data-toggle="modal" data-target="#createShiftDialog">
					Schicht hinzufügen
				</button>

				<div className="modal fade" id="createShiftDialog" tabIndex="-1" role="dialog"
					 aria-labelledby="createShiftDialogTitle" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLongTitle">Schicht hinzufügen</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<form>
									<label htmlFor="name">Name</label>
									<input name={'name'} type="text" id="name" value={this.state.name} onChange={this.handleInputChange} className="form-control"/>
									<div className="form-row">
										<div className="col">
											<label htmlFor="startTime">Von</label>
											<input name={'startTime'} type="time"  id="startTime" value={this.state.startTime} onChange={this.handleInputChange} className="form-control"/>
										</div>
										<div className="col">
											<label htmlFor="startTime">Bis</label>
											<input name={'endTime'} type="time" id="endTime" value={this.state.endTime} onChange={this.handleInputChange} className="form-control"/>
										</div>
									</div>
									<label htmlFor="shorthand">Shorthand</label>
									<input name={'shorthand'} type="text" id="shorthand" value={this.state.shorthand} onChange={this.handleInputChange} className="form-control"/>


									<label htmlFor="employeeCount">Anzahl Mitarbeiter</label>
									<input name={'employeeCount'} type="number" id="employeeCount" value={this.state.employeeCount} onChange={this.handleInputChange} className="form-control"/>



									< div className="modal-footer">
										<button type="button" onClick={this.handleSubmit}
												className="btn btn-primary">
											Speichern
										</button>
										<button type="button" onClick={this.handleSubmit} className="btn btn-primary mr-1" data-dismiss="modal">
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
* */