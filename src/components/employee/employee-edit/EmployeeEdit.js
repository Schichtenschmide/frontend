import React, {Component} from 'react';
import axios from "axios";
import {baseUrlForTheBackend} from "../../../constants";
import $ from "jquery";

class EmployeeEdit extends Component {

	constructor(props) {
		super(props);

		this.state = {
			firstName: this.props.firstName,
			lastName: this.props.lastName,
			employmentRate: this.props.employmentRate,
			isActive: this.props.isActive,
			roleData: [],
			roleId: this.props.roleId

		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		$('.message').empty();
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

	handleSubmit(event, isSaveAndCloseEvent) {
		const id = this.props.employeeId;
		axios.put(baseUrlForTheBackend + '/roles/' + this.state.roleId + '/employee/' + this.props.employeeId,
			{
				"firstName": this.state.firstName,
				"lastName": this.state.lastName,
				"employmentRate": this.state.employmentRate,
				"isActive": this.state.isActive
			})
			.then(function (response) {
				console.log('then');
				console.log(response);
				$("#message" + id).empty().html("Mitarbeiter wurde ge&auml;ndert");
				if (isSaveAndCloseEvent)
					$('#editEmployeeDialog' + id).modal('hide');
			})
			.catch(function (error) {
				console.log('catch');
				console.log(error);
				if (isSaveAndCloseEvent) {
					$("#message" + id).empty().html("Fehler \"Speichern und schliessen\":<br/> Haben Sie mindestens 3 Buchstaben eingegeben?");
				} else {
					$("#message" + id).empty().html("Fehler: Haben Sie mindestens 3 Buchstaben eingegeben?");
				}
			});
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
						data-target={'#editEmployeeDialog' + this.props.employeeId}>
					bearbeiten
				</button>
				<div className="modal fade" id={'editEmployeeDialog' + this.props.employeeId} tabIndex="-1"
					 role="dialog"
					 aria-labelledby="editEmployeeDialogTitle" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLongTitle">Mitarbeiter bearbeiten</h5>
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
									<input name={'isActive'} type="checkbox" id="isActive"
										   defaultChecked={this.state.isActive}
										   value={this.state.isActive} onClick={this.handleInputChange}/>
									<label htmlFor="isActive">Aktiver Mitarbeiter</label>
									<div id={'message' + this.props.employeeId}/>
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

export default EmployeeEdit;
