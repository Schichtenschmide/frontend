import React, {Component} from 'react';
import icons from "glyphicons";
import validationSettings from "../../../validationSettings";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios/index";
import {baseUrlForTheBackend} from "../../../constants";
import $ from "jquery";

class DailyScheduleEdit extends Component{
    constructor(props) {
        super(props);

        this.state = {
            dailyscheduleId: this.props.dailyscheduleId,
            shiftId: this.props.shiftId,
            employees: this.props.employees,
            employeeData: [],
            employeeId: '',
            employeesThatAreNeed: [],
            selectedEmployeesForTheShiftPlan: [],
            date: this.props.date,
            isActive: this.props.isActive,
            message: null


        };

        this.modalRef = React.createRef();
        this.validator = new SimpleReactValidator(validationSettings);
    };

    componentDidMount() {
        this.fetchEmployees();
    };
    fetchEmployees() {
        axios.get(baseUrlForTheBackend + '/employees')
            .then(({data}) => {
                this.setState({
                    employeeData: data,
                    message: null
                });
            })
            .catch(() => {
                this.setState({message:"Mitarbeiter konnten nicht geladen werden."})
            });
    };

    saveDailySchedule = () => {
        const message = '#addEmployeeToShiftPlanMessage' + this.props.shiftPlanId;

        axios.put(baseUrlForTheBackend + '/dailyschedules/' + this.props.dailyscheduleId + '/addEmployee/' + this.state.employeeId)
            .then((response) => {
                console.log('then');
                console.log(response);
                $(message).empty().html("Mitarbeiter wurde hinzugefügt");
                axios.get(baseUrlForTheBackend + '/dailyschedules/' + this.props.dailyscheduleId)
                    .then(({data}) => {
                        this.setState({
                            employees: data.employees
                        });
                        console.log(data);
                    })
                    .catch(function (error) {
                        console.log('catch');
                        console.log(error);
                    });
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
            this.saveDailySchedule();
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
        const employeeList = this.state.employeeData.map((el, index) => (<option key={index}
            value={el.identifier}>{el.firstName} {el.lastName}</option>
        ));
        const employeeListSelectedForTheShiftPlan = this.state.employees.map((el, index) => (
            <div key={index} value={el.identifier}>{el.firstName} {el.lastName}</div>
        ));

        return (
            <div>
                <button className="btn btn-secondary" data-toggle="modal"
                        data-target={'#editDailyScheduleDialog' + this.props.dailyscheduleId}>
                    {icons.pencil}
                </button>
                <div ref={this.modalRef} className="modal fade" id={'editDailyScheduleDialog' + this.props.dailyscheduleId} tabIndex="-1"
                     role="dialog"
                     aria-labelledby="editEmployeeDialogTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Tagesplan: Mitarbeiter hinzufügen</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div>
                                        <div>Schicht</div>
                                        <table>
                                            <tbody>
                                            <tr>
                                                <td>Name</td>
                                                <td>{this.props.shift.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Rolle</td>
                                                <td>{this.props.shift.role.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Zeit</td>
                                                <td>{this.props.shift.startTime} bis {this.props.shift.endTime}</td>
                                            </tr>
                                            <tr>
                                                <td>Datum</td>
                                                <td>{this.props.date}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="employee">Mitarbeiter</label>
                                        <select className="form-control"
                                                name={'employeeId'}
                                                id="employee"
                                                onChange={this.handleInputChange}
                                        >
                                            <option/>
                                            {employeeList}
                                        </select>
                                    </div>
                                    {employeeListSelectedForTheShiftPlan}
                                    <div id={'addEmployeeToShiftPlanMessage' + this.props.dailyscheduleId}/>
                                    <div className="modal-footer">
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

export default DailyScheduleEdit;