import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './NavigationBar.css';

class NavigationBar extends Component {
	render() {
		return (
			<header>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<div className="navbar-brand">Schichtenschmiede</div>
					<ul className="navbar-nav">
						<li class="nav-item"><Link class="nav-link" to="/shiftplan">Wochenplan</Link></li>
						<li class="nav-item"><Link class="nav-link" to="/shift">Schichten</Link></li>
						<li class="nav-item"><Link class="nav-link" to="/employee">Mitarbeiter</Link></li>
						<li class="nav-item"><Link class="nav-link" to="/roles">Rollen</Link></li>
					</ul>
				</nav>
			</header>
		);
	}
}

export default NavigationBar;