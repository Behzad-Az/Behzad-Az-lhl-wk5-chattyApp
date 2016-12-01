import React, {Component} from 'react';

// let regEx = /(http?:\/\/[^\s]+)(.png|.jpg|.gif)/g;

class Message extends Component {
  // constructor(props) {
  //   super(props);
  //   let thisMessage = this.props.message;
  //   this.state = {
  //     messageURL: thisMessage.content.match(regEx),
  //     messageTxt: thisMessage.content.replace(thisMessage.content.match(regEx), "")
  //   };
  // }

  render () {
    let thisMessage = this.props.message;
    console.log("componentDidMount <Message />");
    let regEx = /(http?:\/\/[^\s]+)(.png|.jpg|.gif)/g;
    let msgUrl = thisMessage.content.match(regEx);
    let msgTxt = thisMessage.content.replace(msgUrl, "");

    return (
        <div className="message">
          <span className="username" style={thisMessage.fontColor}>{thisMessage.username}</span>
          <span className="content">
            <p>{msgTxt}</p>
            <img className="picture" src="http://www.w3schools.com/css/img_fjords.jpg"/>
          </span>
        </div>

    );
  }
}

export default Message;


// <div class="msg-container">
//   <div class="username">
//   </div>
//   <div class="message-stuff">
//   </div>
// </div>


// .username, .message-stuff {
//   float: left
// }

// .username {
//   width: 20%;
// }