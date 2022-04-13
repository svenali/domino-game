function changeNabor() {
    var set = document.getElementById("nabor_fishek");
    //alert(set.value);

    var request = $.ajax({
        method: "POST",
        url: "php_controller/getFischkiInDatabase.php", 
        data: JSON.stringify({set_id: set.value}),
        dataType: "JSON",
        success: function( data ) {
            //console.log(data);
            imgs = data;
            destroyCanvas();
            createFischkiFromDB(data);
        }  
    });
}