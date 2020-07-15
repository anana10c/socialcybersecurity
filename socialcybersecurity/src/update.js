import React from 'react';

class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      agenda: [],
      submitted: false
    }
  }

  componentDidMount() {
    fetch(`${localStorage.getItem('ip')}/notes`)
      .then(response => response.json())
      .then(data => this.setState({
                      users: (data['users']).map(
                        name => ({name: name, attendance: false, updates: [], todo: []})
                      )
                    }));
  }

  handleAgendaChange = event => {
    this.setState({agenda: event.target.value.split('\n')});
  }

  handleAttendanceChange = event => {
    const target = event.target;
    const name = target.name.slice(0, -4);
    for (var i = 0; i < this.state.users.length; i++) {
	  if (this.state.users[i].name == name) {
	  	var newObj = this.state.users[i];
	    this.state.users.splice(i, 1);
	    if (target.checked) {
	      newObj.attendance = true;
	    }
	    else {
	      newObj.attendance = false;
	    }
	    this.state.users.splice(i, 0, newObj);
	  }
	}
  }

  handleUpdatesChange = event => {
    const target = event.target;
    const name = target.name.slice(0, -8);
    const updates = target.value.split('\n');
    for (var i = 0; i < this.state.users.length; i++) {
	  if (this.state.users[i].name == name) {
	  	var newObj = this.state.users[i];
	    this.state.users.splice(i, 1);
	    newObj.updates = updates;
	    this.state.users.splice(i, 0, newObj);
	  }
	}
  }

  handleTodoChange = event => {
    const target = event.target;
    const name = target.name.slice(0, -5);
    const todo = target.value.split('\n');
    for (var i = 0; i < this.state.users.length; i++) {
	  if (this.state.users[i].name == name) {
	  	var newObj = this.state.users[i];
	    this.state.users.splice(i, 1);
	    newObj.todo = todo;
	    this.state.users.splice(i, 0, newObj);
	  }
	}
  }

  handleSubmit = event => {
  	fetch(`${localStorage.getItem('ip')}/notes`, {
  		method: 'POST',
  		headers: {
  			'Content-Type': 'application/json',
  		},
  		body: JSON.stringify(this.state),
  	})
  	.then(response => response.json())
  	.then(data => {console.log('Success:', data);})
  	.catch((error) => {console.error('Error:', error);});
  	this.setState({submitted: true});
  }

  render() {
  	const attendance = this.state.users.map(user =>
  		(<React.Fragment>
  			<input name={user.name + "-att"} id={user.name + "-att"} type="checkbox" onChange={this.handleAttendanceChange} />
  			<label for={user.name + "-att"}> {user.name} </label> <br/>
  		</React.Fragment>));

  	const updates = this.state.users.map(user =>
  		(<React.Fragment>
  			<label for={user.name + "-updates"}> {user.name} updates: </label> <br/>
  			<textarea name={user.name + "-updates"} id={user.name + "-updates"} onChange={this.handleUpdatesChange} /><br/>
  		</React.Fragment>));

  	const todo = this.state.users.map(user =>
  		(<React.Fragment>
  			<label for={user.name + "-todo"}> {user.name} to-do: </label> <br/>
  			<textarea name={user.name + "-todo"} id={user.name + "-todo"} onChange={this.handleTodoChange} /><br/>
  		</React.Fragment>));

    return (
      <div className="Update">
        <header className="update-header">
          <h3>
            update meeting notes
          </h3>
          <form onSubmit={this.handleSubmit}>
            <h4>Attendance</h4>
            {attendance}<br/>
            <label for="agenda">Agenda:</label><br/>
            <textarea
              name="agenda"
              id="agenda"
              onChange={this.handleAgendaChange} /><br/>
            <h4>Updates</h4>
            {updates}<br/>
            <h4>To-do</h4>
            {todo}<br/><br/>
            <input type="submit" value="Submit" />
          </form>
        </header>
      </div>
    );
  }
}

export default Update;
