// Class CStack
function CStack(x, y, name, context) {
    this.x = x;
    this.y = y;
    this.width = 150;
    this.height = 80;
    this.name = name;
    this.fischki_stack = Array();

    this.image_left = domino_back_left;
    this.image_right = domino_back_right;

    this.isHorizontal = true;

    this.setFischkiStack = function(ar) {
        this.fischki_stack = ar;
    };

    this.alignment = function() {
        var w = this.width;
        this.width = this.height;
        this.height = w;

        if (this.isHorizontal) {
            this.isHorizontal = false;
        }
        else {
            this.isHorizontal = true;
        }
    };
    
    this.draw = function() {
        thisObject = this;
    
        $(context).drawStack({
            draggable: true,
            layer: true,
            bringToFront: false,
            isHorizontal: thisObject.isHorizontal,
            x: thisObject.x,
            y: thisObject.y,
            width: thisObject.width,
            height: thisObject.height,
            name: thisObject.name+'_shape',
            image_left: thisObject.image_left,
            image_right: thisObject.image_right, 
            load_images: true,
            groups: [thisObject.name + '_shape'],
            dragGroups: [thisObject.name + '_shape'],
            dragstart: function (layer) {
                console.log('draggable Dragstart');
                thisObject.x = layer.x;
                thisObject.y = layer.y;

                layer.load_images = true;
            },
            drag: function (layer) {
                thisObject.x = layer.x;
                thisObject.y = layer.y;
            },
            dragstop: function (layer) {
                thisObject.x = layer.x;
                thisObject.y = layer.y;
            },
            click: function(layer) {
                console.log("Событие в лайер: " + layer);
                console.log("Склад фишек: " + thisObject);
                if (stack.fischki_stack != null) {
                    var f = stack.fischki_stack.pop();
                    f.draw();
                    
                    // Игрок получает фишку
                    player.push(f);
                }
            }
        });
        if (thisObject.isHorizontal) {
            $(context).drawImage({
                draggable: true,
                bringToFront: true,
                isHorizontal: thisObject.isHorizontal,
                name: thisObject.name+'_img-left',
                groups: [thisObject.name + '_shape'],
                dragGroups: [thisObject.name + '_shape'],
                source: thisObject.image_left,
                x: thisObject.x + thisObject.width / 4, 
                y: thisObject.y + thisObject.height / 2 
            });
            $(context).drawImage({
                draggable: true,
                bringToFront: true,
                isHorizontal: thisObject.isHorizontal,
                name: thisObject.name+'_img-right',
                groups: [thisObject.name + '_shape'],
                dragGroups: [thisObject.name + '_shape'],
                source: thisObject.image_right,
                x: thisObject.x + 3*thisObject.width / 4, 
                y: thisObject.y + thisObject.height / 2 
            });
        }
        else {
            $(context).drawImage({
                draggable: true,
                bringToFront: true,
                isHorizontal: thisObject.isHorizontal,
                rotate: 90,
                name: thisObject.name+'_img-left',
                groups: [thisObject.name + '_shape'],
                dragGroups: [thisObject.name + '_shape'],
                source: thisObject.image_left,
                x: thisObject.x + thisObject.width / 2, 
                y: thisObject.y + thisObject.height / 4 
            });
            $(context).drawImage({
                draggable: true,
                bringToFront: true,
                isHorizontal: thisObject.isHorizontal,
                rotate: 90,
                name: thisObject.name+'_img-right',
                groups: [thisObject.name + '_shape'],
                dragGroups: [thisObject.name + '_shape'],
                source: thisObject.image_right,
                x: thisObject.x + thisObject.width / 2, 
                y: thisObject.y + 3*thisObject.height / 4 
            });
        }
    }
}

// Zeichnen von Dominosteinen
// Рисовать фишки
$.jCanvas.extend({
    name: 'drawStack',
    type: 'stack',
    props: {
        load_images: true,
        isHorizontal: true,
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