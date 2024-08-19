class CollabDraw {

    constructor(strokeColor) {

        // to be asigned
        this.sio = null;
        this.clientId = null;

        // sketch address
        this.sketchAddress = window.location.href;
        console.log("Sketch address: " + this.sketchAddress);

        // sketch size
        this.width = PAR.SYMBOL_W * PAR.SYMBOL_SKETCH_SCALE;
        this.height = PAR.SYMBOL_H * PAR.SYMBOL_SKETCH_SCALE;

        this.commands = [];

        this.strokeColor = strokeColor;

        // slider
        // retrieve the saved value from local storage or use the default value
        this.defaultSymbols = 2;
        this.minSymbols = 2;
        this.maxSymbols = 30;
        this.sliderName = 'slider_' + this.sketchAddress;
        this.currSymbols = localStorage.getItem(this.sliderName) ? parseInt(localStorage.getItem(this.sliderName)) : this.defaultSymbols;

        // gui
        this.gui = QuickSettings.create(this.width + 10, 0, "Params");
        //this.gui.addButton("Clear", () => this.clearCommands())
        this.gui.addRange("Symbols", this.minSymbols, this.maxSymbols, this.currSymbols, 1, (value) => this.sliderChanged(value));
        this.gui.addHTML("Symbol id", this.clientId)
        this.gui.addText("Sketch address", this.sketchAddress);
 
        this.disableTouchScrollOnCanvas();

        createCanvas(this.width, this.height);
    }

    init() {

        this.pg = createGraphics(this.width, this.height);

        // symbol graphics (where symbol will be drawn)
        this.sg = createGraphics(this.width, this.height);
        this.sg.rectMode(CENTER);
        // draw frame around canvas
        this.sg.stroke(255);
        this.sg.noFill();
        this.sg.rect(this.width / 2, this.height / 2, this.width, this.height);

        rectMode(CENTER);
    }

    connect(callback) {
        this.init();

        this.sio = io.connect(PAR.socket_address + ":" + PAR.socket_port);

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
            this.onConnect(callback);
        });
    }

    onConnect(callback) {

        // send num_placeholders
        let numSymbolsOnCirle = this.gui.getValue("Symbols");
        console.log("numSymbolsOnCirle: ", numSymbolsOnCirle);
        this.sendNumberOfPlaceholders(numSymbolsOnCirle);

        this.gui.setValue("Symbol id", this.clientId);

        stroke(this.strokeColor);

        callback();
    }

    line(x1, y1, x2, y2) {
        this.sg.stroke(this.strokeColor);
        this.sg.line(x1, y1, x2, y2);
        this.commands.push({ type: 'line', data: { x1, y1, x2, y2 } });
    }

    rect(x, y, w, h) {
        this.sg.stroke(this.strokeColor);
        this.sg.rect(x, y, w, h);
        this.commands.push({ type: 'rect', data: { x, y, w, h } });
    }

    circle(x, y, d) {
        this.sg.stroke(this.strokeColor);
        this.sg.circle(x, y, d);
        this.commands.push({ type: 'circle', data: { x, y, d: d } });
    }

    sendShapeData(type, data) {
        console.log(`Sending ${type} data:`, data);
        let clientId = this.clientId;
        this.sio.emit('shape', { type, data, clientId });
    }

    sendAllCommands() {
        if (this.commands.length > 0) {
            let toSend = {
                commands: this.commands,
                clientId: this.clientId,
                color: this.strokeColor
            };
            this.sio.emit('shapes', toSend);
            console.log("Sending:", toSend)
            // Clear the commands array after sending
            this.commands = [];
        }
    }

    clearCommands() {
        this.commands = [];
        this.sg.clear();
        let toSend = {
            commands: this.commands,
            clientId: this.clientId,
            color: this.strokeColor
        };
        console.log("Sending:", toSend)
        this.sio.emit('shapes', toSend);
    }

    sendNumberOfPlaceholders(num_of_placeholders) {
        console.log("Sending num_of_placeholders: ", num_of_placeholders);
        let clientId = this.clientId;
        this.sio.emit('num_of_placeholders', { num_of_placeholders, clientId });
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

    sliderChanged(value) {
        this.currSymbols = value;
        console.log("Slider: " + this.sliderName + ", value: " + this.currSymbols);
        localStorage.setItem(this.sliderName, this.currSymbols); // Save to local storage
        this.sendNumberOfPlaceholders(this.currSymbols);
    }

    getValue() {
        return this.currSymbols;
    }

    disableTouchScrollOnCanvas() {

        // let canvasElement = document.querySelector('canvas');

        // canvasElement.addEventListener('touchstart', function (event) {
        //     event.preventDefault();
        // }, { passive: false });

        // canvasElement.addEventListener('touchmove', function (event) {
        //     event.preventDefault();
        // }, { passive: false });

        // canvasElement.addEventListener('touchend', function (event) {
        //     event.preventDefault();
        // }, { passive: false });
    }
}