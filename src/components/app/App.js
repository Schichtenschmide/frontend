import React, {Component} from 'react';
import './App.css';
import Snow from 'let-it-snow';
import RolesContainer from "../roles/roles-container/RolesContainer";
import NavigationBar from "../navigation-bar/NavigationBar";
import Footer from "../footer/Footer";
import EmployeeContainer from "../employee/employee-container/EmployeeContainer";
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch";
import ShiftPlanContainer from "../shiftplan/shiftplan-container/shiftPlanContainer";
import ShiftContainer from "../shift/shift-container/ShiftContainer";

class App extends Component {
	render() {
		return (
			<span>
				<NavigationBar/>
				<div id="content" style={{ position:'relative'}}>
            		<Snow />
					<Switch>
						<Route exact path='/' component={ShiftPlanContainer}/>
						<Route path='/shiftplan' component={ShiftPlanContainer}/>
						<Route path='/shift' component={ShiftContainer}/>
						<Route path='/employee' component={EmployeeContainer}/>
						<Route path='/roles' component={RolesContainer}/>
					</Switch>
				</div>
				<Footer/>
			</span>
		);
	}
}

export default App;
