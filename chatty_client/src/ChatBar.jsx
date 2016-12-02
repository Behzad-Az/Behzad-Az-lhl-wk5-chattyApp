import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currUsername: this.props.username,
      currMessage: ""
    };
    this.handleMsgChange = this.handleMsgChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  componentDidMount() {
    document.querySelector('#new-message').addEventListener('keypress', (event) => {
      let key = event.which || event.keyCode;
      if (key === 13) {
        this.props.addMsgFcn(this.state.currUsername, this.state.currMessage);
        this.setState({currMessage: ""});
      }
    });

    document.querySelector('#username').addEventListener('keypress', (event) => {
      let key = event.which || event.keyCode;
      if (key === 13) {
        if (this.state.currUsername) {
          this.props.userChangedFcn(this.state.currUsername);
        }
      }
    });
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
    // console.log("componentDidMount <ChatBar />");
    return (
      <footer>
        <input id="username" type="text" placeholder="Your Name (Optional)" onChange={this.handleNameChange} />
        <input id="new-message" type="text" value={this.state.currMessage} placeholder="Type a message and hit ENTER" onChange={this.handleMsgChange} />
      </footer>
    );
  }
}
export default ChatBar;
