import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './NavigationBar.css';

class NavigationBar extends Component {
	render() {
		return (

			<nav>
				<ul>
					<li><Link to="#">Wochenplan</Link></li>
					<li><Link to="#">Schichten</Link></li>
					<li><Link to="/employee">Mitarbeiter</Link></li>
					<li><Link to="/roles">Rollen</Link></li>
				</ul>
			</nav>
		);
	}
}

export default NavigationBar;

/*
import { Link } from 'react-router-dom'
const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/search'>Search</Link></li>
      </ul>
    </nav>
  </header>
)
* */