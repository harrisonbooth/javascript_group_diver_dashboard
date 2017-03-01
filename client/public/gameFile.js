
var titleWidth = 30; // width of tiles
var titleHeight = 30; // height of tiles

var titleGap = 5; // gap between the tiles

var mineArray = []; // the grid

var mineTotal = 20;
var minesCounter;
var randomNum;

var mineCheckCounter;
var mineDecider;

var gridWidth = 8;
var gridHeight = 8;

var img;
var choice = false;

var alive = true;

var particles = [];
var particleCount = 100;

var endDisplayOnce = false;

var tileMap = [[1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1]] // test tileMap

function startGame() {

  var myGamePiece; // what is the mine square called when made

  //START initialize for loop (this actually makes the gird)
  for(var j = 0; j < gridHeight; j++){
    for(var i = 0; i < gridWidth; i++){
     myGamePiece = new component(titleWidth, titleHeight, ((titleWidth + titleGap) * i), ((titleHeight + titleGap) * j),i,j);
     mineArray.push(myGamePiece);
   }
 }
 //END of initialize
// minesCounter = Math.floor((Math.random() * 20) + 1);

minesCounter = mineTotal;

while (minesCounter !== 0){
  randomNum = Math.floor((Math.random() * (gridWidth * gridHeight)));
  if (mineArray[randomNum].hasMine === true){

  } else{
    mineArray[randomNum].hasMine = true;
    minesCounter -= 1;
  }
}

 myGameArea.start(); // this makes canvas and posiitons everything
}

var myGameArea = {
  canvas : document.createElement("canvas"), // the canvas
  start : function() {
    this.canvas.width = (titleWidth * gridWidth + (titleGap * (gridWidth - 1))); // canvas width
    this.canvas.height = (titleHeight * gridHeight + (titleGap * (gridHeight - 1))); // canvas height
    this.context = this.canvas.getContext("2d"); //? sets canvas to 2D mode
    this.canvas.id = "canvas";
    document.getElementById("game-container").appendChild(this.canvas);
    // document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener('click', function (e) { // when click, do something
      console.log(e);
      if (alive === true){
        for(var i = 0; i < mineArray.length; i++){
          if(e.clientX -1000 > mineArray[i].x + 7 && e.clientX -1000 < (mineArray[i].x + mineArray[i].width+ 9)){
            if(e.clientY -370 > mineArray[i].y + 8 && e.clientY -370 < (mineArray[i].y + mineArray[i].height + 10)){
              if (mineArray[i].hasMine === true){
                mineArray[i].img.src = "./images/rsz_mine_original.png";
                alive = false;
              } else {
                mineDecider = checkAround(i);
                mineArray[i].clicked = true;
                mineArray[i].close_mines = mineDecider;
                mineArray[i].changeSource = true;
                mineArray[i].update();
              }
            }
          }
        }
      } else {
        //show clickable buttons
      }
    })
    document.onkeydown = function (e) { // when click, do something
      var currentKey = e.keyCode;
      console.log(currentKey);
      if(currentKey === 192){
        for(var i = 0;i < mineArray.length; i++){
          mineArray[i].clicked = false;
          mineArray[i].close_mines = null;
          mineArray[i].changeSource = false;
          mineArray[i].img.src = "./images/default.png";
          mineArray[i].hasMine = false;
          alive = true;
          minesCounter = mineTotal;


        }
        while (minesCounter !== 0){
          randomNum = Math.floor((Math.random() * (gridWidth * gridHeight)));
          if (mineArray[randomNum].hasMine === true){

          } else{
            mineArray[randomNum].hasMine = true;
            minesCounter -= 1;
          }
        }
      }
    }
  },
  stop : function() {
    clearInterval(this.interval);
  },
  clear : function() {

    var ctx = this.canvas.getContext('2d');
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.globalCompositeOperation = 'lighter';
    for(var i=0; i<particles.length; i++) {
      var p = particles[i];
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255,255,255,' + p.opacity + ')';
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI*2, false);
      ctx.fill();
      p.y -= p.speed;
      if(p.y <= -10)
        particles[i] = new particle();
    }
  }
}

