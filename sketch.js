const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var rope1, rope2;
var fruit_con;
var fruit_con1;
var fruit_con2;

var bg_img;
var food;
var rabbit;
var button;
var button1, button2;
var bunny;
var blower;
var muteBtn;

var blink;
var eat;
var sad;

var bkSound, cutSound, sadSound, eatingSound, airSound;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");

  blink.playing = true;
  eat.playing = true;
  eat.looping = false;
  sad.playing = true;
  sad.looping = false;

  bkSound = loadSound("sound1.mp3");
  cutSound = loadSound("rope_cut.mp3");
  sadSound = loadSound("sad.wav");
  eatingSound = loadSound("eating_sound.mp3");
  airSound = loadSound("air.wav");

}

function setup() {
  createCanvas(500,600);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  rope = new Rope(8,{x:40,y:30});
  rope1 = new Rope(7,{x:370,y:40});
  rope2 = new Rope(4,{x:400,y:225});
  ground = new Ground(200,690,600,20);

  var fruit_options={density:0.001}

  fruit = Bodies.circle(300,300,20,fruit_options);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con1 = new Link(rope1,fruit);
  fruit_con2 = new Link(rope2,fruit);

  bunny = createSprite(420,520,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;
  bunny.addAnimation("blinking",blink);
  bunny.addAnimation("eating",eat);
  bunny.changeAnimation("blinking");
  bunny.addAnimation("crying",sad);

  bkSound.play();
  bkSound.setVolume(0.5);

  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(60,60);
  button.mouseClicked(drop);

  button1 = createImg('cut_btn.png');
  button1.position(330,35);
  button1.size(60,60);
  button1.mouseClicked(drop1);
  
  button2 = createImg('cut_btn.png');
  button2.position(360,200);
  button2.size(60,60);
  button2.mouseClicked(drop2);

  blower = createImg("balloon.png");
  blower.position(10,250);
  blower.size(150,100);
  blower.mouseClicked(airBlow);

  muteBtn = createImg("mute.png");
  muteBtn.position(450,20);
  muteBtn.size(50,50);
  muteBtn.mouseClicked(mute);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  Engine.update(engine);
  image(bg_img,width/2,height/2,490,690);
  
  //image(food,fruit.position.x,fruit.position.y,70,70);
   
   push();

   if(fruit != null){

    image(food,fruit.position.x,fruit.position.y,70,70);

   }
   pop();
   
   ground.show();
   rope.show();
   rope1.show();
   rope2.show();

   drawSprites();

     if(collide(fruit,bunny)==true){

     bunny.changeAnimation("eating");
     eatingSound.play();

     }
       if(collide(fruit,ground.body)==true){

       bunny.changeAnimation("crying");

      }

         if(fruit != null && fruit.position.y >= 650){

         bunny.changeAnimation("crying");
         sadSound.play();
         bkSound.stop();
         fruit = null;

        }
}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 

  cutSound.play();
}
function drop1(){

  rope1.break();
  fruit_con1.dettach();
  fruit_con1 = null; 

  cutSound.play();
}

function drop2(){

  rope2.break();
  fruit_con2.dettach();
  fruit_con2 = null; 

  cutSound.play();
}


function collide(body,sprite){

 if(body != null){

 var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
 
   if(d<=80){

   World.remove(engine.world,fruit);
   fruit=null;
   return true
   
   }else{

    return false

   }
 }
}

function airBlow(){

Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
airSound.play();

}

function mute(){

if(bkSound.isPlaying()){

bkSound.stop();

}  else{

   bkSound.play();

}
}

