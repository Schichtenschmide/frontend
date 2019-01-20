import React, {Component} from 'react';
import axios from "axios";
import {baseUrlForTheBackend} from "../../../constants";
import $ from "jquery";
import SimpleReactValidator from 'simple-react-validator';
import validationSettings from '../../../validationSettings';

class EmployeeCreate extends Component {

	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			employmentRate: '',
			isActive: 'false',
			roles: [],
			roleId: '',
			message: null

		};

		this.modalRef = React.createRef();
		this.validator = new SimpleReactValidator(validationSettings);
	};

	componentDidMount() {
		this.fetchRoles()
	};

	fetchRoles() {
		axios.get(baseUrlForTheBackend + '/roles')
		.then(({data}) => {
			this.setState({
				roles: data,
				message: null
			});
		})
		.catch(() => {
			this.setState({message:"Rollen konnten nicht geladen werden."})
		});
	};

	handleInputChange = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	};

	addEmployee() {
		if (this.state.roleId === '') {
			this.setState({message:"Bitte wählen Sie eine Rolle"})
		} else {
			axios.post(baseUrlForTheBackend + '/employees',
				{
					firstName: this.state.firstName,
					lastName: this.state.lastName,
					employmentRate: this.state.employmentRate,
					isActive: this.state.isActive,
					roleId: this.state.roleId
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
		}
	};

	hide() {
		$(this.modalRef.current).modal("hide");
	};

	show() {
		$(this.modalRef.current).modal("show");
	};

	handleSubmit = (event) => {

		if (this.validator.allValid()) {
			this.addEmployee();
		} else {
			this.validator.showMessages();
			this.forceUpdate();
		}
		event.preventDefault();
	};

	render() {
		const roleList = this.state.roles.map((el, index) => (
			<option key={index} value={el.identifier}>{el.name}</option>
		));
		let percent = [];
		for (let i = 20; i <= 100; i += 20) {
			percent.push({value: i, percent: i})
		}
		const percentList = percent.map((el, index) => (
			<option
				key={index}
				value={el.value}
			>
				{el.percent}
			</option>
		));

		return (
			<div>
				<button className="btn btn-primary" data-toggle="modal" data-target="#createEmployeeDialog">
					Mitarbeiter hinzufügen
				</button>
				<div ref={this.modalRef} className="modal fade" id="createEmployeeDialog" tabIndex="-1" role="dialog"
					 aria-labelledby="createEmployeeDialogTitle" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLongTitle">Mitarbeiter hinzufügen</h5>
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
									{this.validator.message('firstName', this.state.firstName, 'required')}
									<label htmlFor="lastName">Nachname</label>
									<input name={'lastName'} type="text" id="lastName" value={this.state.lastName}
										   onChange={this.handleInputChange} className="form-control"/>
									{this.validator.message('lastName', this.state.lastName, 'required')}
									<label htmlFor="employmentRate">Stellenprozenzsatz</label>
									<select className="form-control"
											name={'employmentRate'}
											id="employmentRate"
											value={this.state.employmentRate}
											onChange={this.handleInputChange}
									>
										<option/>
										{percentList}
									</select>
									{this.validator.message('employmentRate', this.state.employmentRate, 'required')}
									<div className="form-group">
										<label htmlFor="role">Rolle</label>
										<select className="form-control"
												name={'roleId'}
												id="role"
												onChange={this.handleInputChange}
										>
											<option value={''}/>
											{roleList}
										</select>
										{this.validator.message('roleId', this.state.roleId, 'required')}
									</div>
									<div className="form-check">
										<label className="form-check-label" id="isActive">
											<input name={'isActive'}
												   type="checkbox"
												   htmlFor="isActive"
												   value={this.state.isActive}
												   onChange={this.handleInputChange}
											/>
											Aktiver Mitarbeiter
										</label>
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

export default EmployeeCreate;
