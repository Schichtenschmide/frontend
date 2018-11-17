import React, {Component} from 'react';
import './App.css';
import RolesContainer from "../roles-conatiner/RolesContainer";
import NavigationBar from "../navigation-bar/NavigationBar";
import Footer from "../footer/Footer";
import EmployeeContainer from "../employee-container/EmployeeContainer";
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch";
import ShiftPlanContainer from "../shiftplan-container/shiftPlanContainer";
import ShiftContainer from "../shift-container/ShiftContainer";

class App extends Component {
	render() {
		return (
			<span>
				<NavigationBar/>
				<div id="content">
					<Switch>
						<Route exact path='/' component={EmployeeContainer}/>
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
