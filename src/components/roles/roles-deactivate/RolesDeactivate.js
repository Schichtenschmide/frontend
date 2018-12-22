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
			roleIsActive: this.props.roleIsActive,
			message: null
		};

		this.modalRef = React.createRef();
	}

	handleInputChange = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	};

	handleSubmit(event) {
		event.preventDefault();
		this.updateActivation()
	};

	updateActivation = () => {
		axios.put(baseUrlForTheBackend + '/role/' + this.props.roleId,
			{
				"name": this.state.roleName,
				"isActive": this.state.roleIsActive
			})
			.then(() => {
				this.setState({message:null});
				this.hide();

				this.props.onDataSubmit()
			})
			.catch( () => {
				this.setState({message:"Es ist ein Fehler aufgetreten"});
				this.show();
			});
	};

	hide() {
		$(this.modalRef.current).modal("hide");
	};

	show() {
		$(this.modalRef.current).modal("show");
	};

	render() {
		return (
			<div>
				<button className="btn btn-secondary" data-toggle="modal"
						data-target={'#deactivateRoleNameDialog' + this.props.roleId}>
					{this.props.title}
				</button>
				<div ref={this.modalRef} className="modal fade" id={'deactivateRoleNameDialog' + this.props.roleId} tabIndex="-1"
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
												name={'roleIsActive'}
												defaultChecked={this.state.roleIsActive}
												type="checkbox"
												className="form-check-input"
												onClick={this.handleInputChange}
											/>
											Die Rolle ist {this.state.roleIsActive === true ? "aktiv" : "deaktiviert"}
										</label>
									</div>
									<div  id={'message' + this.props.roleId}>{this.state.message}</div>
									< div className="modal-footer">
										<button
											type="button" onClick=
											{(e) => {
												this.handleSubmit(e, this.props.roleId)
											}}
											className="btn btn-primary mr-1"
										>
											Speichern
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
