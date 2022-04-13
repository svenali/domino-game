function saveFischkiInDatabase() {
    // Eingabefelder auslesen und Daten der PHP Datei übergeben
    // вычитывать названия фишек из поля и передавать их в PHP-страницу
    var category = document.getElementById("kategoria").value;
    var category_en = document.getElementById("category").value;
    var category_de = document.getElementById("kategorie").value;
    var exchange_data = new Array();
    exchange_data.push(category);
    exchange_data.push(category_de);
    exchange_data.push(category_en);

    for (let i=0; i<7; i++) {
        var field_content = document.getElementById("kartinka"+i).value;
        var field_content_en = document.getElementById("kartinka"+i+"_en").value;
        var field_content_de = document.getElementById("kartinka"+i+"_de").value;
        
        // Austauschkonstrukt
        // набор для обменивания данных
        var exchange = { 
            description: field_content,
            description_en: field_content_en, 
            description_de: field_content_de,
            picture: imgs[i] 
        };

        exchange_data.push(exchange);
    }
    console.log(exchange_data);

    var request = $.ajax({
        method: "POST",
        url: "php_controller/saveFischkiInDatabase.php", 
        data: JSON.stringify(exchange_data),
        dataType: "JSON",
        success: function( data ) {
            var x = document.getElementById("nabor_fishek");
            var option = document.createElement("option");
            option.text = data;
            x.add(option);
        }  
    });
}