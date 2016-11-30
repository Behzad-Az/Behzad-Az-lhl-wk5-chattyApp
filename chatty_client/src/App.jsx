import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

var data = {
  // currentUser: {name: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: 0,
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id: 1,
      username: "Anonymous",
      content: "No, I think you lost the. You lost your marbles Bob. You lost them for good."
    }
  ],
  notification: ""
};

class App extends Component {

  constructor(props) {
    super(props);
    //this.state = Object.assign(data, {currentUser: {name: this.props.username || "Anynomous"}});
    this.state = data;
    console.log(this.state.currentUser);
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
      username = username || "Anynomous";
      const newMessage = {
        id: this.state.messages.length,
        username: username,
        content: content
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
          <h1>Chatt</h1>
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
