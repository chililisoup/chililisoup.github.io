	
    //General canvas reference
    //https://www.w3schools.com/tags/ref_canvas.asp
    //----
    //Select area to draw
    //https://www.w3schools.com/code/tryit.asp?filename=G3ECBL9TW86S
    //----
    //Better circle/square brush (won't work for custom shape brushes)
    //https://www.w3schools.com/code/tryit.asp?filename=G3ECCXZMBM0A
    //----
    //Change canvas 0,0 (useful when brush gets offset
    //https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_translate
    //----
    //Custom brush!
    //https://www.w3schools.com/code/tryit.asp?filename=G3ECJMPPRT15
	
    var brush;
    var draw = false;
    var mouseX;
    var mouseY;
    var runSpeed = 1;
    var canvasWidth = 960;
    var canvasHeight = 540;
    var brushSize = 20;
    var brushType = 0;
    var brushShape = 1;
    var brushColor;
    var later = false;
    var brushAlpha = 1;
    var newStroke = true;
    var lastImage;
    var undoLast = false;
    window.addEventListener('mousedown', function() {
        draw = true;
        getCoords(event);
    });
    
    window.addEventListener('mouseup', function() {
        draw = false;
        newStroke = true;
    });
    
    function start() {
        if (later) {
            var check = confirm("Are you sure?");
            if (check) {
                area.clear();
                brushChange(3);
                draw = false;
                newStroke = true;
            }
        } else {
            document.getElementById("br1").style.border = "3px solid #42a9f7";
            document.getElementById("br1").style.cursor = "default";
        }
        later = true;
        document.getElementById("resButton").innerHTML = "Reset Canvas";
        
        brush = new component(brushSize, brushSize, "rgb(0,0,0)", -brushSize, -brushSize);
        area.start();
    }
	
    var area = {
        canvas : document.createElement("canvas"),
        start : function() {
            this.canvas.width = canvasWidth;
            this.canvas.height = canvasHeight;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.interval = setInterval(updateArea, runSpeed);
        },
        clear : function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    
    function component(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;    
        this.update = function() {
            ctx = area.context;
            ctx.strokeStyle = brushColor;
            ctx.globalAlpha = brushAlpha;
            ctx.lineWidth = brushSize;
            
            if (brushShape == 0) {
                ctx.lineJoin = "miter";
                ctx.lineCap = "square";
            } else if (brushShape == 1) {
                ctx.lineJoin = "round";
                ctx.lineCap = "round";
            }
            
            if (brushType == 0) {
                ctx.globalCompositeOperation = 'source-over';
            } else {
                ctx.globalCompositeOperation = 'destination-out';
            }
            if (draw) {
                if (newStroke) {
                    lastImage = ctx.getImageData(0, 0, canvasWidth, canvasHeight)
                    ctx.beginPath();
                    ctx.moveTo(oldX,oldY);
                }
                
                newStroke = false;
                
                ctx.lineTo(mouseX,mouseY);
            
                ctx.stroke();
            }
            if (undoLast) {
                area.clear();
                ctx.putImageData(lastImage, 0, 0);
                undoLast = false;
            }
            
    	}   
    }
    
    function updateArea() {   
    	brush.update();
    }
	
    function getCoords(event) {
        oldX = mouseX;
        oldY = mouseY;
        mouseX = event.clientX - 15;
        mouseY = event.clientY - 15;
    }
    
    function brushChange(n) {
        if (n == 0) { //Make better buttons then fix this
            brushType = 0;
            brushShape = 0;
        } else if (n == 1) {
            brushType = 0;
            brushShape = 1;
        } else if (n == 2) {
            brushType = 1;
            brushShape = 0;
        } else {
            brushType = 1;
            brushShape = 1;
        }
        
        if (n == 0) {
            document.getElementById("br0").style.border = "3px solid #42a9f7";
            document.getElementById("br0").style.cursor = "default";
            
            document.getElementById("br1").style.border = "";
            document.getElementById("br2").style.border = "";
            document.getElementById("br3").style.border = "";
            document.getElementById("br1").style.cursor = "";
            document.getElementById("br2").style.cursor = "";
            document.getElementById("br3").style.cursor = "";
        } else if (n == 1) {
            document.getElementById("br1").style.border = "3px solid #42a9f7";
            document.getElementById("br1").style.cursor = "default";
            
            document.getElementById("br0").style.border = "";
            document.getElementById("br2").style.border = "";
            document.getElementById("br3").style.border = "";
            document.getElementById("br0").style.cursor = "";
            document.getElementById("br2").style.cursor = "";
            document.getElementById("br3").style.cursor = "";
        } else if (n == 2) {
            document.getElementById("br2").style.border = "3px solid #42a9f7";
            document.getElementById("br2").style.cursor = "default";
            
            document.getElementById("br0").style.border = "";
            document.getElementById("br1").style.border = "";
            document.getElementById("br3").style.border = "";
            document.getElementById("br0").style.cursor = "";
            document.getElementById("br1").style.cursor = "";
            document.getElementById("br3").style.cursor = "";
        } else {
            document.getElementById("br3").style.border = "3px solid #42a9f7";
            document.getElementById("br3").style.cursor = "default";
            
            document.getElementById("br0").style.border = "";
            document.getElementById("br1").style.border = "";
            document.getElementById("br2").style.border = "";
            document.getElementById("br0").style.cursor = "";
            document.getElementById("br1").style.cursor = "";
            document.getElementById("br2").style.cursor = "";
        }
    }
	
    var sizeSlider = document.getElementById("brushRange");
    var sizeIndicator = document.getElementById("sizeTxt");
    sizeIndicator.innerHTML = sizeSlider.value;
    sizeSlider.oninput = function() {
        sizeIndicator.innerHTML = this.value;
        brushSize = this.value;
        brush = new component(brushSize, brushSize, "rgb(0,0,0)", -brushSize, -brushSize);
    }
    
    var alphaSlider = document.getElementById("brushAlpha");
    var alphaIndicator = document.getElementById("alphaTxt");
    alphaIndicator.innerHTML = alphaSlider.value;
    alphaSlider.oninput = function() {
        alphaIndicator.innerHTML = this.value;
        brushAlpha = this.value;
    }
    
    
    var colorPicker = document.getElementById("colorSelect");
    colorPicker.oninput = function() {
        brushColor = this.value;
    }
    
    var wSet = document.getElementById("setWidth");
    var hSet = document.getElementById("setHeight");
    wSet.oninput = function() {
        canvasWidth = this.value;
    }
    hSet.oninput = function() {
        canvasHeight = this.value;
    }
    
    function undoStroke() {
        undoLast = true;
    }
        
