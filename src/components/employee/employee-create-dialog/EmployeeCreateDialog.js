import React, { Component } from 'react';
import './EmployeeCreateDialog.css';

class EmployeeCreateDialog extends Component {
    render() {
        return (
            <div className="EmployeeCreateDialog">
                <div>
                    <label htmlFor="name">Name</label><input id={"name"} type="text"/>
                </div>
            </div>
        );
    }
}

export default EmployeeCreateDialog;
