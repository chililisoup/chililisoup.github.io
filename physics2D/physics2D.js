// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

var canWidth = 1000,
    canHeight = 600;
var objectSides = 0;
var objectRestitution = 0.4
var objectColor = "#ff8000"

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: canWidth,
        height: canHeight,
        pixelRatio: 1,
        background: '#cccccc',
        wireframes: false,
        wireframeBackground: '#222',
        hasBounds: false,
        enabled: true,
        showSleeping: true,
        showDebug: false,
        showBroadphase: false,
        showBounds: false,
        showVelocity: false,
        showCollisions: false,
        showSeparations: false,
        showAxes: false,
        showPositions: false,
        showAngleIndicator: true,
        showIds: false,
        showShadows: false,
        showVertexNumbers: false,
        showConvexHulls: false,
        showInternalEdges: false,
        showMousePosition: false
    }
});
 

// create ground & walls
var ground = Bodies.rectangle((canWidth * 0.5), (canHeight + 10), (canWidth + 10), 60, { isStatic: true }),
    wallA = Bodies.rectangle(0, ((canHeight * 0.5) + 5), 60, (canHeight + 10), { isStatic: true }),
    wallB = Bodies.rectangle(canWidth, (canHeight * 0.5), 60, (canHeight + 10), { isStatic: true }),
    roof = Bodies.rectangle((canWidth * 0.5), 0, (canWidth + 10), 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [ground, wallA, wallB, roof]);
  
function spawnObject() {
    World.add(engine.world, [Bodies.polygon((canWidth * 0.5), (canHeight * 0.5), objectSides, 50, { restitution: objectRestitution, render: { fillStyle: objectColor } })]);
}

var wireToggled = 1;
function toggleWire() {
    if (wireToggled == 1) {
        render.options.wireframes = true;
        wireToggled = 0;
    } else {
        render.options.wireframes = false;
        wireToggled = 1;
    }
}

var angleToggled = 0;
function toggleAngle() {
    if (angleToggled == 1) {
        render.options.showAngleIndicator = true;
        angleToggled = 0;
    } else {
        render.options.showAngleIndicator = false;
        angleToggled = 1;
    }
}

var sideSlider = document.getElementById("sideSlider");
var sideIndicator = document.getElementById("sideTxt");
sideSlider.oninput = function() {
    if (this.value == 0) {
        objectSides = this.value;
        sideIndicator.innerHTML = "Circle";
    } else {
        objectSides = parseInt(this.value);
        objectSides += 2;
        sideIndicator.innerHTML = (objectSides + " Sides");
    }
}

var bounceSlider = document.getElementById("bounceSlider");
var bounceIndicator = document.getElementById("bounceTxt");
bounceSlider.oninput = function() {
    objectRestitution = this.value;
    bounceIndicator.innerHTML = ("Restitution: " + objectRestitution);
}

var colorInput = document.getElementById("colorInput");
colorInput.oninput = function() {
    objectColor = this.value;
}

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
  
  
var world = engine.world;
var Mouse= Matter.Mouse;
var MouseConstraint=Matter.MouseConstraint;
var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {mouse: mouse});
World.add(world, mouseConstraint);


  
