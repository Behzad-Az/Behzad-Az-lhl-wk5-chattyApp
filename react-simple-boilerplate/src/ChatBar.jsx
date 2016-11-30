import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {currMessage: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addMsgFcn(this.props.username, this.state.currMessage);
    this.setState({currMessage: ""});
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({currMessage: event.target.value});
  }

  render() {
    console.log("componentDidMount <ChatBar />");
    return (
      <footer>
        <input id="username" type="text" placeholder="Your Name (Optional)" value={this.props.username} />
        <form onSubmit={this.handleSubmit}>
          <input id="new-message" type="text" value={this.state.currMessage} placeholder="Type a message and hit ENTER" onChange={this.handleChange} />
        </form>
      </footer>
    );
  }
}
export default ChatBar;
