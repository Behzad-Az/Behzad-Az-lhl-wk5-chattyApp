import React, {Component} from 'react';

class Message extends Component {
  render () {
    console.log("componentDidMount <Message />");
    let thisMessage = this.props.message;
    return (
      <div className="message">
        <span className="username">{thisMessage.username}</span>
        <span className="content">{thisMessage.content}</span>
      </div>
    );
  }
}

export default Message;
