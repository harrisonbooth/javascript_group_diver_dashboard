
var tile_width = 30; // width of tiles
var tile_height = 30; // height of tiles

var tile_gap = 5; // gap between the tiles

var mine_array = []; // the grid

var mine_total = 20;
var mines_counter;
var randomNum;

var mine_check_counter;
var mine_decider;

var grid_width = 8;
var grid_height = 8;

var img;
var choice = false;

var alive = true;

var particles = [];
var particleCount = 100;

var end_display_once = false;

var tile_map = [[1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1]] // test tile_map

function startGame() {

  var myGamePiece; // what is the mine square called when made

  //START initialize for loop (this actually makes the gird)
  for(var j = 0; j < grid_height; j++){
    for(var i = 0; i < grid_width; i++){
     myGamePiece = new component(tile_width, tile_height, ((tile_width + tile_gap) * i), ((tile_height + tile_gap) * j),i,j);
     mine_array.push(myGamePiece);
   }
 }
 //END of initialize
// mines_counter = Math.floor((Math.random() * 20) + 1);

mines_counter = mine_total;

while (mines_counter !== 0){
  randomNum = Math.floor((Math.random() * (grid_width * grid_height)));
  if (mine_array[randomNum].hasMine === true){

  } else{
    mine_array[randomNum].hasMine = true;
    mines_counter -= 1;
  }
}

 myGameArea.start(); // this makes canvas and posiitons everything
}

var myGameArea = {
  canvas : document.createElement("canvas"), // the canvas
  start : function() {
    this.canvas.width = (tile_width * grid_width + (tile_gap * (grid_width - 1))); // canvas width
    this.canvas.height = (tile_height * grid_height + (tile_gap * (grid_height - 1))); // canvas height
    this.context = this.canvas.getContext("2d"); //? sets canvas to 2D mode
    this.canvas.id = "canvas";
    document.getElementById("game-container").appendChild(this.canvas);
    // document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener('click', function (e) { // when click, do something
      console.log(e);
      if (alive === true){
        for(var i = 0; i < mine_array.length; i++){
          if(e.clientX -1000 > mine_array[i].x + 7 && e.clientX -1000 < (mine_array[i].x + mine_array[i].width+ 9)){
            if(e.clientY -370 > mine_array[i].y + 8 && e.clientY -370 < (mine_array[i].y + mine_array[i].height + 10)){
              if (mine_array[i].hasMine === true){
                mine_array[i].img.src = "./images/rsz_mine_original.png";
                alive = false;
              } else {
                mine_decider = checkAround(i);
                mine_array[i].clicked = true;
                mine_array[i].close_mines = mine_decider;
                mine_array[i].changeSource = true;
                mine_array[i].update();
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
        for(var i = 0;i < mine_array.length; i++){
          mine_array[i].clicked = false;
          mine_array[i].close_mines = null;
          mine_array[i].changeSource = false;
          mine_array[i].img.src = "./images/default.png";
          mine_array[i].hasMine = false;
          alive = true;
          mines_counter = mine_total;

          
        }
        while (mines_counter !== 0){
          randomNum = Math.floor((Math.random() * (grid_width * grid_height)));
          if (mine_array[randomNum].hasMine === true){

          } else{
            mine_array[randomNum].hasMine = true;
            mines_counter -= 1;
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
  mine_check_counter = 0;
  if (mine_array[num].x_in_grid !== 0){
    if (mine_array[num].y_in_grid !== 0){
    //look UL
    if (mine_array[num-9].hasMine === true){
      mine_check_counter += 1;
    }
  }
    //look L
    if (mine_array[num-1].hasMine === true){
      mine_check_counter += 1;
    }
    if (mine_array[num].y_in_grid !== grid_height - 1){
    //look DL
    if (mine_array[num+7].hasMine === true){
      mine_check_counter += 1;
    }
  }
}
if (mine_array[num].y_in_grid !== 0){
    //look U
    if (mine_array[num-8].hasMine === true){
      mine_check_counter += 1;
    }
    if (mine_array[num].x_in_grid !== grid_width - 1){
    //look UR
    if (mine_array[num-7].hasMine === true){
      mine_check_counter += 1;
    }
  }
}
if (mine_array[num].x_in_grid !== grid_width - 1){
    //look R
    if (mine_array[num+1].hasMine === true){
      mine_check_counter += 1;
    }
    if (mine_array[num].y_in_grid !== grid_height - 1){
    //look DR
    if (mine_array[num+9].hasMine === true){
      mine_check_counter += 1;
    }
  }
}
if (mine_array[num].y_in_grid !== grid_height - 1){
    //look D
    if (mine_array[num+8].hasMine === true){
      mine_check_counter += 1;
    }
  }
  return mine_check_counter;
}

var canvas = document.getElementById('canvas');

for(var i=0; i<particleCount;i++)
  particles.push(new particle());

function particle() {

  this.x = Math.random() * (tile_width * grid_width + (tile_gap * (grid_width - 1)));
  this.y = (tile_height * grid_height + (tile_gap * (grid_height - 1))) + Math.random() * 300;
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
  for(var i = 0; i < mine_array.length; i++){
    mine_array[i].update();
  }
  if (alive === true){}
  else {
    if (end_display_once === false){
      console.log("you hit a mine, return to the sub");
      end_display_once = true;
    }
  }
}

module.exports = startGame;