import React, {Component} from 'react';
import axios from 'axios';
import {baseUrlForTheBackend} from "../../../constants";
import $ from "jquery";


class EmployeeDeactivate extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isActive: this.props.isActive,
			message: null
		};

		this.modalRef = React.createRef();
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
		this.updateActivation();
	};
	updateActivation() {
		axios.put(baseUrlForTheBackend + '/employees/' + this.props.employeeId,
            {
				"firstName": this.props.firstName,
				"lastName": this.props.lastName,
				"isActive": this.state.isActive,
				"employmentRate": this.props.employmentRate,
				"roleId":this.props.roleId
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
						data-target={'#deactivateEmployeeDialog' + this.props.employeeId}>
					{this.props.buttonTitle}
				</button>
				<div ref={this.modalRef} className="modal fade" id={'deactivateEmployeeDialog' + this.props.employeeId} tabIndex="-1" role="dialog"
					 aria-labelledby="deleteEmployeeDialogTitle" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLongTitle">Mitarbeiter de/reaktivieren</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<h2>{this.props.firstName} {this.props.lastName}</h2>
								<div className="form-check">
									<label className="form-check-label" id="employeeActive">
										<input
											htmlFor="employeeActive"
											name={'isActive'}
											defaultChecked={this.state.isActive}
											type="checkbox"
											className="form-check-input"
											onClick={this.handleInputChange}
										/>
										Die Person ist {this.state.isActive === true ? "aktiv" : "deaktiviert"}
									</label>
								</div>
								<div id={'message' + this.props.employeeId}/>
								< div className="modal-footer">
									<button type="button" onClick={this.handleSubmit} className="btn btn-primary">
										Speichern und Schliessen
									</button>
									< button type="button" className="btn btn-secondary" data-dismiss="modal">
										Abbrechen
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default EmployeeDeactivate;
