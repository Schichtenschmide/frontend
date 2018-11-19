import React, {Component} from 'react';
import axios from 'axios';
import {baseUrlForTheBackend} from "../../../constants";


class EmployeeDeleteDialog extends Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		//TODO addRole
		console.log(this.props.id);

		axios.put( baseUrlForTheBackend + '/employees/' + this.props.id, {'isActive': false})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
		event.preventDefault();
	}

	render() {
		return (
			<div>
				<button className="btn btn-primary" data-toggle="modal" data-target="#deleteEmployeeDialog">
					löschen
				</button>
				<div className="modal fade" id="deleteEmployeeDialog" tabIndex="-1" role="dialog"
					 aria-labelledby="deleteEmployeeDialogTitle" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLongTitle">Mitarbeiter löschen</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<h2>{this.props.firstName} {this.props.lastName}</h2>

									< div className="modal-footer">
										<button type="button" onClick={this.handleSubmit} className="btn btn-primary">
											Löschen
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

export default EmployeeDeleteDialog;
