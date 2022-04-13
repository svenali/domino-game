<?php
include "db/database_login.php";
?>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; CHARSET=utf-8">
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
    </head>
    <body>
        <div class="box" id="gamedesk">
            <canvas id="gamecanvas" width='800' height='700' style='background-color: #9CC9E8; border: 1px solid #dfdfdf;' onclick="">
            <canvas>
        </div>
        <div class="box" id="pictures">
            <label>Zeige vorhandene Sets (Покажи существующие наборы фишки)</label><br/>
            <select name="nabor_fishek" id="nabor_fishek" onchange="changeNabor()">
            <?php
                $select = "SELECT set_id, name_of_the_set, name_of_the_set_de, name_of_the_set_en from bank_of_sets;";
                $result = $conn->query($select);

                while ($data = $result->fetch_assoc()) {
                    echo '<option value="'.$data['set_id'].'">'.$data['name_of_the_set'].' ('.$data['name_of_the_set_de'].','.$data['name_of_the_set_en'].')</option>';
                }
            ?>
            </select>
            <button name="start" onclick="startGame()">Spiel starten (начать игру)</button>
            <br/><br/><br/>
            <form action="#"
                    class="dropzone"
                    id="my-awesome-dropzone"
                    enctype="multipart/form-data"
                    onsubmit="createFischki(this);">
                <input type="submit" value="Create chips" /> 
            </form>  
            <label><b>Категория:</b></label>
            <input type="text" name="kategoria" id="kategoria"/>
            <label><b>Category:</b></label>
            <input type="text" name="category" id="category"/>
            <label><b>Kategorie:</b></label>
            <input type="text" name="kategorie" id="kategorie"/><br/><br/>
            <label><b>Название картинок, Labels, Beschriftung</b></label><br/></br>
            <label><b>Название первой картинки, Label of the first image, Bezeichnung des ersten Bildes:</b></label><br/>
            <label><i>русский:</i></label>
            <input type="text" name="kartinka0" id="kartinka0"/>
            <label><i>english:</i></label>
            <input type="text" name="kartinka0_en" id="kartinka0_en"/>
            <label><i>deutsch:</i></label>
            <input type="text" name="kartinka0_de" id="kartinka0_de"/>
            <br/>
            <label><b>Название второй картинки, Label of the second image, Bezeichnung des zweiten Bildes:</b></label><br/>
            <label><i>русский:</i></label>
            <input type="text" name="kartinka1" id="kartinka1"/>
            <label><i>english:</i></label>
            <input type="text" name="kartinka1_en" id="kartinka1_en"/>
            <label><i>deutsch:</i></label>
            <input type="text" name="kartinka1_de" id="kartinka1_de"/>
            <br/>
            <label><b>Название третей картинки, Label of the third image, Bezeichnung des dritten Bildes:</b></label><br/>
            <label><i>русский:</i></label>
            <input type="text" name="kartinka2" id="kartinka2"/>
            <label><i>english:</i></label>
            <input type="text" name="kartinka2_en" id="kartinka2_en"/>
            <label><i>deutsch:</i></label>
            <input type="text" name="kartinka2_de" id="kartinka2_de"/>
            <br/>
            <label><b>Название четвёртой картинки, Label of the fourth image, Bezeichnung des vierten Bildes:</b></label><br/>
            <label><i>русский:</i></label>
            <input type="text" name="kartinka3" id="kartinka3"/>
            <label><i>english:</i></label>
            <input type="text" name="kartinka3_en" id="kartinka3_en"/>
            <label><i>deutsch:</i></label>
            <input type="text" name="kartinka3_de" id="kartinka3_de"/>
            <br/>
            <label><b>Название пятой картинки, Label of the fifth image, Bezeichnung des fünften Bildes:</b></label><br/>
            <label><i>русский:</i></label>
            <input type="text" name="kartinka4" id="kartinka4"/>
            <label><i>english:</i></label>
            <input type="text" name="kartinka4_en" id="kartinka4_en"/>
            <label><i>deutsch:</i></label>
            <input type="text" name="kartinka4_de" id="kartinka4_de"/>
            <br/>
            <label><b>Название шестой картинки, Label of the sixth image, Bezeichnung des sechsten Bildes:</b></label><br/>
            <label><i>русский:</i></label>
            <input type="text" name="kartinka5" id="kartinka5"/>
            <label><i>english:</i></label>
            <input type="text" name="kartinka5_en" id="kartinka5_en"/>
            <label><i>deutsch:</i></label>
            <input type="text" name="kartinka5_de" id="kartinka5_de"/>
            <br/>
            <label><b>Название седьмой картинки, Label of the seventh image, Bezeichnung des siebten Bildes:</b></label><br/>
            <label><i>русский:</i></label>
            <input type="text" name="kartinka6" id="kartinka6"/>
            <label><i>english:</i></label>
            <input type="text" name="kartinka6_en" id="kartinka6_en"/>
            <label><i>deutsch:</i></label>
            <input type="text" name="kartinka6_de" id="kartinka6_de"/>
            <br/>
            <br/><br/>
            <button name="save" onclick="saveFischkiInDatabase()">Speichern (сохранить)</button>
        </div>
        <div class="box" id="players">
        </div>
    </body>
</html>