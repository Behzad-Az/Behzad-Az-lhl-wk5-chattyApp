// server.js

const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  //.use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

const colorArr = ["FF1053", "#F9C80E", "#F86624", "#43BCCD", "#662E9B",
                  "#78D64B", "#F2C14E", "#F78154", "#4D9078", "#B4436C"];

let messageArr = [];
let userCount = 0;

function sendToClient(wss, type, sysNotif, newMessage, username) {
  let outObj = {
    type: type,
    systemNotification: sysNotif,
    message: newMessage,
    username: {name: username}
  };
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(outObj));
  });
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  sendToClient(wss, "update online users", `${wss.clients.length} user(s) online`);

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    sendToClient(wss, "update online users", `${wss.clients.length} users online`);
  });

  ws.on('message', (incomingMsg) => {
    let parsedMsg = JSON.parse(incomingMsg);
    let prevUser = ws.username || "Anonymous";
    let newUserNotif = "";


    // switch(data.type) {
    //   case "incomingMessage":
    //     // handle incoming message
    //     break;
    //   case "incomingNotification":
    //     // handle incoming notification
    //     break;
    //   default:
    //     // show an error in the console if the message type is unknown
    //     throw new Error("Unknown event type " + data.type);
    // }




    if (parsedMsg.type === "new message") {
      let existingUser = false;
      let colorIndex = userCount % colorArr.length;
      ws.username = ws.username || "Anonymous";
      parsedMsg.username = parsedMsg.username || "Anonymous";

      messageArr.forEach((msg) => {
        if (msg.username === parsedMsg.username) {
          existingUser = true;
          colorIndex = colorArr.indexOf(msg.fontColor.color);
        }
      });

      if (!existingUser) { userCount++; }
      parsedMsg.fontColor = { color: colorArr[colorIndex] };
      parsedMsg.id = messageArr.length;
      messageArr.push(parsedMsg);

      if (parsedMsg.username !== ws.username && parsedMsg.username !== "Anonymous") {
        newUserNotif = `${ws.username} change name to ${parsedMsg.username}...`;
        ws.username = parsedMsg.username;
      }
      sendToClient(wss, "new message", newUserNotif, parsedMsg, ws.username);

    } else if (parsedMsg.type === "user change") {
      ws.username = ws.username || "Anonymous";
      newUserNotif = `${ws.username} change name to ${parsedMsg.username}...`;
      ws.username = parsedMsg.username;
      sendToClient(wss, "user change", newUserNotif, "", ws.username)
    }

  });
});



// componentDidMount: function() {
//   console.log("componentDidMount <App />");
//   this.socket = new WebSocket("ws://localhost:4000/socketserver");

//   this.socket.onopen = (event) => {
//     console.log("Connected to server");
//   };

//   this.socket.onmessage = (event) => {
//     console.log(event);
//     // The socket event data is encoded as a JSON string.
//     // This line turns it into an object
//     const data = JSON.parse(event.data);
//     switch(data.type) {
//       case "incomingMessage":
//         // handle incoming message
//         break;
//       case "incomingNotification":
//         // handle incoming notification
//         break;
//       default:
//         // show an error in the console if the message type is unknown
//         throw new Error("Unknown event type " + data.type);
//     }
//   };
// },

