import React, {Component} from 'react';
import {RoleModel} from "../../models/DefaultRoleModel";


class RolesCreate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			roleName: ''
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleSubmit(event) {
		//TODO addRole
		RoleModel.addRole(this.state.roleName);
		console.log(this.state.roleName);
		//alert("A name was submitted: " + this.state.roleName);
		event.preventDefault();
	}


	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Rollenname<br/>
					<input
						name={'roleName'}
						type="text"
						value={this.state.roleName}
						onChange={this.handleInputChange}/>
				</label>
				<input type="submit" value="Rolle hinzufügen"/>
			</form>
		);
	}
}

export default RolesCreate;

/*
constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
* */