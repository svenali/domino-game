// Class GameDesk
// управляет поведение фишек на столе
function CGameDesk() {
    this.fischki = Array();

    this.add = function(fischka) {
        console.log("Add Fischka: ", fischka.name);

        // переписывать функцю draw(), потому что сейчас эта фишка находится на игровом столе
        fischka.setActive(false);
        fischka.connectedGameDesk = this;

        this.fischki.push(fischka);
    };

    this.newCoordinates = function(dragStoppedFischka) {
        //console.log("New Coordinates ... von " + dragStoppedFischka.name);
        this.fischki.forEach(f => {
            if (f !== dragStoppedFischka) {
                //console.log("Passe " + f.name + " an.");
                //console.log("mit: x-diff: " + dragStoppedFischka.diff_x);
                //console.log("mit: y-diff: " + dragStoppedFischka.diff_y);
                f.x -= dragStoppedFischka.diff_x;
                f.y -= dragStoppedFischka.diff_y;
            }
        });

        dragStoppedFischka.diff_x = 0;
        dragStoppedFischka.diff_y = 0;
    };
    
    this.draw = function() {
        this.fischki.forEach(f => {
            f.draw();
        });
    };

    this.getCollisionFischkis = function(col_points, new_fischka) {
        var fischkis = Array();
        console.log("search for dominos ", this.fischki);
        this.fischki.forEach(f => {
            col_points.forEach(pos => {
                //console.log("Getroffenes Bild: ", f.getNumberOfDominoPicture(pos));
                //console.log("aktuelles Bild: ", pos.pic_nr);
                var r = f.getNumberOfDominoPicture(pos);
                //if (r.pic != pos.pic_nr) {
                if (r != -1) {
                    //console.log("Direct Result: ", r);
                    if (r != 0) {
                        var collision = {
                            coll: pos,
                            add: r,
                            fischka: f
                        };
                        fischkis.push(collision);   
                    }
                }
                else {
                    if (r != 0) {
                        console.log("Error: ", pos);
                        var collision = {
                            coll: pos,
                            add: r,
                            fischka: f
                        };
                        fischkis.push(collision);
                        //fischkis = Array();
                        //return fischkis;
                    }
                }
            });
        });

        console.log("Result Loop: ", fischkis);
        console.log("New Fischka: ", new_fischka);

        // сушествуют болше чем 1 результат?
        if (fischkis.length >= 1) {
            // решать толко, если все картинки равняются
            //picnr = fischkis[0].add.pic;
            fischkis.forEach(f => {
                if (f.add == -1) {
                    // фишка находится между не равняющимся другими фишками => мы отклоняем
                    // и доставляем пустую результат в виде массива
                    fischkis = Array();
                    return fischkis;
                }
            }); 
        }

        return fischkis;
    }
}