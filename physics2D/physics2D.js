// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

render.options.wireframes = false
    

// create ground & walls
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true }),
    wallA = Bodies.rectangle(0, 305, 60, 610, { isStatic: true }),
    wallB = Bodies.rectangle(800, 305, 60, 610, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [ground, wallA, wallB]);
  
function spawnCircle() {
    World.add(engine.world, [Bodies.polygon(400, 200, 0, 50)]);
}

function spawnTri() {
    World.add(engine.world, [Bodies.polygon(400, 200, 3, 50)]);
}

function spawnQuad() {
    World.add(engine.world, [Bodies.polygon(400, 200, 4, 50)]);
}

function spawnPent() {
    World.add(engine.world, [Bodies.polygon(400, 200, 5, 50)]);
}

function spawnHex() {
    World.add(engine.world, [Bodies.polygon(400, 200, 6, 50)]);
}

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
  
  
  