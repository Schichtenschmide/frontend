import React, { Component } from 'react';
import './NavigationBar.css';

class NavigationBar extends Component {
	render() {
		return (
			 <nav>
				<ul>
				 <li><a href="#">Wochenplan</a></li>
					<li> <a href="#">Schichten</a></li>
					<li> <a href="#">Mitarbeiter</a></li>
					<li> <a href="#">Rollen</a></li>
				</ul>
			 </nav>
		);
	}
}

export default NavigationBar;
