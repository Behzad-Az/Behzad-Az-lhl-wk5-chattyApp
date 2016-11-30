import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("componentDidMount <MessageList />");
    return (
      <div id="message-list">
        {
          this.props.messageArr.map((message, index) => {
            return (
              <div key={message.id} style={message.bgColor}>
                <Message key={message.id} message={message} />
              </div>
            );
          })
        }
        <div className="message system">
          -------- message system status to be filled later on in the project ---------
        </div>
      </div>
    );
  }

}
export default MessageList;
