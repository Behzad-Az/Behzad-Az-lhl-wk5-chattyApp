import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {currUsername: "", currMessage: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMsgChange = this.handleMsgChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addMsgFcn(this.state.currUsername, this.state.currMessage);
    this.setState({currMessage: ""});
  }

  handleMsgChange(event) {
    event.preventDefault();
    this.setState({currMessage: event.target.value});
  }

  handleNameChange(event) {
    event.preventDefault();
    this.setState({currUsername: event.target.value});
  }

  render() {
    console.log("componentDidMount <ChatBar />");
    return (
      <footer>
        <form onSubmit={this.handleSubmit}>
          <input id="username" type="text" placeholder="Your Name (Optional)" onChange={this.handleNameChange} />
          <input id="new-message" type="text" value={this.state.currMessage} placeholder="Type a message and hit ENTER" onChange={this.handleMsgChange} />
          <input id="hidden-submit-btn" type="submit" />
        </form>
      </footer>
    );
  }
}
export default ChatBar;
