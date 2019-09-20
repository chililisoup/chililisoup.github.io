// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

var canWidth = 800,
    canHeight = 600;

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
    wallB = Bodies.rectangle(canWidth, (canHeight * 0.5), 60, (canHeight + 10), { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [ground, wallA, wallB]);
  
function spawnCircle() {
    World.add(engine.world, [Bodies.polygon((canWidth * 0.5), (canHeight * 0.5), 0, 50)]);
}

function spawnTri() {
    World.add(engine.world, [Bodies.polygon((canWidth * 0.5), (canHeight * 0.5), 3, 50)]);
}

function spawnQuad() {
    World.add(engine.world, [Bodies.polygon((canWidth * 0.5), (canHeight * 0.5), 4, 50)]);
}

function spawnPent() {
    World.add(engine.world, [Bodies.polygon((canWidth * 0.5), (canHeight * 0.5), 5, 50)]);
}

function spawnHex() {
    World.add(engine.world, [Bodies.polygon((canWidth * 0.5), (canHeight * 0.5), 6, 50)]);
}

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
  
  
  