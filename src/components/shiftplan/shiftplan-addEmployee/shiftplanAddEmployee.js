import React, {Component} from "react";
import axios from "axios";
import {baseUrlForTheBackend} from "../../../constants";
import $ from "jquery";


class ShiftPlanAddEmployee extends Component {
	constructor(props) {
		super(props);

		this.state = {
			shiftPlanId: this.props.shiftPlanId,
			shiftId: this.props.shiftId,
			weekNumber: this.props.weekNumber,
			isActive: this.props.isActive,
			roleId: this.props.roleId,
			employeeId: '',
			employeeData: []
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		axios.get(baseUrlForTheBackend + '/employees')
			.then(({data}) => {
				this.setState({
					employeeData: data
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
		const message = '#addEmployeeToShiftPlanMessage' + this.props.shiftPlanId;

		axios.put(baseUrlForTheBackend + '/shiftplan/' + this.props.shiftPlanId + '/employee/' + this.state.employeeId)
			.then(function (response) {
				console.log('then');
				console.log(response);
				$("#createShiftPlanMessage").empty().html("Mitarbeiter wurde hinzugefügt");
			})
			.catch(function (error) {
				console.log('catch');
				console.log(error);
				$(message).empty().text("Fehler");
			});


		event.preventDefault();
	}

	render() {
		const employeeList = this.state.employeeData.map((el, index) => (
			<option key={index} value={el.stid}>{el.firstName} {el.lastName}</option>
		));

		return (

			<div>
				<button className="btn btn-secondary" data-toggle="modal"
						data-target={'#addEmployeeToShiftPlan' + this.props.shiftPlanId}>
					Mitarbeiter hinzufügen
				</button>
				<div className="modal fade" id={'addEmployeeToShiftPlan' + this.props.shiftPlanId} tabIndex="-1"
					 role="dialog"
					 aria-labelledby="addEmployeeToShiftPlanTitle" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLongTitle">Schichtenplan: Mitarbeiter
									hinzufügen</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<form>

									<div>
										<div>Schicht</div>
										<table>
											<tr>
												<td>Name</td>
												<td>{this.props.shiftName}</td>
											</tr>
											<tr>
												<td>Zeit</td>
												<td>{this.props.shiftStartTime} bis {this.props.shiftEndTime}</td>
											</tr>
											<tr>
												<td>Wochennummer</td>
												<td>{this.props.weekNumber}</td>
											</tr>
											<tr>
												<td>Jahr</td>
												<td>{this.props.year}</td>
											</tr>
											<tr>
												<td>Ist Akitv</td>
												<td>{this.props.isActive ? 'Ja' : 'Nein'}</td>
											</tr>
										</table>
									</div>

									<div className="form-group">
										<label htmlFor="employee">Mitarbeiter</label>
										<select className="form-control"
												name={'employeeId'}
												id="employee"
												onChange={this.handleInputChange}
										>
											<option/>
											{employeeList}
										</select>
									</div>
									<div id={'addEmployeeToShiftPlanMessage' + this.props.shiftPlanId}/>
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


		)
	}
}

export default ShiftPlanAddEmployee;