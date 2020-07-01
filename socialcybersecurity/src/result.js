import React from 'react';

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "error: no message"
    }
  }

  componentDidMount() {
    fetch('/result')
      .then(response => response.json())
      .then(data => this.setState({msg: data['msg']}));
  }

  render() {
	return (
	  <div className="Result">
	    <header className="result-header">
	      <h1>
	        {this.state.msg}}
	      </h1>
	    </header>
	  </div>
	);
  }
}

export default Result;
