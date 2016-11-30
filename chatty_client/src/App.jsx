import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const colorArr = ["#00C8F8", "#FFC33C", "#59C4C5", "#FBE2B4", "#EF9950",
                  "#78D64B", "#F2C14E", "#F78154", "#4D9078", "#B4436C"];

let data = {
  // currentUser: {name: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
  userCount: 2,
  messages: [
    {
      id: 0,
      username: "Bob",
      content: "Has anyone seen my marbles?",
      bgColor: {backgroundColor: colorArr[0 % colorArr.length]}
    },
    {
      id: 1,
      username: "Anonymous",
      content: "No, I think you lost the. You lost your marbles Bob. You lost them for good.",
      bgColor: {backgroundColor: colorArr[1 % colorArr.length]}
    }
  ],
  notification: ""
};



class App extends Component {

  constructor(props) {
    super(props);
    //this.state = Object.assign(data, {currentUser: {name: this.props.username || "Anynomous"}});
    this.state = data;
    this.addMessage = this.addMessage.bind(this);
  }

  // componentDidMount() {
  //   console.log("componentDidMount <App />");
  //   setTimeout(() => {
  //     console.log("Simulating incoming message");
  //     // Add a new message to the list of messages in the data store
  //     const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
  //     const messages = this.state.messages.concat(newMessage)
  //     // Update the state of the app component.
  //     // Calling setState will trigger a call to render() in App and all child components.
  //     this.setState({messages: messages})
  //   }, 3000);
  // }

  addMessage(username, content) {
    console.log("Adding message....");
    if (!content) {
      this.setState({notification: "Please enter a message first"});
      setTimeout(() => {this.setState({notification: ""})}, 1000);
    }

    else {
      let existingUser = false;
      let colorIndex = this.state.userCount % colorArr.length;
      username = username || "Anynomous";

      this.state.messages.forEach((msg) => {
        if (msg.username === username) {
          existingUser = true;
          colorIndex = colorArr.indexOf(msg.bgColor.backgroundColor);
        }
      });

      if (!existingUser) { this.state.userCount += 1; }

      const newMessage = {
        id: this.state.messages.length,
        username: username,
        content: content,
        bgColor: {backgroundColor: colorArr[colorIndex]}
      };
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages});
    }
  }

  render() {
    return (
      <div>
        <nav id="chattyNavBar">
          <div className="app-notifications">{this.state.notification}</div>
          <h1>Chatty</h1>
        </nav>
        <div className="wrapper">
          <MessageList messageArr={this.state.messages}/>
          <ChatBar addMsgFcn={this.addMessage}/>
        </div>
      </div>
    );
  }
}
export default App;
