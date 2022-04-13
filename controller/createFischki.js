var imgs = new Array();

function createFischki(formdata) {
    var images = document.getElementsByClassName("dz-image");

    var anzahl = 0;
    for (var i = 0; i < images.length; i++) {
        imgs.push(images.item(i).childNodes[0].getAttribute("src"));
        anzahl++;
    }  

    if (anzahl < 7) {
        alert("Error: We need 7 chips to play!");
    }
    else {
        var x = 10;
        var y = 10;
        var z = 0;

        for (let i = 0; i < 7; i++) {
            for (let o = 0; o < 6; o++) {
                if (z % 4 == 0) {
                    if (x != 10) {
                        x = 10;
                        y += 100;
                    }
                }

                var fischka = new CFischka(x, y, "Fischka-"+i+"-"+o, "canvas");
                fischka.setLeftImage(imgs[i]);
                fischka.setRightImage(imgs[o]);
                fischka.draw();

                x += fischka.width + 40;
                z++;
            }
        }
    }
} 

// image является массивом
function createFischkiFromDB(images) {
    var anzahl = 0;
    
    var x = 10;
    var y = 10;
    var z = 0;

    for (let i = 0; i < 7; i++) {
        for (let o = 0; o < 6; o++) {
            if (z % 4 == 0) {
                if (x != 10) {
                    x = 10;
                    y += 100;
                }
            }

            var fischka = new CFischka(x, y, "Fischka-"+i+"-"+o, "canvas");
            fischka.setLeftImage(images[i]);
            fischka.setRightImage(images[o]);
            fischka.number_left = i;
            fischka.number_right = i;
            fischka.draw();

            x += fischka.width + 40;
            z++;
        }
    }
}

function createGameFischki(stack, images) {
    for (let i = 0; i < 7; i++) {
        for (let o = 0; o < 6; o++) {
            var fischka = new CFischka(200, 600, "Fischka-"+i+"-"+o, "canvas");
            fischka.setLeftImage(images[i]);
            fischka.setRightImage(images[o]);
            fischka.number_left = i;
            fischka.number_right = o;
            stack.fischki_stack.push(fischka);
        }
    }
}