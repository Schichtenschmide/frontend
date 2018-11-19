import React, { Component } from 'react';
import './EmployeeContainer.css';
import EmployeeCreateDialog from "../employee-create-dialog/EmployeeCreateDialog";
import EmployeeTable from "../employee-table/EmployeeTable";

class EmployeeContainer extends Component {
    render() {
        return (
            <div className="EmployeeContainer">
                <h1>Mitarbeiter</h1>
                <EmployeeTable/>
				<EmployeeCreateDialog/>
            </div>

        );
    }
}

export default EmployeeContainer;
