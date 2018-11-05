import React, {Component} from 'react';
import './App.css';
import RolesContainer from "../roles-conatiner/RolesContainer";
import NavigationBar from "../navigation-bar/NavigationBar";
import Footer from "../footer/Footer";
import EmployeeContainer from "../employee-container/EmployeeContainer";
import EmployeeCreateDialog from "../employee-create-dialog/EmployeeCreateDialog";
import RolesCreate from "../roles-create/RolesCreate";

class App extends Component {
	render() {
		return (
			<div id="mainBody">
				<div id="logo">
					Logo
				</div>
				<NavigationBar/>
				<div id="content">
					<div>'EmployeeContainer'</div>
					<EmployeeContainer/>
					<hr/>
					<div>'EmployeeCreateDialog'</div>
					<EmployeeCreateDialog/>
					<hr/>
					<div>'RolesContainer'</div>
					<RolesContainer/>
					<hr/>
					<div>'RolesCreate'</div>
					<RolesCreate/>

				</div>

				<Footer/>
			</div>
		);
	}
}

export default App;
