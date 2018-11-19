import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NavigationBar extends Component {
	render() {
		return (
			<header>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<div className="navbar-brand">Schichtenschmiede</div>
					<button className="navbar-toggler" type="button" data-toggle="collapse"
							data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
							aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
					<ul className="navbar-nav">
						<li class="nav-item"><Link class="nav-link" to="/shiftplan">Wochenplan</Link></li>
						<li class="nav-item"><Link class="nav-link" to="/shift">Schichten</Link></li>
						<li class="nav-item"><Link class="nav-link" to="/employee">Mitarbeiter</Link></li>
						<li class="nav-item"><Link class="nav-link" to="/roles">Rollen</Link></li>
					</ul>
					</div>
				</nav>
			</header>
		);
	}
}

export default NavigationBar;