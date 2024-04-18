const canvas = document.getElementById("cv");
const ctx = canvas.getContext("2d");
let size = canvas.width;
let move = null;
let pressed = false;
let minspeed = 5;
let speed = 15;
//size
let a = 50;
//x and y coordinates
let randx = 0;
let randy = 0;
let randx2 = 0;
let randy2 = 0;
let randx3 = 0;
let randy3 = 0
let stopped = false;
let mmv = {x: 0, y: 0}; //xy coordinates for mouse
let score = 0;
let movementx = 0;
let movementy = 0;
let movementx2 = 0;
let movementy2 = 0;
let movementx3 = 0;
let movementy3 = 0;



function clicked() {
  console.log(done);
  draw();
}
canvas.addEventListener('click',() => draw(), false);
canvas.addEventListener('mousemove',  drawmouse, false);
canvas.addEventListener('mouseleave', gameover, false)

function draw() {
  if(pressed == false) {
    newstart();
    move = setInterval(() => rect(), 100);
    pressed = true;
    setmovement();
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
  if(pressed == true) {
  document.getElementById('score').innerHTML = score;
  document.getElementById('status').innerHTML = "GAME OVER";
  document.getElementById('endscreenleft').innerHTML = "GAME OVER";
  document.getElementById('scorescreenleft').innerHTML = score;
  document.getElementById('endscreenright').innerHTML = "GAME OVER";
  document.getElementById('scorescreenright').innerHTML = score;
  document.body.style.backgroundColor = "red";
  score = 0;
  clearInterval(move);
  ctx.clearRect(0,0, canvas.width, canvas.height);
  clearInterval();
  pressed = false;
  ctx.fillText("GAME OVER", randx, randy);
  }
}

//create rectangles
function rect() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  let rect1 = ctx.fillRect(randx, randy, a, a);
  let rect2 = ctx.fillRect(randx2, randy2, a, a);
  let rect3 = ctx.fillRect(randx3, randy3, a, a)
  //need to sort out width
    movement();
  }

 function setmovement() {
    if(randx == 0) {
      movementx = Math.round(Math.random()*speed) + minspeed;
    } else {
      movementx = Math.round(Math.random()*speed) - speed- minspeed;
    }
    if(randy == 0) {
      movementy = Math.round(Math.random()*speed) + minspeed;
    } else {
      movementy = Math.round(Math.random()*speed) - speed- minspeed;
    }
    if(randx2 ==0) {
      movementx2 = Math.round(Math.random()*speed) + minspeed;
    } else {
      movementx2 = Math.round(Math.random()*speed) - speed- minspeed;
    }
    if(randy2 == 0) {
      movementy2 = Math.round(Math.random()*speed) + minspeed;
    } else {
      movementy2 = Math.round(Math.random()*speed) - speed- minspeed;
    }
    if(randx3 ==0) {
      movementx3 = Math.round(Math.random()*speed) + minspeed;
    } else {
      movementx3 = Math.round(Math.random()*speed) - speed- minspeed;
    }
    if(randy3 == 0) {
      movementy3 = Math.round(Math.random()*speed) + minspeed;
    } else {
      movementy3 = Math.round(Math.random()*speed) - speed- minspeed;
    }
    console.log("X speed = " + movementx);
    console.log("Y speed = " + movementy);
  }

//check if mouse is over rectangles
function checkOut() {
  if(((mmv.x > randx && mmv.x < randx + a) || (mmv.x < randx && mmv.x > randx + a)) && 
  ((mmv.y > randy && mmv.y < randy + a) || (mmv.y < randy && mmv.y > randy + a))) {
    console.log("inside1 " + mmv.x + " " + mmv.y + " " + randx, randx + a,randy,  randy + a);
  score = 0;
  movementx = 0;
  movementy = 0;
  gameover();
  }
  if(((mmv.x > randx2 && mmv.x < randx2 + a) || (mmv.x < randx2 && mmv.x > randx2 + a)) && 
  ((mmv.y > randy2 && mmv.y < randy2 + a) || (mmv.y < randy2 && mmv.y > randy2 + a))) {
    console.log("inside2 " + mmv.x + " "+ mmv.y + " " +randx2, randx2 + a, randy2, randy2 + a)
  score = 0;
    movementx2 = 0;
    movementy2 = 0;
    gameover();
  }
  if(((mmv.x > randx3 && mmv.x < randx3 + a) || (mmv.x < randx3 && mmv.x > randx3 + a)) && 
  ((mmv.y > randy3 && mmv.y < randy3 + a) || (mmv.y < randy3 && mmv.y > randy3 + a))) {
    console.log("inside3 " + mmv.x + " "+ mmv.y + " " +randx3, randx3 + a, randy3, randy3 + a)
  score = 0;
    movementx3 = 0;
    movementy3 = 0;
    gameover();
  }
}

//move left up
function movement() {
  if ((randx <= canvas.width &&  randx >= 0 && randy <= canvas.width && randy >= 0) || (randx2 <= canvas.width &&  randx2 >= 0 && randy2 <= canvas.height && randy2 >= 0)|| (randx3 <= canvas.width &&  randx3 >= 0 && randy3 <= canvas.height && randy3 >= 0)){     
    randx = randx + movementx;
    randy = randy + movementy;
    randx3 = randx3 + movementx3;
    randy3 = randy3 + movementy3;
    randx2 = randx2 + movementx2;
    randy2 = randy2 + movementy2;
    // a2 = a2 + movementx;

    // b2 = b2 + movementy;
    //necessary to ensure that it is checked everytime it is bigger - if mouse if not moved
    checkOut();
    //speedup()
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
document.getElementById('score').innerHTML = score;
    randy = Math.random() <0.5 ?  0: size;
    randx = Math.random() <0.5 ?  0: size;
    randy2 = Math.random() <0.5 ? 0 : size;
    randx2 = Math.random() <0.5 ? 0 : size;
    randy3 = Math.random() <0.5 ? 0 : size;
    randx3 = Math.random() <0.5 ? 0 : size;
    setmovement();
    document.body.style.backgroundColor = "lightblue";
    document.getElementById('endscreenleft').innerHTML ="";
    document.getElementById('scorescreenleft').innerHTML = "";
    document.getElementById('endscreenright').innerHTML ="";
    document.getElementById('scorescreenright').innerHTML = "";
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
    randy3 = 0
    randx3 =0;

}
function speedup() {
  if(score> 5) {
    a = a  + 3;
    minspeed = minspeed + 1;
    speed = speed + 2;
  }
}