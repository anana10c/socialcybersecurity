import React from 'react';
import { Redirect } from 'react-router';

class Username extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      submitted: false
    }
  }

  handleNameChange = event => {
    this.setState({name: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();
    fetch(`${localStorage.getItem('ip')}/username`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'name': this.state.name}),
    })
    .then(response => response.json())
    .then(data => {console.log('Success:', data);
                   this.setState({submitted: true});})
    .catch((error) => {console.error('Error:', error);});
  }

  render() {
    if (this.state.submitted) {
      return (<Redirect to='/socialcybersecurity/login-questions' />);
    }

    return (
      <div className="Username">
        <header className="username-header">
          <h3>
            hello!
          </h3>
          <form onSubmit={this.handleSubmit}>
            <label>enter your username</label><br/>
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleNameChange} /><br/><br/>
            <input type="submit" value="Continue" />
          </form>
        </header>
      </div>
    );
  }
}

export default Username;