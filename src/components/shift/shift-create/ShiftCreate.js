import React, {Component} from "react";


class ShiftCreate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name : '',
			startTime: '',
			endTime: '',
			shorthand: '',
			employeeCount: ''
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
		//TODO addToDB
		console.log(this.state.name);
		console.log(this.state.startTime);
		console.log(this.state.endTime);
		console.log(this.state.shorthand);
		console.log(this.state.employeeCount);
		event.preventDefault();
	}

	render() {
		return (
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
								<form onSubmit={this.handleSubmit}>
									<label htmlFor="name">Name</label>

									<input
										name={'roleName'}
										type="text"
										value={this.state.roleName}
										onChange={this.handleInputChange}
									/>

									<input name={'name'} type="text" id="name" value={this.state.name} onChange={this.handleInputChange} className="form-control"/>
									<div className="form-row">
										<div className="col">
											<label htmlFor="startTime">Von</label>
											<input name={'startTime'} type="time" value={this.state.startTime} onChange={this.handleInputChange} id="startTime" className="form-control"/>
										</div>
										<div className="col">
											<label htmlFor="startTime">Bis</label>
											<input name={'endTime'} type="time" id="endTime" className="form-control"/>
										</div>
									</div>
									<label htmlFor="shorthand">Shorthand</label>
									<input type="text" id="shorthand" className="form-control"/>

									<div className="form-check">
										<input className="form-check-input" type="checkbox" value="" id="monday"/>
										<label className="form-check-label" htmlFor="defaultCheck1">
											Montag
										</label>
									</div>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" value="" id="tuesday"/>
										<label className="form-check-label" htmlFor="defaultCheck1">
											Dienstag
										</label>
									</div>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" value="" id="wednesday"/>
										<label className="form-check-label" htmlFor="wednesday">
											Mittwoch
										</label>
									</div>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" value="" id="thursday"/>
										<label className="form-check-label" htmlFor="thursday">
											Donnestag
										</label>
									</div>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" value="" id="friday"/>
										<label className="form-check-label" htmlFor="friday">
											Freitag
										</label>
									</div>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" value="" id="saturday"/>
										<label className="form-check-label" htmlFor="saturday">
											Samstag
										</label>
									</div>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" value="" id="sunday"/>
										<label className="form-check-label" htmlFor="sunday">
											Sonntag
										</label>
									</div>
									<label htmlFor="employeeCount">Anzahl Mitarbeiter</label>
									<input type="number" id="employeeCount" className="form-control"/>
									<button type="submit" className="btn btn-primary">Hinzufügen</button>
								</form>
							</div>  
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ShiftCreate;

/*




	handleSubmit(event) {
		//TODO addRole
		RoleModel.addRole(this.state.roleName);
		console.log(this.state.roleName);
		event.preventDefault();
	}





												<label>
													Rollenname<br/>
													<input
														name={'roleName'}
														type="text"
														value={this.state.roleName}
														onChange={this.handleInputChange}
													/>
												</label>
												< div className="modal-footer">
													<button type="button" onClick={this.handleSubmit}
															className="btn btn-primary">
														Speichern
													</button>
													<button type="button" onClick={this.handleSubmit}
															className="btn btn-primary mr-1"
															data-dismiss="modal">
														Speichern und schliessen
													</button>
													< button type="button" className="btn btn-secondary" data-dismiss="modal">
														Abbrechen
													</button>
												</div>
											</form>


* */