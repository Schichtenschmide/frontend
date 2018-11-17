import React, {Component} from 'react';
import './App.css';
import RolesContainer from "../roles-conatiner/RolesContainer";
import NavigationBar from "../navigation-bar/NavigationBar";
import Footer from "../footer/Footer";
import EmployeeContainer from "../employee-container/EmployeeContainer";
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch";

class App extends Component {
	render() {
		return (
			<span>
				<div id="logo">Logo</div>
				<NavigationBar/>
				<Switch>
					<Route exact path='/' component={EmployeeContainer}/>
					<Route path='/employee' component={EmployeeContainer}/>
					<Route path='/roles' component={RolesContainer}/>
				</Switch>
				<Footer/>
			</span>
		);
	}
}

export default App;
