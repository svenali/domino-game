// Склад
var stack = null;
// фисшки Игрока
var player = Array();
// последняя движеная фишка
var last_played_fischka = null;
// фишки на столе
var gamedesk = new CGameDesk();
// связь с сервером
var gameSocket = null;
// подключенные друзья
var friends = Array();

function destroyCanvas() {
    for (let i = 0; i < 7; i++) {
        for (let o = 0; o < 6; o++) {
            $('canvas').removeLayer("Fischka-"+i+"-"+o+'_shape').drawLayer();
            $('canvas').removeLayer("Fischka-"+i+"-"+o+'_img-left').drawLayer();
            $('canvas').removeLayer("Fischka-"+i+"-"+o+'_img-right').drawLayer();
        }
    }

    $('canvas').clearCanvas();
}

function startGame() {
    var editor_area = document.getElementById('pictures');    
    editor_area.innerHTML = 
        '<button name="startGame" onclick="nextPlayer()">Start (Пуск)</button><br/><br/><button name="inviteFriends" onclick="invitationLink()">Invite (Пригласи)</button><br><br>        <input id="gamer" type="text"><br/><button name="gamer_name" onclick="sendName()">Set (Присвой)</button>';

    var game_area = document.getElementById('gamecanvas');
    destroyCanvas();
    game_area.setAttribute('width','1280px');
    game_area.setAttribute('height','800px');
    
    // draw Stack
    stack = new CStack(1100,200,'Stack','canvas');
    stack.alignment();
    stack.draw();

    // create Fischki
    createGameFischki(stack, imgs);

    connectToGameServer(stack);
}

function nextPlayer() {
    if (gameSocket != null) {
        gameSocket.send("Test");
    }

    console.log('letztes Fischka: ', last_played_fischka.name);

    // удалить элемент в массиве player
    var delete_element = -1;
    for (let i=0; i<player.length; i++) {
        var e = player[i];
        if (e.name == last_played_fischka.name) {
            //e.name = 'gamedesk';
            gamedesk.add(e);
            delete_element = i;
        }
    }
    player = player.slice(0,delete_element).concat( player.slice(delete_element+1) );
    redrawAll();
    
    // сейчас компьютер управляет игру
    var editor_area = document.getElementById('pictures');    
    editor_area.innerHTML = '';
}

// Invite others
function invitationLink() {
    console.log("Get InviteLink", gameSocket);
    if (gameSocket != null) {
        gameSocket.send({typ: 'inviteID'});
    }
}

function sendName() {
    var name = document.getElementById("gamer").value;
    gameSocket.send({typ: 'name', value: name});
}

function connectToGameServer(stack) {
    gameSocket = new io('http://localhost:3128');
    gameSocket.connect(); 

    // Add a connect listener
    gameSocket.on('connect',function() {
        console.log('Client has connected to the server!');

        gameSocket.send({typ: 'stack', dominostack: JSON.stringify(stack)});
    });
    
    // Add a connect listener
    gameSocket.on('message',function(data) {
        console.log('Received a message from the server!',data);

        if (data.typ == 'inviteLink') {
            alert(data.id);
        }
        if (data.typ == 'newPlayer') {
            console.log("New Player registrated: ", data.players);
            var options = "";
            for (let i=0; i < data.players.length; i++) {
                console.log("Player: ", data.players[i]);
                options += '<option>' + data.players[i] + '</option>';
            }
            var player_area = document.getElementById('players');
            player_area.innerHTML = '<select name="playernames" id="player-select" multiple size="5">' + options + '</select>';      
        }
    });
    
    // Add a disconnect listener
    gameSocket.on('disconnect',function() {
        console.log('The client has disconnected!');
    });
}

/********************************************************************************************
 * 
 * Client Stuff / Исходный код для клиента
 * 
 ********************************************************************************************/
function connectToGameServerWithID(name, gameID) {
    gameSocket = new io('http://localhost:3128');
    gameSocket.connect(); 

    // Add a connect listener
    gameSocket.on('connect',function() {
        console.log('Client has connected to the server!');

        gameSocket.send({typ: 'connectToGame', id: gameID, playername: name});
    });
    
    // Add a connect listener
    gameSocket.on('message',function(data) {
        console.log('Received a message from the server!',data);

        if (data.typ == 'initClientGame') {
            initClientGame(data.players);
        }
    });
    
    // Add a disconnect listener
    gameSocket.on('disconnect',function() {
        console.log('The client has disconnected!');
    });
}

function connectToGame(name, id) {
    console.log("connect To ", name, " : ", id);

    connectToGameServerWithID(name, id);
}

function initClientGame(players) {
    var game_area = document.getElementById('gamecanvas');
    destroyCanvas();
    game_area.setAttribute('width','1280px');
    game_area.setAttribute('height','800px');
    
    // draw Stack
    stack = new CStack(1100,200,'Stack','canvas');
    stack.alignment();
    stack.draw();   

    var options = "";
    for (let i=0; i < players.length; i++) {
        options += '<option>' + players[i] + '</option>';
    }
    var player_area = document.getElementById('players');
    player_area.innerHTML = '<select name="playernames" id="player-select" multiple size="5">' + options + '</select>';
}