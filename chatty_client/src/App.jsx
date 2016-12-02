import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

let data = {
  currentUser: {name: "Anonymous"},
  socket: new WebSocket("ws://localhost:4000"),
  messages: [],
  navBarNotification: "",
  systemNotification: "",
  onlineUsers: ""
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = data;
    this.addMessage = this.addMessage.bind(this);
    this.userChanged = this.userChanged.bind(this);
  }

  componentDidUpdate() {
    let lastMsgDiv = document.getElementById("message-list").lastChild;
    lastMsgDiv.scrollIntoView();
  }

  componentDidMount() {
    this.state.socket.onopen = (event) => {
      console.log("Connected to server...");
    }

    this.state.socket.onmessage = (event) => {
      let parsedMsg = JSON.parse(event.data);

      switch(parsedMsg.type) {
        case "new message":
          const messages = this.state.messages.concat(parsedMsg.message);
          this.setState({
            messages: messages,
            systemNotification: parsedMsg.systemNotification,
            currentUser: parsedMsg.username
          });
          break;
        case "user change":
          this.setState({
            systemNotification: parsedMsg.systemNotification,
            currentUser: parsedMsg.username
          });
          break;
        case "update online users":
          this.setState({onlineUsers: parsedMsg.systemNotification});
          break;
        default:
          throw new Error("Unknown event type " + parsedMsg.type);
      }
    }
  }

  userChanged(newUser) {
    const serverMsg = {
      type: "user change",
      username: newUser
    };
    this.state.socket.send(JSON.stringify(serverMsg));
  }

  addMessage(username, content) {
    if (!content) {
      this.setState({navBarNotification: "Please enter a message first"});
      setTimeout(() => {this.setState({navBarNotification: ""})}, 1000);
    }
    else {
      const serverMsg = {
        type: "new message",
        id: this.state.messages.length,
        username: username,
        content: content
      };
      this.state.socket.send(JSON.stringify(serverMsg));
    }
  }

  render() {
    return (
      <div>
        <nav id="chattyNavBar">
          <h1>Chatty</h1>
          <div className="app-navBarNotifications">{this.state.navBarNotification}</div>
          <p>{this.state.onlineUsers}</p>
        </nav>
        <div className="wrapper">
          <MessageList messageArr={this.state.messages} systemNotification={this.state.systemNotification}/>
          <ChatBar addMsgFcn={this.addMessage} userChangedFcn={this.userChanged} username={this.state.currentUser.name} />
        </div>
      </div>
    );
  }
}
export default App;
