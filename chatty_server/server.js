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

// function sendToClient(ws, id, )

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  // console.log('Client connected');

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  // ws.on('close', () => console.log('Client disconnected'));

  ws.on('message', (incomingMsg, socket) => {
    let parsedMsg = JSON.parse(incomingMsg);
    let prevUser = ws.username || "Anonymous";

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
      messageArr.push(parsedMsg);

      if (parsedMsg.username !== ws.username && parsedMsg.username !== "Anonymous") {
        parsedMsg.newUserMsg = `${ws.username} change name to ${parsedMsg.username}...`;
        ws.username = parsedMsg.username;
      } else {
        parsedMsg.newUserMsg = "";
      }

      wss.clients.forEach((client) => {
        client.send(JSON.stringify(parsedMsg));
      });

    } else if (parsedMsg.type === "user change") {
      let msgToClient = `${prevUser} change name to ${parsedMsg.username}...`;
      ws.username = parsedMsg.username;
      let outObj = {
          type: parsedMsg.type,
          content: msgToClient,
          username: {name: ws.username}
        };
      wss.clients.forEach((client) => {
        client.send(JSON.stringify(outObj));
      });
    }

  });
});

