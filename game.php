<?php
$id = $_GET["id"];

if (isset($id)) {
?>
<html>
    <head>
        <title>Domino</title>
        <link type="text/css" rel="stylesheet" href="css/dropzone.css" />
        <link type="text/css" rel="stylesheet" href="css/domino.css" />
        <script type="text/javascript" src="libs/jquery-3.3.1.min.js"></script>
        <script type="text/javascript" src="libs/jcanvas.min.js"></script>
        <script type="text/javascript" src="libs/dropzone.js"></script>
        <script type="text/javascript" src="node_modules/socket.io/client-dist/socket.io.js"></script>

        <script type="text/javascript" src="modell/kartina.js"></script>
        <script type="text/javascript" src="modell/fischka.js"></script>
        <script type="text/javascript" src="modell/gamedesk.js"></script>
        <script type="text/javascript" src="modell/stack.js"></script>
        <script type="text/javascript" src="controller/createFischki.js"></script>
        <script type="text/javascript" src="controller/changeNabor.js"></script>
        <script type="text/javascript" src="controller/saveFischkiInDatabase.js"></script>
        <script type="text/javascript" src="controller/startGame.js"></script>
        <script>
        function startClientGame() {
            var name = document.getElementById("gamername").value;
            connectToGame(name, '<?php echo $id; ?>');
        }
        </script>
    </head>
    <body>
        <div class="box" id="gamedesk">
            <canvas id="gamecanvas" width='800' height='700' style='background-color: #9CC9E8; border: 1px solid #dfdfdf;' onclick="">
            <canvas>
        </div>
        <div class="box">
            <input id="gamername" type="text"><button name="start" onclick="startClientGame()">Start (Пуск)</button>
        </div>
        <div class="box" id="players">
        </div>
    </body>
<?php
}
else {
?>
<html>
    <head>
        <title>Domino</title>
    </head>
    <body>
        <h1>Fehler! Keine Spiel-ID gefunden!</h1>
    </body>  
<?php
}
?>
