const app = require('express')();
const http = require('http');
const fs = require('fs');
const { connected } = require('process');
const development_addr = "http://localhost";

// Hosts are Game Leader
// Hosts является руководителей игр
var connectedHosts = Array();

var httpServer = http.createServer(app);

var socket = require('socket.io')(httpServer, { 
    cors: {
      origin: development_addr,
      //origin: public_addr,
      methods: ["GET", "POST"]
    }
  });

  app.get('/', (req, res) => {
    res.writeHead(200);
    res.end("Wellcome to domino Gameserver.\n");
  });

  socket.on('connection', function(client) { 
    console.log("Connection ...", client.id);

    client.on('message', function(event) {
        if (event.typ == 'stack') {
            //console.log("Stack: ", event.dominostack);
            connectedHosts.push({id: client.id, c: client, dominostack: event.dominostack, name: 'John Doe', players: new Array()});
        }
        else if (event.typ == 'inviteID') {
            client.send({typ: 'inviteLink', id: client.id});
        }
        else if (event.typ == 'connectToGame') {
            connectedHosts.forEach(ch => {
                if (ch.id == event.id) {
                    var playerNames = new Array();
                    ch.players.push({gameclient: client, name: event.playername});
                    ch.players.forEach(player => {
                        playerNames.push(player.name);
                    });
                    playerNames.push(ch.name);
                    client.send({typ: "initClientGame", players: playerNames});
                    ch.c.send({typ: "newPlayer", players: playerNames});
                }
            });
        }
        else if (event.typ == 'name') {
            connectedHosts.forEach(ch => {
                if (ch.id == client.id){
                    ch.name = event.value;
                    console.log("Name of Player: ", ch.name);
                } 
            });
        }
    });
  });

  // Сервер ожидает новости
  httpServer.listen(3128);