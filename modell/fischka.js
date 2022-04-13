var load = false;

// Test
function drawFischka() {
    var fischka = new CFischka(100, 20, "Fischka-1", "canvas");
    fischka.draw();
}

function redrawAll() {
    //console.log("redrawAll()");
    destroyCanvas();
    $('canvas').removeLayers();
    $('canvas').clearCanvas();
    
    stack.draw();
    player.forEach(f => {
        /* console.log("Fischka name: ", f.name);
        console.log("Fischka x: ", f.x);
        console.log("Fischka y: ", f.y);*/
        f.draw();
    });

    gamedesk.draw();
}

// Class CFischka
function CFischka(x, y, name, context) {
    this.x = x;
    this.y = y;
    this.width = 150;
    this.height = 80;
    this.name = name;

    this.image_left = data_left;
    this.image_right = data_right;

    this.number_left = -1;
    this.number_right = -1;

    this.isHorizontal = true;
    this.orientation = 0;

    // если чуть позже, фишка будет добавлен к массиву на GameDesk,
    // только х- и y- разница будет распростряена
    this.active = true;
    this.diff_x = 0;
    this.diff_y = 0;
    this.connectedGameDesk = null;

    // если true, фишка будет рисованой с дополнителными местами, т. е.
    // ползователь видет на экране, где можно бросить селдующую фишку
    this.paintDockingPossibilities = false;

    // может быть слишком сложно!!!
    this.calculateDockingPositions = function() {
        // above_left, above_middle, above_right
        // left, right
        // under_left, under_middle, under_right
        // Bit representation => al, am, ar, l, r, ul, um, ur
        // Example: 00000000 => fischka is alone (first fischka)
        // 10011000 => above left, left and right are fischkis
        //console.log("Collision exists?");
        var col_array = Array();

        //console.log("x: ", this.x, " y: ", this.y);

        switch (this.orientation) {
            case 0:
                // слева
                var left = {
                    position: 'left',
                    x: this.x - this.width/4,
                    y: this.y + this.height/2,
                    angle: this.orientation, 
                    pic_nr: this.number_left
                };
                col_array.push(left);
                // справо
                var right = {
                    position: 'right',
                    x: this.x + this.width + this.width/4,
                    y: this.y + this.height/2,
                    angle: this.orientation,
                    pic_nr: this.number_right
                };
                col_array.push(right);
                // сверху лева
                var above_left = {
                    position: 'above_left',
                    x: this.x + this.width/4,
                    y: this.y - this.height/2,
                    angle: this.orientation,
                    pic_nr: this.number_left
                };
                col_array.push(above_left);
                // сверху право
                var above_right = {
                    position: 'above_right',
                    x: this.x + 3*this.width/4,
                    y: this.y - this.height/2,
                    angle: this.orientation,
                    pic_nr: this.number_right
                };
                col_array.push(above_right);
                // снизу лева
                var under_left = {
                    position: 'under_left',
                    x: this.x + this.width/4,
                    y: this.y + this.height + this.height/2,
                    angle: this.orientation,
                    pic_nr: this.number_left
                };
                col_array.push(under_left);
                // свнизу право
                var under_right = {
                    position: 'under_right',
                    x: this.x + 3*this.width/4,
                    y: this.y + this.height + this.height/2,
                    angle: this.orientation,
                    pic_nr: this.number_right
                };
                col_array.push(under_right);
                break;
            case 90:
                // слева
                var left = {
                    position: 'left',
                    x: this.x + this.width/2,
                    y: this.y - this.height/4,
                    angle: this.orientation,
                    pic_nr: this.number_left
                };
                col_array.push(left);
                // справо
                var right = {
                    position: 'right',
                    x: this.x + this.width/2,
                    y: this.y + this.height + this.height/4,
                    angle: this.orientation,
                    pic_nr: this.number_right
                };
                col_array.push(right);
                // сверху лева
                var above_left = {
                    position: 'above_left',
                    x: this.x + this.width + this.width/2,
                    y: this.y + this.height/4,
                    angle: this.orientation,
                    pic_nr: this.number_left
                };
                col_array.push(above_left);
                // сверху право
                var above_right = {
                    position: 'above_right',
                    x: this.x + this.width + this.width/2,
                    y: this.y + 3*this.height/4,
                    angle: this.orientation,
                    pic_nr: this.number_right
                };
                col_array.push(above_right);
                // снизу лева
                var under_left = {
                    position: 'under_left',
                    x: this.x - this.width/2,
                    y: this.y + this.height/4,
                    angle: this.orientation,
                    pic_nr: this.number_left
                };
                col_array.push(under_left);
                // свнизу право
                var under_right = {
                    position: 'under_right',
                    x: this.x - this.width/2,
                    y: this.y + 3*this.height/4,
                    angle: this.orientation,
                    pic_nr: this.number_right
                };
                col_array.push(under_right);
                break;
            case 180:
                // слева
                var left = {
                    position: 'right',
                    x: this.x - this.width/4,
                    y: this.y + this.height/2,
                    angle: this.orientation,
                    pic_nr: this.number_right
                };
                col_array.push(left);
                // справо
                var right = {
                    position: 'left',
                    x: this.x + this.width + this.width/4,
                    y: this.y + this.height/2,
                    angle: this.orientation,
                    pic_nr: this.number_left
                };
                col_array.push(right);
                // сверху лева
                var above_left = {
                    position: 'under_right',
                    x: this.x + this.width/4,
                    y: this.y - this.height/2,
                    angle: this.orientation,
                    pic_nr: this.number_right
                };
                col_array.push(above_left);
                // сверху право
                var above_right = {
                    position: 'under_left',
                    x: this.x + 3*this.width/4,
                    y: this.y - this.height/2,
                    angle: this.orientation,
                    pic_nr: this.number_left
                };
                col_array.push(above_right);
                // снизу лева
                var under_left = {
                    position: 'above_right',
                    x: this.x + this.width/4,
                    y: this.y + this.height + this.height/2,
                    angle: this.orientation,
                    pic_nr: this.number_right
                };
                col_array.push(under_left);
                // свнизу право
                var under_right = {
                    position: 'above_left',
                    x: this.x + 3*this.width/4,
                    y: this.y + this.height + this.height/2,
                    angle: this.orientation,
                    pic_nr: this.number_left
                };
                col_array.push(under_right);
                break;
            case 270:
                // слева
                var left = {
                    position: 'right',
                    x: this.x + this.width/2,
                    y: this.y - this.height/4,
                    angle: this.orientation,
                    pic_nr: this.number_right
                };
                col_array.push(left);
                // справо
                var right = {
                    position: 'left',
                    x: this.x + this.width/2,
                    y: this.y + this.height + this.height/4,
                    angle: this.orientation,
                    pic_nr: this.number_left
                };
                col_array.push(right);
                // сверху лева
                var above_left = {
                    position: 'under_right',
                    x: this.x + this.width + this.width/2,
                    y: this.y + this.height/4,
                    angle: this.orientation,
                    pic_nr: this.number_right
                };
                col_array.push(above_left);
                // сверху право
                var above_right = {
                    position: 'under_left',
                    x: this.x + this.width + this.width/2,
                    y: this.y + 3*this.height/4,
                    angle: this.orientation,
                    pic_nr: this.number_left
                };
                col_array.push(above_right);
                // снизу лева
                var under_left = {
                    position: 'above_right',
                    x: this.x - this.width/2,
                    y: this.y + this.height/4,
                    angle: this.orientation,
                    pic_nr: this.number_right
                };
                col_array.push(under_left);
                // свнизу право
                var under_right = {
                    position: 'above_left',
                    x: this.x - this.width/2,
                    y: this.y + 3*this.height/4,
                    angle: this.orientation,
                    pic_nr: this.number_left
                };
                col_array.push(under_right);
                break;
        }

        //console.log("collision points: ", col_array);

        return col_array;
    };

    this.existsCollision = function() {
        var col_array = this.calculateDockingPositions();

        col_fischkis = gamedesk.getCollisionFischkis(col_array, this);
        
        return col_fischkis;
    };

    // delivers number of hitpicuture depending on coordinates
    this.getNumberOfDominoPicture = function(pos) {
        switch (this.orientation) {
            case 0:
                if ((this.x <= pos.x) && ((this.x + this.width / 2) >= pos.x) && 
                    (this.y <= pos.y) && ((this.y + this.height) >= pos.y)) {
                        // картинки не сопадают
                        if (pos.pic_nr != this.number_left) {
                            return -1;
                        }
                        switch (pos.position) {
                            case "left":
                                switch (pos.angle) {
                                    case 0:
                                        return -1;
                                        break;
                                    case 90:
                                        return {
                                            position: "add_under_left", 
                                            pic: this.number_left,
                                            new_x: this.x,
                                            new_y: this.y + this.height
                                        };
                                        break;
                                    case 180:
                                        return {
                                            position: "add_left", 
                                            pic: this.number_left,
                                            new_x: this.x - this.width,
                                            new_y: this.y
                                        };
                                        break;
                                    case 270:
                                        return {
                                            position: "add_above_left", 
                                            pic: this.number_left,
                                            new_x: this.x,
                                            new_y: this.y - this.width
                                        };
                                        break;
                                }
                                break;
                            case "right":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_left", 
                                            pic: this.number_left,
                                            new_x: this.x - this.width,
                                            new_y: this.y
                                        };
                                        break;
                                    case 90:
                                        return {
                                            position: "add_above_left", 
                                            pic: this.number_left,
                                            new_x: this.x,
                                            new_y: this.y - this.width
                                        };
                                        break;
                                    case 180:
                                        return -1;
                                        break;
                                    case 270:
                                        return {
                                            position: "add_under_left", 
                                            pic: this.number_left,
                                            new_x: this.x,
                                            new_y: this.y + this.height
                                        };
                                        break;
                                }
                                break;
                            case "above_left":
                                switch (pos.angle) {
                                    case 0:
                                        return -1;
                                        break;
                                    case 90:
                                        return {
                                            position: "add_left", 
                                            pic: this.number_left,
                                            new_x: this.x - this.height,
                                            new_y: this.y
                                        };
                                        break;
                                    case 180:
                                        return {
                                            position: "add_above_left", 
                                            pic: this.number_left,
                                            new_x: this.x - this.width/2,
                                            new_y: this.y - this.height
                                        };
                                        break;
                                    case 270:
                                        return -1;
                                        break;
                                }
                                break;
                            case "above_right":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_under_left", 
                                            pic: this.number_left,
                                            new_x: this.x - this.width/2,
                                            new_y: this.y + this.height
                                        };
                                        break;
                                    case 90:
                                        return {
                                            position: "add_left", 
                                            pic: this.number_left,
                                            new_x: this.x - this.height,
                                            new_y: this.y - this.width/2
                                        };
                                        break;
                                    case 180:
                                        return -1;
                                        break;
                                    case 270:
                                        return -1;
                                        break;
                                }
                                break;
                            case "under_left":
                                switch (pos.angle) {
                                    case 0:
                                        return -1;
                                        break;
                                    case 90:
                                        return -1;
                                        break;
                                    case 180:
                                        return {
                                            position: "add_under_left", 
                                            pic: this.number_left,
                                            new_x: this.x - this.width/2,
                                            new_y: this.y + this.height
                                        };
                                        break;
                                    case 270:
                                        return {
                                            position: "add_left", 
                                            pic: this.number_left,
                                            new_x: this.x - this.height,
                                            new_y: this.y - this.height/2
                                        };
                                        break;
                                }
                                break;
                            case "under_right":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_above_left", 
                                            pic: this.number_left,
                                            new_x: this.x - this.width/2,
                                            new_y: this.y - this.height
                                        };
                                        break;
                                    case 90:
                                        return -1;
                                        break;
                                    case 180:
                                        return -1;
                                        break;
                                    case 270:
                                        return {
                                            position: "add_left", 
                                            pic: this.number_left,
                                            new_x: this.x - this.width/2,
                                            new_y: this.y
                                        };
                                        break;
                                }
                                break;
                        }
                        //return {position: "add_right", pic: this.number_right};
                }
                if (((this.x + this.width) >= pos.x) && ((this.x + this.width/2) <= pos.x) && 
                    (this.y <= pos.y) && ((this.y + this.height) >= pos.y)) {
                        // картинки не сопадают
                        if (pos.pic_nr != this.number_right) {
                            return -1;
                        }
                        switch (pos.position) {
                            case "left":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_right", 
                                            pic: this.number_right,
                                            new_x: this.x + this.width,
                                            new_y: this.y
                                        };
                                        break;
                                    case 90:
                                        return {
                                            position: "add_under_right", 
                                            pic: this.number_right,
                                            new_x: this.x + this.width/2,
                                            new_y: this.y + this.height
                                        };
                                        break;
                                    case 180:
                                        return -1;
                                        break;
                                    case 270:
                                        return {
                                            position: "add_above_right", 
                                            pic: this.number_right,
                                            new_x: this.x + this.width/2,
                                            new_y: this.y - this.width
                                        };
                                        break;
                                }
                                break;
                            case "right":
                                switch (pos.angle) {
                                    case 0:
                                        return -1;
                                        break;
                                    case 90:
                                        return {
                                            position: "add_above_right", 
                                            pic: this.number_right,
                                            new_x: this.x + this.width/2,
                                            new_y: this.y - this.width
                                        };
                                        break;
                                    case 180:
                                        return {
                                            position: "add_right", 
                                            pic: this.number_right,
                                            new_x: this.x + this.width,
                                            new_y: this.y
                                        };
                                        break;
                                    case 270:
                                        return {
                                            position: "add_under_right", 
                                            pic: this.number_right,
                                            new_x: this.x + this.width/2,
                                            new_y: this.y + this.height
                                        };
                                        break;
                                }
                                break;
                            case "above_left":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_under_right", 
                                            pic: this.number_right,
                                            new_x: this.x + this.width/2,
                                            new_y: this.y + this.height
                                        };
                                        break;
                                    case 90:
                                        return -1;
                                        break;
                                    case 180:
                                        return -1;
                                        break;
                                    case 270:
                                        return {
                                            position: "add_right", 
                                            pic: this.number_right,
                                            new_x: this.x + this.width,
                                            new_y: this.y - this.width/2
                                        };
                                        break;
                                }
                                break;
                            case "above_right":
                                switch (pos.angle) {
                                    case 0:
                                        return -1;
                                        break;
                                    case 90:
                                        return -1;
                                        break;
                                    case 180:
                                        return {
                                            position: "add_above_right", 
                                            pic: this.number_right,
                                            new_x: this.x + this.width/2,
                                            new_y: this.y
                                        };
                                        break;
                                    case 270:
                                        return {
                                            position: "add_right", 
                                            pic: this.number_right,
                                            new_x: this.x + this.width,
                                            new_y: this.y
                                        };
                                        break;
                                }
                                break;
                            case "under_left":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_above_right", 
                                            pic: this.number_right,
                                            new_x: this.x + this.width/2,
                                            new_y: this.y - this.height
                                        };
                                        break;
                                    case 90:
                                        return {
                                            position: "add_right", 
                                            pic: this.number_right,
                                            new_x: this.x + this.width,
                                            new_y: this.y
                                        };
                                        break;
                                    case 180:
                                        return -1;
                                        break;
                                    case 270:
                                        return -1;
                                        break;
                                }
                                break;
                            case "under_right":
                                switch (pos.angle) {
                                    case 0:
                                        return -1;
                                        break;
                                    case 90:
                                        return {
                                            position: "add_right", 
                                            pic: this.number_right,
                                            new_x: this.x + this.width,
                                            new_y: this.y - this.height
                                        };
                                        break;
                                    case 180:
                                        return {
                                            position: "add_under_right", 
                                            pic: this.number_right,
                                            new_x: this.x + this.width / 2,
                                            new_y: this.y + this.height
                                        };
                                        break;
                                    case 270:
                                        return {
                                            position: "add_right", 
                                            pic: this.number_right,
                                            new_x: this.x + this.width / 2,
                                            new_y: this.y + this.height
                                        };
                                        break;
                                }
                                break;
                        }
                        //return {position: "add_right", pic: this.number_right};
                }
                break;
            case 90:
                if ((this.x <= pos.x) && ((this.x + this.width) >= pos.x) && 
                    (this.y <= pos.y) && ((this.y + this.height / 2) >= pos.y)) {
                        // картинки не сопадают
                        if (pos.pic_nr != this.number_left) {
                            return -1;
                        }
                        switch (pos.position) {
                            case "left":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_above_left", 
                                            pic: this.number_left,
                                            new_x: this.x + this.width,
                                            new_y: this.y
                                        };
                                        break;
                                    case 90:
                                        return -1;
                                        break;
                                    case 180:
                                        return {
                                            position: "add_under_left", 
                                            pic: this.number_left,
                                            new_x: this.x - this.height,
                                            new_y: this.y
                                        };
                                        break;
                                    case 270:
                                        return {
                                            position: "add_left", 
                                            pic: this.number_left,
                                            new_x: this.x,
                                            new_y: this.y - this.height
                                        };
                                        break;
                                }
                                break;
                            case "right":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_under_left", 
                                            pic: this.number_left,
                                            new_x: this.x - this.height,
                                            new_y: this.y
                                        };
                                        break;
                                    case 90:
                                        return {
                                            position: "add_left", 
                                            pic: this.number_left,
                                            new_x: this.x,
                                            new_y: this.y - this.height
                                        };
                                        break;
                                    case 180:
                                        return {
                                            position: "add_above_left", 
                                            pic: this.number_left,
                                            new_x: this.x + this.width,
                                            new_y: this.y
                                        };
                                        break;
                                    case 270:
                                        return -1;
                                        break;
                                }
                                break;
                            case "above_left":
                                switch (pos.angle) {
                                    case 0:
                                        return -1;
                                        break;
                                    case 90:
                                        return -1;
                                        break;
                                    case 180:
                                        return {
                                            position: "add_left", 
                                            pic: this.number_left,
                                            new_x: this.x - this.width,
                                            new_y: this.y - this.height/2
                                        };
                                        break;
                                    case 270:
                                        return {
                                            position: "add_above_left", 
                                            pic: this.number_left,
                                            new_x: this.x + this.width,
                                            new_y: this.y - this.height/2
                                        };
                                        break;
                                }
                                break;
                            case "above_right":
                                switch (pos.angle) {
                                    case 0:
                                        return -1;
                                        break;
                                    case 90:
                                        return {
                                            position: "add_under_left", 
                                            pic: this.number_left,
                                            new_x: this.x - this.width,
                                            new_y: this.y - this.height/2
                                        };
                                        break;
                                    case 180:
                                        return {
                                            position: "add_left", 
                                            pic: this.number_left,
                                            new_x: this.x,
                                            new_y: this.y - this.width
                                        };
                                        break;
                                    case 270:
                                        return -1;
                                        break;
                                }
                                break;
                            case "under_left":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_left", 
                                            pic: this.number_left,
                                            new_x: this.x,
                                            new_y: this.y - this.width
                                        };
                                        break;
                                    case 90:
                                        return -1;
                                        break;
                                    case 180:
                                        return -1;
                                        break;
                                    case 270:
                                        return {
                                            position: "add_under_left", 
                                            pic: this.number_left,
                                            new_x: this.x - this.width,
                                            new_y: this.y - this.height/2
                                        };
                                        break;
                                }
                                break;
                            case "under_right":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_left", 
                                            pic: this.number_left,
                                            new_x: this.x - this.width,
                                            new_y: this.y - this.width
                                        };                
                                        break;
                                    case 90:
                                        return {
                                            position: "add_above_left", 
                                            pic: this.number_left,
                                            new_x: this.x + this.width,
                                            new_y: this.y - this.height/2
                                        }; 
                                        break;
                                    case 180:
                                        return -1;
                                        break;
                                    case 270:
                                        return -1;
                                        break;
                                }
                                break;
                        }
                        //return {position: "add_above_left", pic: this.number_left};
                }
                if ((this.x <= pos.x) && ((this.x + this.width) >= pos.x) && 
                    ((this.y + this.height/2) <= pos.y) && ((this.y + this.height) >= pos.y)) {
                        // картинки не сопадают
                        if (pos.pic_nr != this.number_right) {
                            return -1;
                        }
                        switch (pos.position) {
                            case "left":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_above_right", 
                                            pic: this.number_right,
                                            new_x: this.x + this.width,
                                            new_y: this.y + this.height/2
                                        };
                                        break;
                                    case 90:
                                        return {
                                            position: "add_right", 
                                            pic: this.number_right,
                                            new_x: this.x,
                                            new_y: this.y + this.height
                                        };
                                        break;
                                    case 180:
                                        return {
                                            position: "add_above_right", 
                                            pic: this.number_right,
                                            new_x: this.x - this.height,
                                            new_y: this.y + this.height/2
                                        };
                                        break;
                                    case 270:
                                        return -1;
                                        break;
                                }
                                break;
                            case "right":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_under_right", 
                                            pic: this.number_right,
                                            new_x: this.x - this.height,
                                            new_y: this.y + this.height/2
                                        };
                                        break;
                                    case 90:
                                        return -1;
                                        break;
                                    case 180:
                                        return {
                                            position: "add_above_right", 
                                            pic: this.number_right,
                                            new_x: this.x + this.width,
                                            new_y: this.y + this.height/2
                                        };
                                        break;
                                    case 270:
                                        return {
                                            position: "add_right", 
                                            pic: this.number_right,
                                            new_x: this.x,
                                            new_y: this.y + this.height
                                        };
                                        break;
                                }
                                break;
                            case "above_left":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_right", 
                                            pic: this.number_right,
                                            new_x: this.x,
                                            new_y: this.y + this.height
                                        };
                                        break;
                                    case 90:
                                        return {
                                            position: "add_under_right", 
                                            pic: this.number_right,
                                            new_x: this.x - this.width,
                                            new_y: this.y + this.height/2
                                        };
                                        break;
                                    case 180:
                                        return -1;
                                        break;
                                    case 270:
                                        return -1;
                                        break;
                                }
                                break;
                            case "above_right":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_right", 
                                            pic: this.number_right,
                                            new_x: this.x - this.width,
                                            new_y: this.y + this.height
                                        };
                                        break;
                                    case 90:
                                        return -1;
                                        break;
                                    case 180:
                                        return -1;
                                        break;
                                    case 270:
                                        return {
                                            position: "add_above_right", 
                                            pic: this.number_right,
                                            new_x: this.x + this.width,
                                            new_y: this.y + this.height/2
                                        };
                                        break;
                                }
                                break;
                            case "under_left":
                                switch (pos.angle) {
                                    case 0:
                                        return -1;
                                        break;
                                    case 90:
                                        return {
                                            position: "add_above_right", 
                                            pic: this.number_right,
                                            new_x: this.x + this.width,
                                            new_y: this.y + this.height/2
                                        };
                                        break;
                                    case 180:
                                        return {
                                            position: "add_right", 
                                            pic: this.number_right,
                                            new_x: this.x - this.width,
                                            new_y: this.y + this.height
                                        };
                                        break;
                                    case 270:
                                        return -1;
                                        break;
                                }
                                break;
                            case "under_right":
                                switch (pos.angle) {
                                    case 0:
                                        return -1;
                                        break;
                                    case 90:
                                        return -1;
                                        break;
                                    case 180:
                                        return {
                                            position: "add_right", 
                                            pic: this.number_right,
                                            new_x: this.x - this.width,
                                            new_y: this.y + this.height
                                        };
                                        break;
                                    case 270:
                                        return {
                                            position: "add_under_right", 
                                            pic: this.number_right,
                                            new_x: this.x - this.width,
                                            new_y: this.y + this.height/2
                                        };
                                        break;
                                }
                                break;
                        }
                        //return {position: "add_above_right", pic: this.number_right};
                }
                break;
            case 180:
                // слево и справо перепутаны
                if ((this.x <= pos.x) && ((this.x + this.width / 2) >= pos.x) && 
                    (this.y <= pos.y) && ((this.y + this.height) >= pos.y)) {
                        // картинки не сопадают
                        if (pos.pic_nr != this.number_right) {
                            return -1;
                        }
                        switch (pos.position) {
                            case "left":
                                switch (pos.angle) {
                                    case 0:
                                        return -1;
                                        break;
                                    case 90:
                                        return {
                                            position: "add_above_right", 
                                            pic: this.number_right,
                                            new_x: this.x,
                                            new_y: this.y + this.height
                                        };
                                        break;
                                    case 180:
                                        return {
                                            position: "add_right", 
                                            pic: this.number_right,
                                            new_x: this.x - this.width,
                                            new_y: this.y
                                        };
                                        break;
                                    case 270:
                                        return {
                                            position: "add_under_right", 
                                            pic: this.number_right,
                                            new_x: this.x,
                                            new_y: this.y - this.width
                                        };
                                        break;
                                }
                                break;
                            case "right":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_right", 
                                            pic: this.number_right,
                                            new_x: this.x - this.width,
                                            new_y: this.y
                                        };
                                        break;
                                    case 90:
                                        return {
                                            position: "add_under_right", 
                                            pic: this.number_right,
                                            new_x: this.x,
                                            new_y: this.y - this.width
                                        };
                                        break;
                                    case 180:
                                        return -1;
                                        break;
                                    case 270:
                                        return {
                                            position: "add_above_right", 
                                            pic: this.number_right,
                                            new_x: this.x,
                                            new_y: this.y + this.height
                                        };
                                        break;
                                }
                                break;
                            case "above_left":
                                switch (pos.angle) {
                                    case 0:
                                        return -1;
                                        break;
                                    case 90:
                                        return {
                                            position: "add_right", 
                                            pic: this.number_right,
                                            new_x: this.x - this.height,
                                            new_y: this.y
                                        };
                                        break;
                                    case 180:
                                        return {
                                            position: "add_under_right", 
                                            pic: this.number_right,
                                            new_x: this.x - this.width/2,
                                            new_y: this.y - this.height
                                        };
                                        break;
                                    case 270:
                                        return -1;
                                        break;
                                }
                                break;
                            case "above_right":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_above_right", 
                                            pic: this.number_right,
                                            new_x: this.x - this.width/2,
                                            new_y: this.y + this.height
                                        };
                                        break;
                                    case 90:
                                        return {
                                            position: "add_right", 
                                            pic: this.number_right,
                                            new_x: this.x - this.height,
                                            new_y: this.y - this.width/2
                                        };
                                        break;
                                    case 180:
                                        return -1;
                                        break;
                                    case 270:
                                        return -1;
                                        break;
                                }
                                break;
                            case "under_left":
                                switch (pos.angle) {
                                    case 0:
                                        return -1;
                                        break;
                                    case 90:
                                        return -1;
                                        break;
                                    case 180:
                                        return {
                                            position: "add_above_right", 
                                            pic: this.number_right,
                                            new_x: this.x - this.width/2,
                                            new_y: this.y + this.height
                                        };
                                        break;
                                    case 270:
                                        return {
                                            position: "add_right", 
                                            pic: this.number_right,
                                            new_x: this.x - this.height,
                                            new_y: this.y - this.height/2
                                        };
                                        break;
                                }
                                break;
                            case "under_right":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_under_right", 
                                            pic: this.number_right,
                                            new_x: this.x - this.width/2,
                                            new_y: this.y - this.height
                                        };
                                        break;
                                    case 90:
                                        return -1;
                                        break;
                                    case 180:
                                        return -1;
                                        break;
                                    case 270:
                                        return {
                                            position: "add_right", 
                                            pic: this.number_right,
                                            new_x: this.x - this.width/2,
                                            new_y: this.y
                                        };
                                        break;
                                }
                                break;
                        }
                        //return {position: "add_right", pic: this.number_right};
                }
                if (((this.x + this.width) >= pos.x) && ((this.x + this.width/2) <= pos.x) && 
                    (this.y <= pos.y) && ((this.y + this.height) >= pos.y)) {
                        // картинки не сопадают
                        if (pos.pic_nr != this.number_left) {
                            return -1;
                        }
                        switch (pos.position) {
                            case "left":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_left", 
                                            pic: this.number_left,
                                            new_x: this.x + this.width,
                                            new_y: this.y
                                        };
                                        break;
                                    case 90:
                                        return {
                                            position: "add_above_left", 
                                            pic: this.number_left,
                                            new_x: this.x + this.width/2,
                                            new_y: this.y + this.height
                                        };
                                        break;
                                    case 180:
                                        return -1;
                                        break;
                                    case 270:
                                        return {
                                            position: "add_under_left", 
                                            pic: this.number_left,
                                            new_x: this.x + this.width/2,
                                            new_y: this.y - this.width
                                        };
                                        break;
                                }
                                break;
                            case "right":
                                switch (pos.angle) {
                                    case 0:
                                        return -1;
                                        break;
                                    case 90:
                                        return {
                                            position: "add_under_left", 
                                            pic: this.number_left,
                                            new_x: this.x + this.width/2,
                                            new_y: this.y - this.width
                                        };
                                        break;
                                    case 180:
                                        return {
                                            position: "add_left", 
                                            pic: this.number_left,
                                            new_x: this.x + this.width,
                                            new_y: this.y
                                        };
                                        break;
                                    case 270:
                                        return {
                                            position: "add_above_left", 
                                            pic: this.number_left,
                                            new_x: this.x + this.width/2,
                                            new_y: this.y - this.height
                                        };
                                        break;
                                }
                                break;
                            case "above_left":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_above_left", 
                                            pic: this.number_left,
                                            new_x: this.x + this.width/2,
                                            new_y: this.y + this.height
                                        };
                                        break;
                                    case 90:
                                        return -1;
                                        break;
                                    case 180:
                                        return -1;
                                        break;
                                    case 270:
                                        return {
                                            position: "add_left", 
                                            pic: this.number_left,
                                            new_x: this.x + this.width,
                                            new_y: this.y - this.width/2
                                        };
                                        break;
                                }
                                break;
                            case "above_right":
                                switch (pos.angle) {
                                    case 0:
                                        return -1;
                                        break;
                                    case 90:
                                        return -1;
                                        break;
                                    case 180:
                                        return {
                                            position: "add_under_left", 
                                            pic: this.number_left,
                                            new_x: this.x + this.width/2,
                                            new_y: this.y
                                        };
                                        break;
                                    case 270:
                                        return {
                                            position: "add_left", 
                                            pic: this.number_left,
                                            new_x: this.x + this.width,
                                            new_y: this.y
                                        };
                                        break;
                                }
                                break;
                            case "under_left":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_under_left", 
                                            pic: this.number_left,
                                            new_x: this.x + this.width/2,
                                            new_y: this.y - this.height
                                        };
                                        break;
                                    case 90:
                                        return {
                                            position: "add_left", 
                                            pic: this.number_left,
                                            new_x: this.x + this.width,
                                            new_y: this.y
                                        };
                                        break;
                                    case 180:
                                        return -1;
                                        break;
                                    case 270:
                                        return -1;
                                        break;
                                }
                                break;
                            case "under_right":
                                return -1;
                                break;
                        }
                        //return {position: "add_right", pic: this.number_right};
                }
                break;
            case 270:
                if ((this.x <= pos.x) && ((this.x + this.width) >= pos.x) && 
                    (this.y <= pos.y) && ((this.y + this.height / 2) >= pos.y)) {
                        // картинки не сопадают
                        if (pos.pic_nr != this.number_right) {
                            return -1;
                        }
                        switch (pos.position) {
                            case "left":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_under_right", 
                                            pic: this.number_right,
                                            new_x: this.x + this.width,
                                            new_y: this.y
                                        };
                                        break;
                                    case 90:
                                        return -1;
                                        break;
                                    case 180:
                                        return {
                                            position: "add_above_right", 
                                            pic: this.number_right,
                                            new_x: this.x - this.height,
                                            new_y: this.y
                                        };
                                        break;
                                    case 270:
                                        return {
                                            position: "add_right", 
                                            pic: this.number_right,
                                            new_x: this.x,
                                            new_y: this.y - this.height
                                        };
                                        break;
                                }
                                break;
                            case "right":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_above_right", 
                                            pic: this.number_right,
                                            new_x: this.x - this.height,
                                            new_y: this.y
                                        };
                                        break;
                                    case 90:
                                        return {
                                            position: "add_right", 
                                            pic: this.number_right,
                                            new_x: this.x,
                                            new_y: this.y - this.height
                                        };
                                        break;
                                    case 180:
                                        return {
                                            position: "add_under_right", 
                                            pic: this.number_right,
                                            new_x: this.x + this.width,
                                            new_y: this.y
                                        };
                                        break;
                                    case 270:
                                        return -1;
                                        break;
                                }
                                break;
                            case "above_left":
                                switch (pos.angle) {
                                    case 0:
                                        return -1;
                                        break;
                                    case 90:
                                        return -1;
                                        break;
                                    case 180:
                                        return {
                                            position: "add_right", 
                                            pic: this.number_right,
                                            new_x: this.x - this.width,
                                            new_y: this.y - this.height/2
                                        };
                                        break;
                                    case 270:
                                        return {
                                            position: "add_under_right", 
                                            pic: this.number_right,
                                            new_x: this.x + this.width,
                                            new_y: this.y - this.height/2
                                        };
                                        break;
                                }
                                break;
                            case "above_right":
                                switch (pos.angle) {
                                    case 0:
                                        return -1;
                                        break;
                                    case 90:
                                        return {
                                            position: "add_above_right", 
                                            pic: this.number_right,
                                            new_x: this.x - this.width,
                                            new_y: this.y - this.height/2
                                        };
                                        break;
                                    case 180:
                                        return {
                                            position: "add_right", 
                                            pic: this.number_right,
                                            new_x: this.x,
                                            new_y: this.y - this.width
                                        };
                                        break;
                                    case 270:
                                        return -1;
                                        break;
                                }
                                break;
                            case "under_left":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_right", 
                                            pic: this.number_right,
                                            new_x: this.x,
                                            new_y: this.y - this.width
                                        };
                                        break;
                                    case 90:
                                        return -1;
                                        break;
                                    case 180:
                                        return -1;
                                        break;
                                    case 270:
                                        return {
                                            position: "add_above_right", 
                                            pic: this.number_right,
                                            new_x: this.x - this.width,
                                            new_y: this.y - this.height/2
                                        };
                                        break;
                                }
                                break;
                            case "under_right":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_right", 
                                            pic: this.number_right,
                                            new_x: this.x - this.width,
                                            new_y: this.y - this.width
                                        };                
                                        break;
                                    case 90:
                                        return {
                                            position: "add_under_right", 
                                            pic: this.number_right,
                                            new_x: this.x + this.width,
                                            new_y: this.y - this.height/2
                                        }; 
                                        break;
                                    case 180:
                                        return -1;
                                        break;
                                    case 270:
                                        return -1;
                                        break;
                                }
                                break;
                        }
                        //return {position: "add_above_left", pic: this.number_left};
                }
                if ((this.x <= pos.x) && ((this.x + this.width) >= pos.x) && 
                    ((this.y + this.height/2) <= pos.y) && ((this.y + this.height) >= pos.y)) {
                        // картинки не сопадают
                        if (pos.pic_nr != this.number_left) {
                            return -1;
                        }
                        switch (pos.position) {
                            case "left":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_under_left", 
                                            pic: this.number_left,
                                            new_x: this.x + this.width,
                                            new_y: this.y + this.height/2
                                        };
                                        break;
                                    case 90:
                                        return {
                                            position: "add_left", 
                                            pic: this.number_left,
                                            new_x: this.x,
                                            new_y: this.y + this.height
                                        };
                                        break;
                                    case 180:
                                        return {
                                            position: "add_under_left", 
                                            pic: this.number_left,
                                            new_x: this.x - this.height,
                                            new_y: this.y + this.height/2
                                        };
                                        break;
                                    case 270:
                                        return -1;
                                        break;
                                }
                                break;
                            case "right":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_above_left", 
                                            pic: this.number_left,
                                            new_x: this.x - this.height,
                                            new_y: this.y + this.height/2
                                        };
                                        break;
                                    case 90:
                                        return -1;
                                        break;
                                    case 180:
                                        return {
                                            position: "add_under_left", 
                                            pic: this.number_left,
                                            new_x: this.x + this.width,
                                            new_y: this.y + this.height/2
                                        };
                                        break;
                                    case 270:
                                        return {
                                            position: "add_left", 
                                            pic: this.number_left,
                                            new_x: this.x,
                                            new_y: this.y + this.height
                                        };
                                        break;
                                }
                                break;
                            case "above_left":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_left", 
                                            pic: this.number_left,
                                            new_x: this.x,
                                            new_y: this.y + this.height
                                        };
                                        break;
                                    case 90:
                                        return {
                                            position: "add_above_left", 
                                            pic: this.number_left,
                                            new_x: this.x - this.width,
                                            new_y: this.y + this.height/2
                                        };
                                        break;
                                    case 180:
                                        return -1;
                                        break;
                                    case 270:
                                        return -1;
                                        break;
                                }
                                break;
                            case "above_right":
                                switch (pos.angle) {
                                    case 0:
                                        return {
                                            position: "add_left", 
                                            pic: this.number_left,
                                            new_x: this.x - this.width,
                                            new_y: this.y + this.height
                                        };
                                        break;
                                    case 90:
                                        return -1;
                                        break;
                                    case 180:
                                        return -1;
                                        break;
                                    case 270:
                                        return {
                                            position: "add_under_left", 
                                            pic: this.number_left,
                                            new_x: this.x + this.width,
                                            new_y: this.y + this.height/2
                                        };
                                        break;
                                }
                                break;
                            case "under_left":
                                switch (pos.angle) {
                                    case 0:
                                        return -1;
                                        break;
                                    case 90:
                                        return {
                                            position: "add_under_left", 
                                            pic: this.number_left,
                                            new_x: this.x + this.width,
                                            new_y: this.y + this.height/2
                                        };
                                        break;
                                    case 180:
                                        return {
                                            position: "add_left", 
                                            pic: this.number_left,
                                            new_x: this.x - this.width,
                                            new_y: this.y + this.height
                                        };
                                        break;
                                    case 270:
                                        return -1;
                                        break;
                                }
                                break;
                            case "under_right":
                                switch (pos.angle) {
                                    case 0:
                                        return -1;
                                        break;
                                    case 90:
                                        return -1;
                                        break;
                                    case 180:
                                        return {
                                            position: "add_left", 
                                            pic: this.number_left,
                                            new_x: this.x - this.width,
                                            new_y: this.y + this.height
                                        };
                                        break;
                                    case 270:
                                        return {
                                            position: "add_above_left", 
                                            pic: this.number_left,
                                            new_x: this.x - this.width,
                                            new_y: this.y + this.height/2
                                        };
                                        break;
                                }
                                break;
                        }
                        //return {position: "add_above_right", pic: this.number_right};
                }
                break;
        }

        // no hit
        return 0;
    };

    this.rotateRight = function() {
        var w = this.width;
        this.width = this.height;
        this.height = w;

        if (this.isHorizontal) {
            this.isHorizontal = false;
        }
        else {
            this.isHorizontal = true;
        }

        this.orientation += 90;
        
        if (this.orientation == 360) {
            this.orientation = 0;
        }

        console.log("Orientation: ", this.orientation);
    };

    this.setLeftImage = function (left) {
        this.image_left = left;
    };

    this.setRightImage = function (right) {
        this.image_right = right;
    };

    this.setActive = function(active) {
        this.active = active;
    };

    this.draw = function() {
        var thisObject = this;
    
        $(context).drawFischka({
            draggable: true,
            layer: true,
            bringToFront: false,
            isHorizontal: thisObject.isHorizontal,
            x: thisObject.x,
            y: thisObject.y,
            docking: thisObject.calculateDockingPositions(),
            width: thisObject.width,
            height: thisObject.height,
            name: thisObject.name + '_shape',
            image_left: thisObject.image_left,
            image_right: thisObject.image_right, 
            load_images: true,
            groups: (thisObject.active) ? [thisObject.name + '_shape'] : [ "gamedesk" ],
            dragGroups: (thisObject.active) ? [thisObject.name + '_shape'] : [ "gamedesk" ],
            dragstart: function (layer) {
                if (thisObject.active) {
                    console.log('draggable Dragstart');
                    thisObject.x = layer.x;
                    thisObject.y = layer.y;

                    layer.load_images = true;
                    last_played_fischka = thisObject;
                }
                else {
                    thisObject.x = layer.x;
                    thisObject.y = layer.y;
                }
            },
            drag: function (layer) {
                if (thisObject.active) {
                    thisObject.x = layer.x;
                    thisObject.y = layer.y;

                    //console.log(thisObject);
                    layer.docking = thisObject.calculateDockingPositions();

                    last_played_fischka = thisObject;
                }
                else {
                    //thisObject.x = layer.x;
                    //thisObject.y = layer.y;
                }
            },
            dragstop: function (layer) {
                if (thisObject.active) {
                    thisObject.x = layer.x;
                    thisObject.y = layer.y;

                    last_played_fischka = thisObject;

                    var result = thisObject.existsCollision();
                    console.log("Result after existsCollision: ", result);
                    if (result.length > 0) {
                        var e = result[0];
                        
                        thisObject.x = e.add.new_x;
                        thisObject.y = e.add.new_y;
                        
                        gamedesk.add(thisObject);
                        redrawAll();
                    }
                }
                else {
                    thisObject.diff_x = thisObject.x - layer.x;
                    thisObject.diff_y = thisObject.y - layer.y;

                    thisObject.x = layer.x;
                    thisObject.y = layer.y;

                    thisObject.connectedGameDesk.newCoordinates(thisObject);
                }
            },
            dblclick: function(layer) {
                if (thisObject.active) {
                    console.log('поворачиваться: ', layer.name);
                    console.log('совпадает с обектом: ', thisObject.name);
                    $('canvas').removeLayer(thisObject.name + '_shape').drawLayer();
                    $('canvas').removeLayer(thisObject.name + '_img-left').drawLayer();
                    $('canvas').removeLayer(thisObject.name + '_img-right').drawLayer();
                    thisObject.rotateRight(); 
                    //thisObject.x = layer.x;
                    //thisObject.y = layer.y;
                    //thisObject.draw();
                    last_played_fischka = thisObject;

                    redrawAll();
                }
                else {
                    console.log("GameDesk");
                }
            }
            /* updateDragX: function(layer, x) {
                //thisObject.x = layer.x;
                console.log("Ich bin: " + thisObject.name + " bekomme x-Update.");
                return x;
            },
            updateDragY: function(layer, y) {
                //thisObject.y = layer.y;
                console.log("Ich bin: " + thisObject.name + " bekomme y-Update.");
                return y;
            } */
        });

        switch (this.orientation) {
            case 0:
                $(context).drawImage({
                    draggable: true,
                    bringToFront: true,
                    rotate: 0,
                    name: thisObject.name+'_img-left',
                    groups: (thisObject.active) ? [thisObject.name + '_shape'] : [ "gamedesk" ],
                    dragGroups: (thisObject.active) ? [thisObject.name + '_shape'] : [ "gamedesk" ],
                    source: thisObject.image_left,
                    x: thisObject.x + thisObject.width / 4, 
                    y: thisObject.y + thisObject.height / 2,
                    dragstart: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'dragstart');
                    },
                    drag: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'drag');
                    },
                    dragstop: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'dragstop');
                    },
                    dblclick: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'dblclick');
                    }
                });
                $(context).drawImage({
                    draggable: true,
                    bringToFront: true,
                    rotate: 0,
                    name: thisObject.name+'_img-right',
                    groups: (thisObject.active) ? [thisObject.name + '_shape'] : [ "gamedesk" ],
                    dragGroups: (thisObject.active) ? [thisObject.name + '_shape'] : [ "gamedesk" ],
                    source: thisObject.image_right,
                    x: thisObject.x + 3*thisObject.width / 4, 
                    y: thisObject.y + thisObject.height / 2,
                    dragstart: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'dragstart');
                    },
                    drag: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'drag');
                    },
                    dragstop: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'dragstop');
                    },
                    dblclick: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'dblclick');
                    } 
                });
                break;
            case 90:
                $(context).drawImage({
                    draggable: true,
                    bringToFront: true,
                    rotate: 90,
                    name: thisObject.name+'_img-left',
                    groups: (thisObject.active) ? [thisObject.name + '_shape'] : [ "gamedesk" ],
                    dragGroups: (thisObject.active) ? [thisObject.name + '_shape'] : [ "gamedesk" ],
                    source: thisObject.image_left,
                    x: thisObject.x + thisObject.width / 2, 
                    y: thisObject.y + thisObject.height / 4,
                    dragstart: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'dragstart');
                    },
                    drag: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'drag');
                    },
                    dragstop: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'dragstop');
                    },
                    dblclick: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'dblclick');
                    } 
                });
                $(context).drawImage({
                    draggable: true,
                    bringToFront: true,
                    rotate: 90,
                    name: thisObject.name+'_img-right',
                    groups: (thisObject.active) ? [thisObject.name + '_shape'] : [ "gamedesk" ],
                    dragGroups: (thisObject.active) ? [thisObject.name + '_shape'] : [ "gamedesk" ],
                    source: thisObject.image_right,
                    x: thisObject.x + thisObject.width / 2, 
                    y: thisObject.y + 3*thisObject.height / 4,
                    dragstart: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'dragstart');
                    },
                    drag: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'drag');
                    },
                    dragstop: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'dragstop');
                    },
                    dblclick: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'dblclick');
                    } 
                });
                break;
            case 180:
                $(context).drawImage({
                    draggable: true,
                    bringToFront: true,
                    rotate: 180,
                    name: thisObject.name+'_img-left',
                    groups: (thisObject.active) ? [thisObject.name + '_shape'] : [ "gamedesk" ],
                    dragGroups: (thisObject.active) ? [thisObject.name + '_shape'] : [ "gamedesk" ],
                    source: thisObject.image_left,
                    x: thisObject.x + 3*thisObject.width / 4, 
                    y: thisObject.y + thisObject.height / 2,
                    dragstart: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'dragstart');
                    },
                    drag: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'drag');
                    },
                    dragstop: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'dragstop');
                    },
                    dblclick: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'dblclick');
                    } 
                });
                $(context).drawImage({
                    draggable: true,
                    bringToFront: true,
                    rotate: 180,
                    name: thisObject.name+'_img-right',
                    groups: (thisObject.active) ? [thisObject.name + '_shape'] : [ "gamedesk" ],
                    dragGroups: (thisObject.active) ? [thisObject.name + '_shape'] : [ "gamedesk" ],
                    source: thisObject.image_right,
                    x: thisObject.x + thisObject.width / 4, 
                    y: thisObject.y + thisObject.height / 2,
                    dragstart: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'dragstart');
                    },
                    drag: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'drag');
                    },
                    dragstop: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'dragstop');
                    },
                    dblclick: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'dblclick');
                    } 
                });
                break;
            case 270:
                $(context).drawImage({
                    draggable: true,
                    bringToFront: true,
                    rotate: 270,
                    name: thisObject.name+'_img-left',
                    groups: (thisObject.active) ? [thisObject.name + '_shape'] : [ "gamedesk" ],
                    dragGroups: (thisObject.active) ? [thisObject.name + '_shape'] : [ "gamedesk" ],
                    source: thisObject.image_left,
                    x: thisObject.x + thisObject.width / 2, 
                    y: thisObject.y + 3*thisObject.height / 4,
                    dragstart: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'dragstart');
                    },
                    drag: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'drag');
                    },
                    dragstop: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'dragstop');
                    },
                    dblclick: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'dblclick');
                    } 
                });
                $(context).drawImage({
                    draggable: true,
                    bringToFront: true,
                    rotate: 270,
                    name: thisObject.name+'_img-right',
                    groups: (thisObject.active) ? [thisObject.name + '_shape'] : [ "gamedesk" ],
                    dragGroups: (thisObject.active) ? [thisObject.name + '_shape'] : [ "gamedesk" ],
                    source: thisObject.image_right,
                    x: thisObject.x + thisObject.width / 2, 
                    y: thisObject.y + thisObject.height / 4,
                    dragstart: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'dragstart');
                    },
                    drag: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'drag');
                    },
                    dragstop: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'dragstop');
                    },
                    dblclick: function(layer) {
                        $('canvas').triggerLayerEvent(thisObject.name + '_shape', 'dblclick');
                    } 
                });
                break;
        }              
    }
}

