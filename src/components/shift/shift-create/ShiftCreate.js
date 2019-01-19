import React, {Component} from "react";
import {baseUrlForTheBackend} from "../../../constants";
import axios from "axios";
import $ from "jquery";


class ShiftCreate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			startTime: '',
			endTime: '',
			employeeCount: '',
			isActive: '',
			isMonday: '',
			isTuesday: '',
			isWednesday: '',
			isThursday: '',
			isFriday: '',
			isSaturday: '',
			isSunday: '',
			roles: [],
			roleId: '',
			message: null
		};

		this.modalRef = React.createRef();

	}

	addShift() {
		if (this.state.roleId === '') {
			this.setState({message:"Bitte wählen Sie eine Rolle"})
		} else {
			axios.post(baseUrlForTheBackend + '/shifts2', {
				name: this.state.name,
				startTime: this.state.startTime,
				endTime: this.state.endTime,
				employeeCount: this.state.employeeCount,
				isActive: this.state.isActive,
				isMonday: this.state.isMonday,
				isTuesday: this.state.isTuesday,
				isWednesday: this.state.isWednesday,
				isThursday: this.state.isThursday,
				isFriday: this.state.isFriday,
				isSaturday: this.state.isSaturday,
				isSunday: this.state.isSunday,
				roleId: this.state.roleId
			})
				.then(() => {
					this.setState({message: null});
					this.hide();

					this.props.onDataSubmit();

				})
				.catch(() => {
					this.setState({message: "Es ist ein Fehler aufgetreten"});
					this.show();
				});
		}
	};

	componentDidMount() {
		this.fetchRoles()
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

	handleInputChange = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	};
	hide() {
		$(this.modalRef.current).modal("hide");
	};

	show() {
		$(this.modalRef.current).modal("show");
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.addShift();
	};

	render() {
		const roleList = this.state.roles.map((el, index) => (
			<option key={index} value={el.identifier}>{el.name}</option>
		));

		let time = [];
		for (let i = 0; i <= 24; i++) {
			if (i < 10) {
				time.push({value: i, time: '0' + i + ':00'})
			} else {
				time.push({value: i, time: i + ':00'})
			}
		}
		const timeList = time.map((el, index) => (
			<option
				key={index}
				value={el.value}
			>
				{el.time}
			</option>
		));

		return (
			<div>
				<button className="btn btn-primary" data-toggle="modal" data-target="#createShiftDialog">
					Schicht hinzufügen
				</button>

				<div ref={this.modalRef} className="modal fade" id="createShiftDialog" tabIndex="-1" role="dialog"
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
								<form>
									<label htmlFor="name">Name</label>
									<input name={'name'} type="text" id="name" value={this.state.name}
										   onChange={this.handleInputChange} className="form-control"/>
									<div className="form-row">
										<div className="col">
											<label htmlFor="startTime">Von</label>
											<select name={'startTime'}
													id="startTime"
													value={this.state.startTime}
													onChange={this.handleInputChange}
													className="form-control"
											>
												<option/>
												{timeList}
											</select>
										</div>
										<div className="col">
											<label htmlFor="startTime">Bis</label>
											<select name={'endTime'}
													id="endTime"
													value={this.state.endTime}
													onChange={this.handleInputChange}
													className="form-control"
											>
												<option/>
												{timeList}
											</select>
										</div>
									</div>
									<div className="form-check">
										<input
											name={'isMonday'}
											defaultChecked={this.state.isMonday}
											type="checkbox"
											id="monday"
											className="form-check-input"
											onClick={this.handleInputChange}
										/>
										<label className="form-check-label" htmlFor="monday">
											Montag
										</label>
									</div>
									<div className="form-check">
										<input
											name={'isTuesday'}
											defaultChecked={this.state.isTuesday}
											type="checkbox"
											id="tuesday"
											className="form-check-input"
											onClick={this.handleInputChange}
										/>
										<label className="form-check-label" htmlFor="tuesday">
											Dienstag
										</label>
									</div>
									<div className="form-check">
										<input
											name={'isWednesday'}
											className="form-check-input"
											type="checkbox"
											id="wednesday"
											defaultChecked={this.state.isWednesday}
											onClick={this.handleInputChange}
										/>
										<label className="form-check-label" htmlFor="wednesday">
											Mittwoch
										</label>
									</div>
									<div className="form-check">
										<input
											name={'isThursday'}
											className="form-check-input"
											type="checkbox"
											id="thursday"
											defaultChecked={this.state.isThursday}
											onClick={this.handleInputChange}
										/>
										<label className="form-check-label" htmlFor="thursday">
											Donnerstag
										</label>
									</div>
									<div className="form-check">
										<input
											name={'isFriday'}
											className="form-check-input"
											type="checkbox"
											id="friday"
											defaultChecked={this.state.isFriday}
											onClick={this.handleInputChange}
										/>
										<label className="form-check-label" htmlFor="friday">
											Freitag
										</label>
									</div>
									<div className="form-check">
										<input
											name={'isSaturday'}
											className="form-check-input"
											type="checkbox"
											id="saturday"
											defaultChecked={this.state.isSaturday}
											onClick={this.handleInputChange}
										/>
										<label className="form-check-label" htmlFor="saturday">
											Samstag
										</label>
									</div>
									<div className="form-check">
										<input
											name={'isSunday'}
											className="form-check-input"
											type="checkbox"
											id="sunday"
											defaultChecked={this.state.isSunday}
											onClick={this.handleInputChange}
										/>
										<label className="form-check-label" htmlFor="sunday">
											Sonntag
										</label>
									</div>
									<label htmlFor="employeeCount">Anzahl Mitarbeiter</label>
									<input name={'employeeCount'} type="number" id="employeeCount"
										   value={this.state.employeeCount} onChange={this.handleInputChange}
										   className="form-control"/>
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
									</div>
									<div className="form-check">
										<input name={'isActive'} type="checkbox" id="isActive"
											   value={this.state.isActive} onChange={this.handleInputChange}/>
										<label htmlFor="isActive">Aktive Schicht</label>
									</div>
									<div id="message">{this.state.message}</div>
									<div className="modal-footer">
										<button type="button"
												onClick={(e) => {
													this.handleSubmit(e, false)
												}}
												className="btn btn-primary">
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
		);
	}
}

export default ShiftCreate;
