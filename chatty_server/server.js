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

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  // console.log('Client connected');

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  // ws.on('close', () => console.log('Client disconnected'));

  ws.on('message', (incomingMsg) => {
    let newMessage = JSON.parse(incomingMsg);
    let existingUser = false;
    let colorIndex = userCount % colorArr.length;
    newMessage.username = newMessage.username || "Anonymous";


    messageArr.forEach((msg) => {
      if (msg.username === newMessage.username) {
        existingUser = true;
        colorIndex = colorArr.indexOf(msg.fontColor.color);
      }
    });

    if (!existingUser) { userCount++; }

    newMessage.fontColor = { color: colorArr[colorIndex] };

    messageArr.push(newMessage);

    wss.clients.forEach((client) => {
      client.send(JSON.stringify(newMessage));
    });
  });


});

