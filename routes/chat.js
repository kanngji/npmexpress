const express = require('express');
const router = express.Router();
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 7777 });

wss.on('connection', (ws) => {
  // wss 웹 소켓 서버
  wss.clients.forEach((client) => {
    client.send(
      `새로운 유저가 참가 했습니다. 현재 유저 수는 ${wss.clients.size}`
    );
  });
  //   ws.send('저는 서버입니다. 들리십니까?');
  //   ws.on('message', (message) => {
  //     console.log(message.toString());
  //   });
  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      client.send(`${message}`);
    });
  });

  ws.on('close', () => {
    wss.clients.forEach((client) => {
      client.send(`유저 한명이 나갔습니다. 현재 유저 수 ${wss.client.size}`);
    });
  });
});

router.get('/', (req, res) => {
  res.render('chat');
});
module.exports = router;
