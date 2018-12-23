import React, {Component} from 'react';
import axios from 'axios';
import {baseUrlForTheBackend} from "../../../constants";
import $ from 'jquery';
import icons from "glyphicons";


class RolesEdit extends Component {

	constructor(props) {
		super(props);

		this.state = {
			roleId: this.props.roleId,
			roleName: this.props.roleName,
			roleIsActive: this.props.roleIsActive,
			message: null
		};

		this.modalRef = React.createRef();
	};

	saveRole() {
		axios.put(baseUrlForTheBackend + '/role/' + this.state.roleId, {
			"name": this.state.roleName,
			"isActive": this.state.roleIsActive
		})
		.then(() => {
			this.setState({message:null});
			this.hide();
			this.props.onDataSubmit();
		})
		.catch(() => {
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


	handleInputChange = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.saveRole();
	};


	render() {

		return (
			<div>
				<button className="btn btn-secondary" data-toggle="modal"
						data-target={'#editRoleNameDialog' + this.props.roleId}>
					{icons.pencil}
				</button>
				<div ref={this.modalRef} className="modal fade" id={'editRoleNameDialog' + this.props.roleId} tabIndex="-1" role="dialog"
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
									<div role="alert"
										 id={'message' + this.props.roleId}>{this.state.message}</div>
									< div className="modal-footer">
										<button type="button" onClick={(e) => {
											this.handleSubmit(e)
										}}
												className="btn btn-primary mr-1">
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

export default RolesEdit;
