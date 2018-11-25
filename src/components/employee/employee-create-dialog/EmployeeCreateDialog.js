import React, { Component } from 'react';


class EmployeeCreateDialog extends Component {

	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			employmentRate : '',
			isActive : ''

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

		console.log(this.state.firstName);
		console.log(this.state.lastName);
		console.log(this.state.employmentRate);
		console.log(this.state.isActive);
		event.preventDefault();
	}

    render() {
        return (
			<div>
			<button className="btn btn-primary" data-toggle="modal" data-target="#createEmployeeDialog">
			Mitarbeiter hinzufügen
		</button>
		<div className="modal fade" id="createEmployeeDialog" tabIndex="-1" role="dialog"
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
							<input name={'firstName'} type="text" id="firstName" value={this.state.firstName} onChange={this.handleInputChange} className="form-control"/>
                            <label htmlFor="lastName">Nachname</label>
							<input name={'lastName'} type="text" id="lastName" value={this.state.lastName} onChange={this.handleInputChange} className="form-control"/>
                            <label htmlFor="employmentRate">Stellenprozenzsatz</label>
							<input name={'employmentRate'} type="number" id="employmentRate" value={this.state.employmentRate} onChange={this.handleInputChange} className="form-control"/>
							<input name={'isActive'} type="checkbox" id="isActive" value={this.state.isActive} onChange={this.handleInputChange}/>
							<label htmlFor="isActive">Aktiver Mitarbeiter</label>
							< div className="modal-footer">
								<button type="button" onClick={this.handleSubmit} className="btn btn-primary">
									Speichern
								</button>
								<button type="button" onClick={this.handleSubmit} className="btn btn-primary mr-1" data-dismiss="modal">
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

export default EmployeeCreateDialog;
