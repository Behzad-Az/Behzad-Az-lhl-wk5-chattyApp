import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <div id="message-list">
        {
          this.props.messageArr.map((message, index) => {
            return <Message key={message.id} message={message} />
          })
        }
        <div className="message system">
          {this.props.systemNotification}
        </div>
      </div>
    );
  }
}
export default MessageList;
