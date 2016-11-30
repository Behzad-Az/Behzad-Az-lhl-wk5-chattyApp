import React, {Component} from 'react';

class Message extends Component {
  render () {
    let thisMessage = this.props.message;
    console.log("componentDidMount <Message />");
    return (
      <div className="message">
        <div style={thisMessage.fontColor}>
          <span className="username">{thisMessage.username}</span>
        </div>
        <span className="content">{thisMessage.content}</span>
      </div>
    );
  }
}

export default Message;
