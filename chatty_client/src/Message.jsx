import React, {Component} from 'react';

class Message extends Component {
  render () {
    let thisMessage = this.props.message;
    // console.log("componentDidMount <Message />");
    return (
      <div className="message">
        <span className="username" style={thisMessage.fontColor}>{thisMessage.username}</span>
        <span className="content">{thisMessage.content}</span>
      </div>
    );
  }
}

export default Message;
