import React, {Component} from 'react';
import axios from "axios";
import {baseUrlForTheBackend} from "../../../constants";
import $ from "jquery";
import icons from "glyphicons";
import SimpleReactValidator from 'simple-react-validator';
import validationSettings from '../../../validationSettings';

class EmployeeEdit extends Component {

	constructor(props) {
		super(props);

		this.state = {
			firstName: this.props.firstName,
			lastName: this.props.lastName,
			employmentRate: this.props.employmentRate,
			isActive: this.props.isActive,
			roles: [],
			roleId: this.props.roleId,
			message: null

		};

		this.modalRef = React.createRef();
		this.validator = new SimpleReactValidator(validationSettings);
	};

	componentDidMount() {
		this.fetchRoles();
	};

	fetchRoles() {
		axios.get(baseUrlForTheBackend + '/roles2')
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

	saveEmployee = () => {
		axios.put(baseUrlForTheBackend + '/employees2/' + this.props.employeeId,
			{
				'firstName': this.state.firstName,
				'lastName': this.state.lastName,
				'isActive': this.state.isActive,
				"employmentRate": this.state.employmentRate,
				'roleId':this.state.roleId
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
			this.saveEmployee();
		} else {
			this.validator.showMessages();
			this.forceUpdate();
		}
		event.preventDefault();

	};

	hide() {
		$(this.modalRef.current).modal("hide");
	};

	show() {
		$(this.modalRef.current).modal("show");
	};

	render() {
		const roleList = this.state.roles.map((el, index) => (
			<option
				key={index}
				value={el.identifier}
			>
				{el.name}
			</option>
		));
		let percent = [];
		for(let i=20;i<=100;i+=20){
			percent.push({value: i, percent:i})
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
				<button className="btn btn-secondary" data-toggle="modal"
						data-target={'#editEmployeeDialog' + this.props.employeeId}>
					{icons.pencil}
				</button>
				<div ref={this.modalRef} className="modal fade" id={'editEmployeeDialog' + this.props.employeeId} tabIndex="-1"
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
										{percentList}
									</select>
									{this.validator.message('employmentRate', this.state.employmentRate, 'required')}
									<div className="form-group">
										<label htmlFor="role">Rolle</label>
										<select className="form-control"
												name={'roleId'}
												id="role"
												onChange={this.handleInputChange}
												value={this.state.roleId}
										>
											<option/>
											{roleList}
										</select>
										{this.validator.message('roleId', this.state.roleId, 'required')}
									</div>
									<input name={'isActive'} type="checkbox" id="isActive"
										   defaultChecked={this.state.isActive}
										   value={this.state.isActive} onClick={this.handleInputChange}/>
									<label htmlFor="isActive">Aktiver Mitarbeiter</label>
									<div id={'message' + this.props.employeeId}>{this.state.message}</div>
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

export default EmployeeEdit;
