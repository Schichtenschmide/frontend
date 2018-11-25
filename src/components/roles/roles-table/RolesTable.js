import React, {Component} from 'react';
import axios from 'axios';
import {baseUrlForTheBackend} from "../../../constants";
import RolesEdit from "../roles-edit/RolesEdit";


class RolesTable extends Component {

	constructor(props) {
		super(props);

		this.state = {
			roleData:[]
		};
	}

	componentDidMount(){
		axios
			.get(baseUrlForTheBackend + '/roles')
			.then(({ data })=> {
				this.setState({
					roleData: data
				});
			})
			.catch((err)=> {})
	}

	render() {
		/*
		const child = this.state.roleData.map((el,index) => {
			return <div key={index}>
				<p>Title - { el.name }</p>

			</div>

		});
		*/
		const listItems = this.state.roleData.map((el,index) =>
			<tr  key={index}>
				<td>{el.name}</td>
				<td><span id="edit" className="glyphicon glyphicon-pencil"><RolesEdit roleName={el.name} roleId={el.stid}/></span></td>
				<td><span id ="delete" className="glyphicon glyphicon-trash"><a href={el.links[0].href} >l&ouml;schen</a></span></td>

			</tr>
		);
		console.log(this.state.roleData);
		return <table className="table">
			<thead className="thead-light">
			<tr>
				<th scope="col">Rolle</th>
				<th scope="col">&nbsp;</th>
				<th scope="col">&nbsp;</th>
			</tr>
			</thead>
			<tbody>
			{listItems}
			</tbody>
		</table>




	}
	/*

	constructor(props) {
		super(props);
		this.state = {
			data: '',
			name:'bob'
		}

	}

	 callAPI(){
		axios
			.get(baseUrlForTheBackend + '/roles')
			.then(({ roles })=> {
				console.log(roles);
				this.setState({
					data: roles
				});
			})
			.catch((err)=> {})
	}

	render(){



		function RolesList() {


			return (<div></div>);

			/*
			const listItems = this.state.data.map((role) =>
				<tr  key={role}>
					<td>{role}</td>
					<td><span className="glyphicon glyphicon-pencil">bearbeiten</span></td>
					<td><span className="glyphicon glyphicon-trash">löschen</span></td>
				</tr>
			);
			return (
				<table className="table">
					<thead className="thead-light">
					<tr>
						<th scope="col">Rolle</th>
						<th scope="col">-</th>
						<th scope="col">-</th>
					</tr>
					</thead>
					<tbody>
						{listItems}
					</tbody>
				</table>
			);
			*/
	/*
		}

		return (
			this.callAPI(),
			<RolesList/>

		);
	}
	*/
}

export default RolesTable;

/*
constructor(props) {
    super(props);

    this.state = {
      kind: '',
      data: []
    };
  }

  componentDidMount(){
    axios
      .get('https://www.reddit.com/r/reactjs.json')
      .then(({ data })=> {
      	this.setState({
          kind: data.kind,
          data: data.data.children
        });
      })
      .catch((err)=> {})
  }

  render() {
    const child = this.state.data.map((el, index) => {
      return <div key={index}>
        <p>Title - { el.data.title }</p>
        <p>Author - { el.data.author }</p>
      </div>
    });

    return <div>
      <p>{ this.state.kind }</p>
      <div>{ child }</div>
    </div>;
  }
 */