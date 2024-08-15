class PAR {

    static server_address = "192.168.1.18";
    static server_port = 5555;
    
    static d_RECEIVED = false;

    static CONNECT_2_PYTHON = false;
    static CONNECT_2_LIVE_SERVER = false;

    static DRAW_CANVAS_FRAME = true;
    static DRAW_OFFSET_FRAME = true;

    static PRINT_CANVAS_FRAME = false; // should always be false
    static PRINT_OFFSET_FRAME = true; // paspartu, kind of

    static MARGIN = { x: 50, y: 50 }; // in px

    static G0_SPEED = 5;
    static G1_SPEED = 5;

    static PAUSE_TIME_AT_LINE_END_SEC = 0.2;
    static PAUSE_TIME_AFTER_PEN_DOWN_SEC = 0.2;
    static PAUSE_TIME_BEFORE_PEN_UP_SEC = 0.2;

    // static PEN_DOWN_MM = 62.5;
    static PEN_DOWN_MM = 38;
    static PEN_UP_OFFSET_MM = 15;
    static PEN_UP_MM;

    static U = null;
    static V = null;

    // A4 calibration
    static TL = { x: 152, y: -140, z: PAR.PEN_DOWN_MM };
    static TR = { x: 152, y: -140 + 1, z: PAR.PEN_DOWN_MM };
    static BL = { x: 152 + 1, y: -140, z: PAR.PEN_DOWN_MM };  
       
    // polar calibration
    static TL_POLAR = { x: 381, y: -93, z: PAR.PEN_DOWN_MM };
    static TR_POLAR = { x: 381, y: -93 + 1, z: PAR.PEN_DOWN_MM };
    static BL_POLAR = { x: 381 + 1, y: -93, z: PAR.PEN_DOWN_MM };

    static IS_PAPER_POLAR = false;
    static PAPER_W_MM_POLAR = 880;
    static PAPER_H_MM_POLAR = 880; 

    static PAPER_SIZES = {
        "A4": { w: 297, h: 210 },
        "A3": { w: 297, h: 420 },
        "B0": { w: 1000, h: 1414 },
        "JYSK": { w: 600, h: 900 },
        "Hammer": { w: 700, h: 1000 }, 
    };

    static PAPER = "A4";
    static PAPER_SIZE = PAR.PAPER_SIZES[PAR.PAPER];    
    static PAPER_W_MM = PAR.PAPER_SIZE.w;
    static PAPER_H_MM = PAR.PAPER_SIZE.h;

    static CANVAS_SCALE = 3; // how much canvas is bigger then real paper; p5 canvas scale (px = SCALE * mm (also browser zoom scale should be at 100%)
    static CANVAS_SCALE_POLAR = 0.85;
    static CANVAS_W_PX;
    static CANVAS_H_PX;

    // TODO: should be moved
    // Mandala related
    static MIN_ID = 1;
    static MAX_ID = 6;
    static MIN_R = 150; // this is in pixel but if CANVAS_SCALE is 1 then it is the same as mm
    static MAX_R = 400;

    // TODO: should be moved
    // Mandala related
    static LETUCE_W = 1000;
    static LETUCE_H = 800;
    static LETTUCE_SKETCH_SCALE = 0.5; // this is relevant only for sketches and not for mandala
    static LETTUCE_MANDALA_SCALE = 0.07; // this is relevant only for Mandala and not for sketches
    
    static IS_DRAWING_PLACEHOLDER_FRAME = false;

    // Draw Area (defined by MARGIN)
    static DRAW_W;
    static DRAW_H;

    static LOG_GCODE = false;
    static SAVE_SVG = false;
    static DOWNLOAD_GCODE = true;
    static ANIMATE = false;

    static initialize() {
        console.log("Initializing parameters");
        console.log("Connect to Python:", this.CONNECT_2_PYTHON)

        console.log(PAR.PAPER_SIZE);

        if (this.IS_PAPER_POLAR) {
            console.log("Paper is polar");
            this.PAPER_W_MM = this.PAPER_W_MM_POLAR;
            this.PAPER_H_MM = this.PAPER_H_MM_POLAR;
            this.CANVAS_SCALE = this.CANVAS_SCALE_POLAR;

            this.TL = this.TL_POLAR;
            this.TR = this.TR_POLAR;
            this.BL = this.BL_POLAR;
        }

        // determine canvas size
        this.CANVAS_W_PX = this.CANVAS_SCALE * this.PAPER_W_MM;
        this.CANVAS_H_PX = this.CANVAS_SCALE * this.PAPER_H_MM;

        // determine draw area
        this.DRAW_W = this.CANVAS_W_PX - 2 * this.MARGIN.x;
        this.DRAW_H = this.CANVAS_H_PX - 2 * this.MARGIN.y;

        // determine pen up position
        this.PEN_UP_MM = this.PEN_DOWN_MM + this.PEN_UP_OFFSET_MM;

        // do calibration
        this.do_calibration();

        console.log("Paper size (mm):", this.PAPER_W_MM, this.PAPER_H_MM);
        console.log("Canvas sie (px):", this.CANVAS_W_PX, this.CANVAS_H_PX);
        console.log("Drawable area (px):", this.DRAW_W, this.DRAW_H);
        console.log("Margin (px):", this.MARGIN);
    }

    // TODO 1: 
    //      - look at:
    //            - calibrate_user_orientation_offset
    //            - calibrate_tcp_coordinate_offset methods of xarm
    //      - also look here how UR defines features (user coordinate spaces)
    // TODO 2:
    //      - RoboDK has options called Utilities -> Define TCP and User Frame
    static do_calibration() {
        let vTL = p.createVector(this.TL.x, this.TL.y, this.TL.z);
        let vTR = p.createVector(this.TR.x, this.TR.y, this.TR.z);
        let vBL = p.createVector(this.BL.x, this.BL.y, this.BL.z);
        this.TL = vTL;
        this.TR = vTR;
        this.BL = vBL;
        this.U = p5.Vector.sub(this.TR, this.TL).normalize();
        this.V = p5.Vector.sub(this.BL, this.TL).normalize();
        console.log("U, V", this.U, this.V);
        let dot = p5.Vector.dot(this.U, this.V);
        console.log("dot:", dot); // should be 0
    }
}