// Zeichnen von Dominosteinen
// Рисовать фишки
$.jCanvas.extend({
    name: 'drawFischka',
    type: 'fischka',
    props: {
        load_images: true,
        isHorizontal: true,
        docking: null
    },
    fn: function(ctx, params) {
        var p = params;
        // Enable layer transformations like scale and rotate
        $.jCanvas.transformShape(this, ctx, p);
        // Draw FieldItem
        ctx.beginPath();
        
        ctx.fillStyle = '#f4f6f5';
        
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.width-10, p.y);
        ctx.quadraticCurveTo(p.x + p.width, p.y, p.x + p.width, p.y + 10);
        ctx.lineTo(p.x + p.width, p.y + p.height - 10);
        ctx.quadraticCurveTo(p.x + p.width, p.y + p.height, p.x + p.width - 10, p.y + p.height);
        ctx.lineTo(p.x + 10, p.y + p.height);
        ctx.quadraticCurveTo(p.x, p.y + p.height, p.x, p.y + p.height - 10);
        ctx.lineTo(p.x, p.y + 10);
        ctx.quadraticCurveTo(p.x, p.y, p.x + 10, p.y); 
        
        ctx.fill();

        // #a3a5a4
        if (p.isHorizontal) {
            ctx.strokeStyle = '#a3a5a4';
            ctx.moveTo(p.x + p.width/2, p.y + 5);
            ctx.lineTo(p.x + p.width/2, p.y + p.height - 5);
        }
        else {
            ctx.strokeStyle = '#a3a5a4';
            ctx.moveTo(p.x + 5, p.y + p.height / 2);
            ctx.lineTo(p.x + p.width - 5, p.y + p.height/2);
        }

        // Показывать всех точек вокруг фишки
        /*
        if (p.docking != null) {
            p.docking.forEach(pos => {
                ctx.font = "12px Arial";
                ctx.fillText(pos.position, pos.x, pos.y);
            });
        } */

        // Call the detectEvents() function to enable jCanvas events
        // Be sure to pass it these arguments, too!
        $.jCanvas.detectEvents(this, ctx, p);
        // Call the closePath() functions to fill, stroke, and close the path
        // This function also enables masking support and events
        // It accepts the same arguments as detectEvents()
        $.jCanvas.closePath(this, ctx, p);
    }
  }
);