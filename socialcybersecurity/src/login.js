import React from 'react';
import { Redirect } from 'react-router';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mcQuestion: "",
      mcChoices: {},
      shortQuestion: "",
      shortResponse: "",
      submitted: false
    }
  }

  componentDidMount() {
    fetch('/login_data')
      .then(response => response.json())
      .then(data => this.setState({name: data['name'],
								   mcQuestion: data['mcQuestion'],
								   mcChoices: data['mcChoices'],
								   shortQuestion: data['shortQuestion']}));
  }

  handleCheckChange = event => {
    const target = event.target;
    const newObj = {...this.state.mcChoices, [target.name]: target.checked}
    this.setState({mcChoices: newObj});
  }

  handleTextChange = event => {
    this.setState({shortResponse: event.target.value});
  }

  handleSubmit = event => {
  	fetch('/login_data', {
  		method: 'POST',
  		headers: {
  			'Content-Type': 'application/json',
  		},
  		body: JSON.stringify(this.state),
  	})
  	.then(response => response.json())
  	.then(data => {console.log('Success:', data);})
  	.catch((error) => {console.error('Error:', error);});
  	this.setState({submited: true});
  }

  render() {
  	const checkboxes = Object.keys(this.state.mcChoices).map(choice =>
  		(<React.Fragment>
  			<input name={choice} id={choice} type="checkbox" onChange={this.handleCheckChange} />
  			<label for={choice}> {choice} </label> <br/>
  		</React.Fragment>));

    return (
      <div className="Login">
        <header className="login-header">
          <h3>
            hello, {this.state.name}!
          </h3>
          <form onSubmit={this.handleSubmit}>
			<p>{this.state.mcQuestion}</p>
			{checkboxes}<br/>

			<label>{this.state.shortQuestion}</label><br/>
			<input
			  name="short"
			  type="text"
			  value={this.state.shortResponse}
			  onChange={this.handleTextChange} /><br/><br/>
			<input type="submit" value="Submit" />
		  </form>
        </header>
      </div>
    );
  }
}

export default Login;