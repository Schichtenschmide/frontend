import React, { Component } from 'react';
import './EmployeeContainer.css';
import EmployeeCreateDialog from "../employee-create-dialog/EmployeeCreateDialog";

class EmployeeContainer extends Component {
    render() {
        return (
            <div className="EmployeeContainer">
                <h1>Mitarbeiter</h1>
                <div className="EmployeeTable">
                    Lorem
                </div>
                <input type="button" value="+ Hinzufügen"/>
				<div>'EmployeeCreateDialog'</div>
				<EmployeeCreateDialog/>
            </div>
        );
    }
}

export default EmployeeContainer;
