import React, {Component} from 'react';
import './App.css';
import RolesContainer from "../roles-conatiner/RolesContainer";
import NavigationBar from "../navigation-bar/NavigationBar";
import Footer from "../footer/Footer";

class App extends Component {
	render() {
		return (
			<div id="mainBody">
				<div id="logo">
					Logo
				</div>
				<NavigationBar/>
				<div id="content">
					<RolesContainer/>
				</div>
				<Footer/>
			</div>
		);
	}
}

export default App;
