import React, {Component} from 'react';

class Message extends Component {

  render () {
    let thisMessage = this.props.message;
    let regEx = /(http|https?:\/\/[^\s]+)(.png|.jpg|.gif)/g;
    let msgUrl = thisMessage.content.match(regEx);
    let msgTxt = thisMessage.content.replace(msgUrl, "");

    return (
        <div className="message">
          <span className="username" style={thisMessage.fontColor}>{thisMessage.username}</span>
          <span className="content">
            <div className="arrow-left"></div>
            <p>{msgTxt}</p>
            <img className="picture" src={msgUrl}/>
          </span>
        </div>
    );
  }
}

export default Message;
