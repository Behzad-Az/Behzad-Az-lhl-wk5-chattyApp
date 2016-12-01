import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const colorArr = ["FF1053", "#F9C80E", "#F86624", "#43BCCD", "#662E9B",
                  "#78D64B", "#F2C14E", "#F78154", "#4D9078", "#B4436C"];



//"#00C8F8", "#FFC33C", "#EF9950", "#FBE2B4", "#59C4C5"
let data = {
  currentUser: {name: "Anonymous"},
  socket: new WebSocket("ws://localhost:4000"),
  messages: [
    // {
    //   id: 0,
    //   username: "Bob",
    //   content: "Has anyone seen my marbles?",
    //   fontColor: {color: colorArr[0 % colorArr.length]}
    // },
    // {
    //   id: 1,
    //   username: "Anonymous",
    //   content: "No, I think you lost the. You lost your marbles Bob. You lost them for good.",
    //   fontColor: {color: colorArr[1 % colorArr.length]}
    // }
  ],
  navBarNotification: "",
  systemNotification: ""
};


class App extends Component {

  constructor(props) {
    super(props);
    this.state = data;
    this.addMessage = this.addMessage.bind(this);
    this.userChanged = this.userChanged.bind(this);
  }

  componentDidMount() {

    this.state.socket.onopen = (event) => {
      console.log("Connected to server...");
    }

    this.state.socket.onmessage = (event) => {
      let parsedMsg = JSON.parse(event.data);

      if (parsedMsg.type === "new message") {
        const messages = this.state.messages.concat(parsedMsg);
        console.log(parsedMsg);
        this.setState({messages: messages});

      } else if (parsedMsg.type === "user change") {
        this.setState({
          systemNotification: parsedMsg.content,
          currentUser: parsedMsg.username
        })






      }
    }
  }

  userChanged(newUser) {
    console.log("notifying of user change...");
    const serverMsg = {
      type: "user change",
      username: newUser
    };
    this.state.socket.send(JSON.stringify(serverMsg));
  }

  addMessage(username, content) {
    console.log("Adding message....");
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
          <div className="app-navBarNotifications">{this.state.navBarNotification}</div>
          <h1>Chatty</h1>
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
