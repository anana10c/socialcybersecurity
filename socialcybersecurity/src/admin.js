import React from 'react';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      newUser: "",
      removedUsers: []
    }
  }

  componentDidMount() {
    fetch(`${localStorage.getItem('ip')}/admin_page`)
      .then(response => response.json())
      .then(data => this.setState({
                      users: (data['users']).map(
                        name => ({name: name, isChecked: false})
                      )
                    }));
  }

  handleNewUserChange = event => {
    this.setState({newUser: event.target.value});
  }

  handleRemoveUserChange = event => {
    const target = event.target;
    if (target.checked) {
      this.state.removedUsers.push(target.name);
    }
    else {
      for (var i = 0; i < this.state.removedUsers.length; i++) {
        if (this.state.removedUsers[i] == target.name) {
          this.state.removedUsers.splice(i, 1);
        }
      }
    }
  }

  handleNewUserSubmit = event => {
    event.preventDefault();
  	fetch(`${localStorage.getItem('ip')}/admin_page`, {
  		method: 'POST',
  		headers: {
  			'Content-Type': 'application/json',
  		},
  		body: JSON.stringify({form: 'newUser', newUser: this.state.newUser}),
  	})
  	.then(response => response.json())
  	.then(data => {console.log('Success:', data);})
  	.catch((error) => {console.error('Error:', error);});
    this.setState({users: [...this.state.users, {name: this.state.newUser, isChecked: false}],
                   newUser: ""});
  }

  handleRemoveUserSubmit = event => {
    event.preventDefault();
    fetch(`${localStorage.getItem('ip')}/admin_page`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({form: 'removeUsers', removedUsers: this.state.removedUsers}),
    })
    .then(response => response.json())
    .then(data => {console.log('Success:', data);})
    .catch((error) => {console.error('Error:', error);});
    this.setState({users: this.state.users.filter(user => !this.state.removedUsers.includes(user.name)),
                   removedUsers: []});
  }

  render() {
  	const checkboxes = this.state.users.map(user =>
  		(<React.Fragment>
  			<input name={user.name} id={user.name} type="checkbox" onChange={this.handleRemoveUserChange} />
  			<label for={user.name}> {user.name} </label> <br/>
  		</React.Fragment>));

    return (
      <div className="Admin">
        <header className="admin-header">
          <h3>
            this is the admin only page!
          </h3>
          <h4>
            ---register a new user---
          </h4>
          <form onSubmit={this.handleNewUserSubmit}>
            <label>enter username of new user:</label><br/>
            <input
              name="new"
              type="text"
              value={this.state.newUser}
              onChange={this.handleNewUserChange} /><br/><br/>
            <input type="submit" value="Register" />
          </form>
          <h4>
            ---remove users---
          </h4>
          <form onSubmit={this.handleRemoveUserSubmit}>
      			<p>current users:</p>
      			{checkboxes}<br/>
            <input type="submit" value="Remove" />
      		</form>
        </header>
      </div>
    );
  }
}

export default Admin;