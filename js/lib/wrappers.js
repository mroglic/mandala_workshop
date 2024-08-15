class DrawingApp {
    
    constructor(strokeColor) {
        this.sketchAddress = window.location.href;
        console.log("Sketch address: ", this.sketchAddress);

        // to be asigned
        this.sio = null;
        this.clientId = null;

        this.width = PAR.LETUCE_W * PAR.LETTUCE_SKETCH_SCALE;
        this.height = PAR.LETUCE_H * PAR.LETTUCE_SKETCH_SCALE;

        this.overrideP5Methods();

        this.commands = [];

        this.strokeColor = strokeColor;
    }

    overrideP5Methods() {

        this.originalLine = p5.prototype.line;
        this.originalRect = p5.prototype.rect;
        this.originalCircle = p5.prototype.circle;
        this.originalStroke = p5.prototype.stroke;

        let app = this;

        p5.prototype.line = function (x1, y1, x2, y2) {
            app.originalLine.call(this, x1, y1, x2, y2);
            //app.sendShapeData('line', { x1, y1, x2, y2 });
            app.commands.push({ type: 'line', data: { x1, y1, x2, y2 } });
        };

        p5.prototype.rect = function (x, y, w, h) {
            app.originalRect.call(this, x, y, w, h);
            //app.sendShapeData('rect', { x, y, w, h });
     
            app.commands.push({ type: 'rect', data: { x, y, w, h } });
        };

        p5.prototype.circle = function (x, y, d) {
            app.originalCircle.call(this, x, y, d);
            //app.sendShapeData('circle', { x, y, d: d });
            app.commands.push({ type: 'circle', data: { x, y, d: d } });
        };

        p5.prototype.stroke = function (r, g, b) {
            app.originalStroke.call(this, r, g, b);
           // app.color = [ r, g, b ];
        }
    }

    connect(callback) {
        this.init();

        this.sio = io.connect('http://127.0.0.1:' + PAR.socket_port);

        this.sio.on('connect', () => {
            console.log('Connected to server');
            const sketchAddress = this.sketchAddress;
            const color = this.strokeColor;
            this.sio.emit('new_connection', { sketchAddress, color });
        });

        // Listen for the client ID from the server
        this.sio.on('client_id', (data) => {
            console.log("Received client ID: " + data.clientId);
            this.clientId = data.clientId;

            // Call the provided callback function
            if (callback) {
                callback();
            }
        });
    }

    init() {
        background(33);
        noFill();
        stroke(255);
        strokeWeight(1);

        this.pg = createGraphics(this.width, this.height);

        rectMode(CENTER);
    }

    sendShapeData(type, data) {
        console.log(`Sending ${type} data:`, data);
        let clientId = this.clientId;
        this.sio.emit('shape', { type, data, clientId });
    }

    send_all_commands() {
        if (this.commands.length > 0) {
            let toSend = {
                commands: this.commands,
                clientId: this.clientId,
                color: this.strokeColor
            };
            this.sio.emit('shapes', toSend);
            console.log("Sendings:", toSend)
            // Clear the commands array after sending
            this.commands = [];
        }
    }


    sendNumberOfPlaceholders(num_of_placeholders) {
        console.log("Sending num_of_placeholders: ", num_of_placeholders);
        let clientId = this.clientId;
        this.sio.emit('num_of_placeholders', { num_of_placeholders, clientId });
    }

    mouseDragged() {
        line(mouseX, mouseY, pmouseX, pmouseY);
    }

    sendGraphics() {
        background(127);

        // Draw something on the p5.Graphics object
        this.pg.fill(255);
        this.pg.noStroke();
        this.pg.ellipse(mouseX, mouseY, 22, 22);

        // Display the p5.Graphics object
        image(this.pg, 0, 0);

        // Get the pixel data from the p5.Graphics object
        this.pg.loadPixels();
        let pixelData = this.pg.pixels;

        // Create an ArrayBuffer and DataView for transmitting the pixel data
        let buffer = new ArrayBuffer(pixelData.length);
        let view = new Uint8Array(buffer);
        for (let i = 0; i < pixelData.length; i++) {
            view[i] = pixelData[i];
        }

        // console.log("Sending graphics with length: ", buffer.byteLength);
        this.sio.emit('graphics', buffer);
    }

    sendMouse(xpos, ypos) {
        fill(255);
        noStroke();
        ellipse(mouseX, mouseY, 22, 22);

        // We are sending!
        console.log("sendmouse: " + xpos + " " + ypos);

        // Make a little object with x and y
        var data = {
            x: xpos,
            y: ypos
        };

        // Send that object to the socket
        this.sio.emit('mouse', data);
    }
}