import React, {Component} from 'react';
import {RoleModel} from "../../models/DefaultRoleModel";


class RolesCreate extends Component {
	constructor(props) {
		super(props);

		this.state = {
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

	handleSubmit(event) {
		//TODO addRole
		RoleModel.addRole(this.state.roleName);
		console.log(this.state.roleName);
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
								<form onSubmit={this.handleSubmit}>
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
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default RolesCreate;
