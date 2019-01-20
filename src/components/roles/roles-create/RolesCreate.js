import React, {Component} from 'react';
import axios from "axios";
import {baseUrlForTheBackend} from "../../../constants";
import $ from 'jquery';
import SimpleReactValidator from 'simple-react-validator';
import validationSettings from '../../../validationSettings';


class RolesCreate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			roleName: '',
			roleIsActive: false,
			message: null
		};

		this.modalRef = React.createRef();
		this.validator = new SimpleReactValidator(validationSettings);
	};

	addRole() {
		axios.post(baseUrlForTheBackend + '/roles', {
			"name": this.state.roleName,
			"isActive": this.state.roleIsActive
		})
			.then( () => {
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


		if (this.validator.allValid()) {
			this.addRole();
		} else {
			this.validator.showMessages();
			this.forceUpdate();
		}
		event.preventDefault();
	};

	render() {
		return (
			<div>
				<button className="btn btn-primary" data-toggle="modal" data-target="#createUserDialog">
					Rolle hinzufügen
				</button>
				<div ref={this.modalRef}  className="modal fade" id="createUserDialog" tabIndex="-1" role="dialog"
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
									{this.validator.message('name', this.state.roleName, 'required')}
									<div className="form-check">
										<input name={'roleIsActive'}
											   type="checkbox"
											   id="isActive"
											   defaultChecked={false}
											   onChange={this.handleInputChange}
										/>
										<label htmlFor="isActive">Aktive Rolle</label>
									</div>
									<div id="message">{this.state.message}</div>
									< div className="modal-footer">
										<input type="submit"
												className="btn btn-primary mr-1"
												id="saveAndCloseButton"
											    value="Speichern"
										/>
										<input type="button" className="btn btn-secondary" data-dismiss="modal" value="Abbrechen" />
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
