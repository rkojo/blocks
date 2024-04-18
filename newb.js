const canvas = document.getElementById("cv");
const ctx = canvas.getContext("2d");
let size = canvas.width;
let move = null;
let pressed = false;
//size
let a = 0;
let b = 0;
let a2 = 0;
let b2 = 0;
//switch between the two options of rectangle going up or down
let rand = Math.random();
let rand2 = Math.random();
//x and y coordinates
let randx  = 0;
let randy = 0;
let randx2  = 0;
let randy2 = 0;
//to track coordinates of the two other corners
let width1 = 0;
let height1 = 0;
let width2 = 0;
let height2 = 0;
let stopped = false;
let mmv = {x: 0, y: 0}; //xy coordinates for mouse
let score = -1; //score goes to 0 when newstart occurs
let movement = 3;
console.log(randx);
  console.log(randy);

function clicked() {
  console.log(done);
  draw();
}
canvas.addEventListener('click',() => draw(), false);
canvas.addEventListener('mousemove',  drawmouse, false);
canvas.addEventListener('mouseleave', gameover, false)

function draw(e) {
  if(pressed == false) {
    newstart();
    move = setInterval(() => rect(), 100);
    pressed = true;
    movement = 3;
    document.getElementById('status').innerHTML = "";
  }
};
//gets mouse position
function drawmouse(e) {
  mmv = getMousePos(e)
  ctx.fillRect(mmv.x, mmv.y, 0,0);
  checkOut();
}
function gameover() {
  //alert("Game Over")    
  document.getElementById('score').innerHTML = score;
  document.getElementById('status').innerHTML = "GAME OVER";
  score = 0;
  clearInterval(move);
  ctx.clearRect(0,0, canvas.width, canvas.height);
  clearInterval();
  pressed = false;
  ctx.fillText("GAME OVER", randx, randy);
}

//create rectangles
function rect() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  let rect1 = ctx.fillRect(randx, randy, a, b);
  let rect2 = ctx.fillRect(randx2, randy2, a2, b2)
  //need to sort out width
  if(rand > 0.5 ) {
    movementneg();
  } else {
    movementpos();
  }
  if(rand2 > 0.5) {
    movementneg2();
  } else {
    movementpos2();
  }
  }
//check if mouse is over rectangles
function checkOut() {
  if(((mmv.x > randx && mmv.x < width1) || (mmv.x < randx && mmv.x > width1)) && 
  ((mmv.y > randy && mmv.y < height1) || (mmv.y < randy && mmv.y > height1))) {
    console.log("inside1 " + mmv.x + " " + mmv.y + " " + randx, width1,randy,  height1);
  score = 0;
  movement = 0;
  gameover();
  }
  if(((mmv.x > randx2 && mmv.x < width2) || (mmv.x < randx2 && mmv.x > width2)) && 
  ((mmv.y > randy2 && mmv.y < height2) || (mmv.y < randy2 && mmv.y > height2))) {
    console.log("inside2 " + mmv.x + " "+ mmv.y + " " +randx2, width2, randy2, height2)
  score = 0;
    movement = 0;
    gameover();
  }
}

//move left up
function movementpos() {
  if ((width1 < canvas.width &&  width1 > 0 && height1 < canvas.width && height1 > 0) || (width2 < canvas.width &&  width2 > 0 && height2 < canvas.height && height2 > 0)){     
    a = a + movement;
    b = b + movement;
    width1 = randx + Math.abs(a);
    height1 = randy + Math.abs(b);
    //necessary to ensure that it is checked everytime it is bigger - if mouse if not moved
    checkOut();
    speedup()
  } else {
    score++;
    newstart();
  }
}

//move right down
function movementneg() {
  if ((width1 < canvas.width &&  width1 > 0 && height1 < canvas.width && height1 > 0) || (width2 < canvas.width &&  width2 > 0 && height2 < canvas.height && height2 > 0)){
    a = a - movement;
    b = b - movement;
    width1 = randx - Math.abs(a);
    height1 =randy - Math.abs(b);
    //necessary to ensure that it is checked everytime it is bigger - if mouse if not moved
    checkOut();
    speedup() 
  } else {
    score++;
    newstart();
  }
}

function movementpos2() {
  if ((width1 < canvas.width &&  width1 > 0 && height1 < canvas.width && height1 > 0) || (width2 < canvas.width &&  width2 > 0 && height2 < canvas.height && height2 > 0)){     
    a2 = a2 + movement;
    b2 = b2 + movement;
    width2 = randx2 +  Math.abs(a2);
    height2 = randy2 + Math.abs(b2);
    //necessary to ensure that it is checked everytime it is bigger - if mouse if not moved
    checkOut();
    speedup()
  } else {
    score++;
    newstart();
  }
}

function movementneg2() {
  if ((width1 < canvas.width &&  width1 > 0 && height1 < canvas.width && height1 > 0) || (width2 < canvas.width &&  width2 > 0 && height2 < canvas.height && height2 > 0)){
    a2 = a2 - movement;
    b2 = b2 - movement;
    width2 = randx2 -  Math.abs(a2);
    height2 = randy2 - Math.abs(b2);
    
    //necessary to ensure that it is checked everytime it is bigger - if mouse if not moved
    checkOut();
    speedup() 
  } else {
    score++;
    newstart();
  }
}
//copied from https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
function getMousePos(evt) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
  scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
  scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y

return {
  x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
  y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
}
}
//add values
function newstart() {
console.log(score);
document.getElementById('score').innerHTML = score;
a = 0;
    b = 0;
    a2 = 0;
    b2 = 0;
    randy = Math.floor(Math.random()* size);
    randx = Math.floor(Math.random()* size);
    randy2 = Math.floor(Math.random()* size);
    randx2 = Math.floor(Math.random()* size);
    width1 = randx;
    height1 = randy;
    width2 = randx2;
    height2 = randy2;
    rand = Math.random();
    rand2 = Math.random();

}
//restart
function stopmovement() {
  stopped = true;
  ctx.clearRect(0,0, canvas.width, canvas.height);
    a = 0;
    b = 0;
    randy = 0
    randx = 0
    randy2 = 0
    randx2 =0;
    width1 = randx;
    height1 = randy;
    width2 = randx2;
    height2 = randy2;
    rand = 0;
}
function speedup() {
  if(score> 5) {
    movement = movement + 0.1;
  }
}