function component(width, height, x, y,x_in_grid,y_in_grid) {
  this.width = width; // tile width
  this.height = height; // tile height
  this.x = x; // tile x
  this.y = y; // tile y
  this.x_in_grid = x_in_grid;
  this.y_in_grid = y_in_grid;
  this.clicked = false;
  this.close_mines = 0;
  this.img = new Image(this.x,this.y,30,30);
  this.img.src = "./images/default.png";
  this.changeSource = false;
  this.hasMine = false; // does tile have a mine
  this.update = function(new_col) {
    if (this.clicked === false){
      ctx = myGameArea.context;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.drawImage(this.img,0,0);
      ctx.restore();
    }
    if (this.clicked === true){
      if(this.changeSource === true){
        switch(this.close_mines){

          case 0:
          this.img.src = "./images/0.png";
          this.changeSource = false;
          break;
          case 1:
          this.img.src = "./images/1.png";
          this.changeSource = false;
          break;
          case 2:
          this.img.src = "./images/2.png";
          this.changeSource = false;
          break;
          case 3:
          this.img.src = "./images/3.png";
          this.changeSource = false;
          break;
          case 4:
          this.img.src = "./images/4.png";
          this.changeSource = false;
          break;
          case 5:
          this.img.src = "./images/5.png";
          this.changeSource = false;
          break;
          case 6:
          this.img.src = "./images/6.png";
          this.changeSource = false;
          break;
          case 7:
          this.img.src = "./images/7.png";
          this.changeSource = false;
          break;
          case 8:
          this.img.src = "./images/8.png";
          this.changeSource = false;
          break;
        }
      }
      ctx = myGameArea.context;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.drawImage(this.img,0,0);
      ctx.restore();
    }
  }
}

function checkAround(num){
  mineCheckCounter = 0;
  if (mineArray[num].x_in_grid !== 0){
    if (mineArray[num].y_in_grid !== 0){
    //look UL
    if (mineArray[num-9].hasMine === true){
      mineCheckCounter += 1;
    }
  }
    //look L
    if (mineArray[num-1].hasMine === true){
      mineCheckCounter += 1;
    }
    if (mineArray[num].y_in_grid !== gridHeight - 1){
    //look DL
    if (mineArray[num+7].hasMine === true){
      mineCheckCounter += 1;
    }
  }
}
if (mineArray[num].y_in_grid !== 0){
    //look U
    if (mineArray[num-8].hasMine === true){
      mineCheckCounter += 1;
    }
    if (mineArray[num].x_in_grid !== gridWidth - 1){
    //look UR
    if (mineArray[num-7].hasMine === true){
      mineCheckCounter += 1;
    }
  }
}
if (mineArray[num].x_in_grid !== gridWidth - 1){
    //look R
    if (mineArray[num+1].hasMine === true){
      mineCheckCounter += 1;
    }
    if (mineArray[num].y_in_grid !== gridHeight - 1){
    //look DR
    if (mineArray[num+9].hasMine === true){
      mineCheckCounter += 1;
    }
  }
}
if (mineArray[num].y_in_grid !== gridHeight - 1){
    //look D
    if (mineArray[num+8].hasMine === true){
      mineCheckCounter += 1;
    }
  }
  return mineCheckCounter;
}

var canvas = document.getElementById('canvas');

for(var i=0; i<particleCount;i++)
  particles.push(new particle());

function particle() {

  this.x = Math.random() * (titleWidth * gridWidth + (titleGap * (gridWidth - 1)));
  this.y = (titleHeight * gridHeight + (titleGap * (gridHeight - 1))) + Math.random() * 300;
  this.speed = 2 + Math.random() * 5;
  this.radius = Math.random() * 30;
  this.opacity = (Math.random() * 100) / 1000;
}

function loop() {
  requestAnimationFrame(loop);
  draw();
}

function updateGameArea() {

  //VVVV Clears the canvas
  myGameArea.clear();
  //VVVV Updates the grid and re-draws on canvas
  for(var i = 0; i < mineArray.length; i++){
    mineArray[i].update();
  }
  if (alive === true){}
  else {
    if (endDisplayOnce === false){
      console.log("you hit a mine, return to the sub");
      endDisplayOnce = true;
    }
  }
}

module.exports = startGame;
