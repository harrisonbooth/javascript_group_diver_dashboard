/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var JournalEntry = function(content){
  this.content = content;
  this.timestamp = Date().substring(0, 24);
}



module.exports = JournalEntry;


/***/ }),
/* 1 */
/***/ (function(module, exports) {


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
      if (alive === true){
        for(var i = 0; i < mine_array.length; i++){
          if(e.clientX > mine_array[i].x + 7 && e.clientX < (mine_array[i].x + mine_array[i].width+ 9)){
            if(e.clientY > mine_array[i].y + 8 && e.clientY < (mine_array[i].y + mine_array[i].height + 10)){
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var JournalEntryList = __webpack_require__(3);
var MissionUpdate = __webpack_require__(6);
var JournalEntry = __webpack_require__(0);
var NumberWidget = __webpack_require__(4);
var dateTimeWidget = __webpack_require__(10)
var MapWrapper = __webpack_require__(5);
var NewsUI = __webpack_require__(8);

var UI = function(){
  this.entryList = new JournalEntryList();
  this.entryList.listOfEntries(function(results){
    this.populateSelect(results);
  }.bind(this));

  this.missionUpdate = new MissionUpdate();
  this.missionUpdate.listofMissions(function(results){
    this.populateMissionDiv(results);
  }.bind(this));

  this.newsUI = new NewsUI();

  this.showMap();
  localStorage.setItem('sonarCount', 0);
  this.playSonarSound();

  // this.depthGauge = new NumberWidget(100);
  // widgetContainer = document.getElementById('widget-container');
  // this.depthGauge.appendWidget(widgetContainer);

  var header = document.querySelector('#header');
  this.dateTimeWidget = new dateTimeWidget(header);
  this.dateTimeWidget.appendWidget();
};

UI.prototype = {
  populateSelect: function(results){
    var select = document.getElementById('entry-select');
    var oldElements = document.querySelectorAll('#entry-select *');

    oldElements.forEach(function(element){
      select.removeChild(element);
    });

    var defaultOption = document.createElement('option');
    defaultOption.classList.add("entry-option");
    defaultOption.selected = 'true';
    defaultOption.disabled = 'false';
    defaultOption.innerText = "Please select an entry";
    select.appendChild(defaultOption);

    results.forEach(function(entry){
      var option = document.createElement('option');
      option.classList.add("entry-option");
      if (entry.timestamp !== undefined){
        option.innerText = ("[" + entry.entryNumber + "] " + entry.timestamp);
        option.value = entry.entryNumber;
        select.appendChild(option);
      }
    });
  },

  handleDeleteButtonClick: function(){
    var entryList = new JournalEntryList();
    var select = document.getElementById('entry-select');
    var entryToDelete = select.value;

    entryList.deleteEntry(entryToDelete, function(results){
      this.populateSelect(results);
    }.bind(this));

    var oldElements = document.querySelectorAll('#journal-entry-container *');
    var entryContainer = document.getElementById('journal-entry-container');

    oldElements.forEach(function(element){
      entryContainer.removeChild(element);
    });
  },

  selectEntry: function(){
    var select = document.getElementById('entry-select');
    var selectedEntryNumber = select.value;
    var oldElements = document.querySelectorAll('#journal-entry-container *');
    var entryContainer = document.getElementById('journal-entry-container');

    oldElements.forEach(function(element){
      entryContainer.removeChild(element);
    });

    var updateButton = document.createElement('button');
    updateButton.id = 'update-button';
    updateButton.innerText = 'Update entry';

    var deleteButton = document.createElement('button');
    deleteButton.id = 'delete-button';
    deleteButton.innerText = 'Delete Entry';

    var entryContentView = document.createElement('p');
    entryContentView.id = 'entry-content-view';
    var entryTimestampView = document.createElement('h1');
    entryTimestampView.id = 'entry-timestamp-view';
    var entryList = new JournalEntryList();

    entryList.selectEntry(selectedEntryNumber, function(entry) {
      entryTimestampView.innerText = entry.timestamp;
      entryContentView.innerText = entry.content;
      entryContainer.appendChild(entryTimestampView);
      entryContainer.appendChild(entryContentView);
      entryContainer.appendChild(updateButton)
      entryContainer.appendChild(deleteButton);
    });
    updateButton.onclick = this.handleUpdateButtonClick.bind(this);
    deleteButton.onclick = this.handleDeleteButtonClick.bind(this);
  },

  handleSubmitButtonClick: function(){
    var entryList = new JournalEntryList();
    var newContentInput = document.getElementById('new-content-input');
    var newContent = newContentInput.value;
    var newEntry = new JournalEntry(newContent);

    entryList.newEntry(newEntry, function(results){
      this.populateSelect(results);
    }.bind(this));

    var oldElements = document.querySelectorAll('#journal-entry-container *');
    var entryContainer = document.getElementById('journal-entry-container');
    oldElements.forEach(function(element){
      entryContainer.removeChild(element);
    });
  },

  handleUpdateButtonClick: function(){
    var oldContent = document.getElementById('entry-content-view').innerText;

    var oldElements = document.querySelectorAll('#journal-entry-container *');
    var entryContainer = document.getElementById('journal-entry-container');
    oldElements.forEach(function(element){
      entryContainer.removeChild(element);
    });

    var select = document.getElementById('entry-select');
    var entryNumber = select.value;
    var input = document.createElement('textarea');
    input.id = 'new-content-input';
    input.value = oldContent;

    var submitButton = document.createElement('button');
    submitButton.id = 'submit-button';
    submitButton.innerText = 'Update';

    entryContainer.appendChild(input);
    entryContainer.appendChild(submitButton);

    submitButton.onclick = this.handleUpdateSubmitButtonClick.bind(this);
  },

  handleUpdateSubmitButtonClick: function(){
    var entryList = new JournalEntryList();
    var newContentInput = document.getElementById('new-content-input');
    var newContent = newContentInput.value;
    var select = document.getElementById('entry-select');
    var entryNumberToBeUpdated = select.value;
    var newContentObject = {content: newContent}

    entryList.updateEntry(entryNumberToBeUpdated, newContentObject, function(results){
      this.populateSelect(results);
    }.bind(this));

    var oldElements = document.querySelectorAll('#journal-entry-container *');
    var entryContainer = document.getElementById('journal-entry-container');
    oldElements.forEach(function(element){
      entryContainer.removeChild(element);
    });
  },

  newEntryForm: function(){
    var oldElements = document.querySelectorAll('#journal-entry-container *');
    var entryContainer = document.getElementById('journal-entry-container');
    oldElements.forEach(function(element){
      entryContainer.removeChild(element);
    });

    var input = document.createElement('textarea');
    input.id = 'new-content-input';
    var submitButton = document.createElement('button');
    submitButton.id = 'submit-button';
    submitButton.innerText = 'Submit';
    entryContainer.appendChild(input);
    entryContainer.appendChild(submitButton);
    submitButton.onclick = this.handleSubmitButtonClick.bind(this);
  },

  showMap: function(){
    var container = document.getElementById('google-map-container');
    var center = {lat: 27.25, lng: -111.5};
    var zoom = 8;
    var mainMap = new MapWrapper(center, zoom, container);

    var mapControls = document.getElementById('map-controller');
    var returnGeoLocation = document.createElement('button');
    returnGeoLocation.innerText = 'Home';
    returnGeoLocation.id = 'user-location-button';
    mapControls.appendChild(returnGeoLocation);
    returnGeoLocation.onclick = mainMap.getUserLocation.bind(mainMap);

    mainMap.addMarker(center);
  },

  populateMissionDiv: function(results){
    var container = document.getElementById('fam-messages');
    var missionArray = [];

    for(var update of results){
      var updateLi = document.createElement('li');
      var trimmedContent = update.message.substring(0, 70);
      updateLi.id = 'mission-items';
      updateLi.innerText = "From: " + update.from + "\n" + trimmedContent + "...  ";

      if(update.attachment === true){
        var img = document.createElement('img');
        img.id = "paperclip-icon";
        img.src = "http://icons.veryicon.com/ico/System/iOS%207/Very%20Basic%20Paper%20Clip.ico";
        updateLi.appendChild(img);
      }

      missionArray.push(updateLi);

      var currentIndex = 0;

      var advanceUpdate = function(){
        var container = document.getElementById('fam-messages');

        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }

        currentIndex = (currentIndex + 1) % missionArray.length;
        container.appendChild(missionArray[currentIndex]);
        container.style.display = 'block';
      }
    }
    setInterval(advanceUpdate, 8000);
  },

  playSonarSound: function(){
    var audioTag = document.createElement('audio');
    audioTag.src = 'sonar-sound.mp3';
    var sonarButton = document.getElementById('sonar-button');

    sonarButton.onclick = function(){
      var sonarCount = parseInt(localStorage.getItem('sonarCount'));
      if(sonarCount % 2 === 0){
        audioTag.play();
      } else {
        audioTag.pause();
      }
      sonarCount += 1;
      localStorage.setItem('sonarCount', sonarCount);
    }
  }

};

module.exports = UI;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var JournalEntry = __webpack_require__(0);

var JournalEntryList = function(){}

JournalEntryList.prototype = {
  makeRequest: function(url, callback){
    var request = new XMLHttpRequest();
    request.open('GET',url);
    request.onload = callback;
    request.send();
  },

  makePostRequest: function(url, payload, callback){
    var request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = callback;
    request.send(JSON.stringify(payload));
  },

  makePutRequest: function(url, payload, callback){
    var request = new XMLHttpRequest();
    request.open('PUT', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = callback;
    request.send(JSON.stringify(payload));
  },

  makeDeleteRequest: function(url, callback){
    var request = new XMLHttpRequest();
    request.open('DELETE', url);
    request.onload = callback;
    request.send();
  },

  listOfEntries: function(callback){
    this.makeRequest("http://localhost:3000/api/journal", function(){
      if(this.status !== 200) return;
      var jsonString = this.responseText;
      var entryList = JSON.parse(jsonString);

      callback(entryList);
    });
  },

  selectEntry: function(id, callback){
    var url = "http://localhost:3000/api/journal/" + id;
    this.makeRequest(url, function(){
      if(this.status !== 200) return;
      var jsonString = this.responseText;
      var entry = JSON.parse(jsonString)[0];

      callback(entry);
    });
  },

  newEntry: function(newEntry, callback){
    this.makePostRequest("http://localhost:3000/api/journal/", newEntry, function(){
      this.makeRequest("http://localhost:3000/api/journal/", function(){
        if(this.status !== 200) return;
        var jsonString = this.responseText;
        var entries = JSON.parse(jsonString);

        callback(entries);
      })
    }.bind(this));
  },

  updateEntry: function(entryNumberToBeUpdated, updatedContent, callback){
    this.makePutRequest("http://localhost:3000/api/journal/" + entryNumberToBeUpdated, updatedContent, function(){
      this.makeRequest("http://localhost:3000/api/journal/", function(){
        if(this.status !== 200) return;
        var jsonString = this.responseText;
        var entries = JSON.parse(jsonString);
        callback(entries);
      })
    }.bind(this));
  },

  deleteEntry: function(id, callback){
    var url = "http://localhost:3000/api/journal/" + id;
    this.makeDeleteRequest(url, function(){
      this.makeRequest("http://localhost:3000/api/journal/", function(){
        if(this.status !== 200) return;
        var jsonString = this.responseText;
        var entries = JSON.parse(jsonString);

        callback(entries);
      })
    }.bind(this));
  }

}

module.exports = JournalEntryList;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// var NumberWidget = function(limit){
//   this.limit = limit;
// };

// NumberWidget.prototype = {

//   addWidget: function(container){
//     appendWidget(container);
//   },

//   appendWidget: function(container){
//     var container = container;
//     var widget = this.createWidget();

//     container.appendChild(widget);
//   },

//   createWidget: function(){
//     var numberDisplay = document.createElement('p');
//     numberDisplay.id = "number-display";

//     var bar1 = document.createElement('div');
//     var bar2 = document.createElement('div');
//     bar1.classList.add("bar-display");
//     bar2.classList.add("bar-display");

//     var widgetWrapper = document.createElement('div');
//     widgetWrapper.id = "widget-wrapper";

//     var number = this.limit;
//     numberDisplay.innerText = number * 10;
//     bar1.style.height = "50px";
//     bar1.style.transitionDuration = "5s";
//     bar2.style.height = "75px";
//     bar2.style.transitionDuration = "2s";

//     widgetWrapper.appendChild(bar2);
//     widgetWrapper.appendChild(bar1);
//     widgetWrapper.appendChild(numberDisplay);

//     return widgetWrapper;
//   },

//   adjustDisplay: function(){
//     var numberDisplay = document.getElementById('number-display');
//     var bar1 = document.getElementsByClassName('bar-display')[0];
//     var bar2 = document.getElementsByClassName('bar-display')[1];

//     var number = parseInt(numberDisplay.innerText);

//     if((number/10) > (this.limit/2)){
//       number -= (Math.random() * this.limit)/8;
//     } else {
//       number += (Math.random() * this.limit)/8;
//     }

//     numberDisplay.innerText = number.toFixed(0);

//     if((Math.random() * 1) > 0.4){
//       bar1.style.height = String(number/1000 * 200) + "px";
//       bar2.style.height = String(number/1000 * 0) + "px";
//     } else {
//       bar1.style.height = String(number/1000 * 0) + "px";
//       bar2.style.height = String(number/1000 * 200) + "px";
//     }

//   }
// }

// module.exports = NumberWidget;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var MapWrapper = function(coords, zoom, container){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom,
    styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
        });
};

MapWrapper.prototype = {
  getUserLocation: function(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var coords = new google.maps.LatLng(lat, lng);
        this.googleMap.setCenter(coords);
        this.addMarker(coords);
      }.bind(this))
    }
  },

  addMarker: function(coords){
   var marker = new google.maps.Marker({
     position: coords,
     map: this.googleMap,
     icon: "http://i.imgur.com/xsK9snx.png"
   })
 }

}


module.exports = MapWrapper;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var MissionUpdate = function(){};

MissionUpdate.prototype = {
  makeRequest: function(url, callback){
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = callback;
    request.send();
  },

  listofMissions: function(callback){
    this.makeRequest("http://localhost:3000/api/mission", function(){
      if(this.status !== 200) return;
      var jsonString = this.responseText;
      var missionList = JSON.parse(jsonString);

      callback(missionList);
    })
  }

}

module.exports = MissionUpdate;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var NewsStory = function(){}


NewsStory.prototype = {

  makeRequest: function(url, callback){
      var request = new XMLHttpRequest();
      request.open('GET', url);
      request.onload = callback;
      request.send();
    },


    newsStoryResponse: function(callback){
      this.makeRequest("https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=50987132659b4da4bc4dd9bf9b059612", function(){
        if(this.status !== 200) return;
        var jsonString = this.responseText;
        var newsResults = JSON.parse(jsonString);
        newsArray = newsResults.articles;

        callback(newsArray);
      });
    }
  }



module.exports = NewsStory;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var NewsStory = __webpack_require__(7);

var NewsUI = function(){
  this.newsStory = new NewsStory();
  this.newsStory.newsStoryResponse(function(newsArray){
    this.showNewsStory(newsArray);
  }.bind(this));

  localStorage.setItem("currentNewsLink", 0);
}

NewsUI.prototype = {
  showNewsStory: function(newsArray){
    var ultraContainer = document.getElementById('ultra-news-story-container');
    var container = document.getElementById('news-story-container');
    this.container = container;
    var links = document.getElementsByClassName('itemLinks');
    this.links = links;
    var counter = 0;
    var activeLink = 0;

    for(var i = 0; i < links.length; i++) {
      var link = links[i];
      link.addEventListener('click', setClickedItem, false);

      link.itemID = i;
    }

    links[activeLink].classList.add("active");

    function setClickedItem(event) {
      removeActiveLinks();

      var clickedLink = event.target;
      activeLink = clickedLink.itemID;

      localStorage.setItem("currentNewsLink", activeLink);
      changePosition(clickedLink);
    }

    function removeActiveLinks() {
      for (var i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
      }
    }

    function changePosition(link) {
      var position = link.getAttribute("data-pos");

      var translateValue = "translate3d(" + position + ", 0px, 0)";
      container.style.transform = translateValue;

      link.classList.add("active");
    }

    newsArray.forEach(function(story){
      var div = document.createElement('div');
      div.setAttribute('className', "content");
      var idNumber = counter;
      counter++;
      div.setAttribute('id', 'item' + counter);

      var image = document.createElement('img');
      var storyP = document.createElement('p');
      var a = document.createElement('a');
      image.src = story.urlToImage;
      image.height = "200";
      image.width = "260";
      a.setAttribute('href', story.url);
      a.innerText = story.title;

      storyP.appendChild(a);
      div.appendChild(image);
      div.appendChild(storyP)
      container.appendChild(div);
      ultraContainer.appendChild(container);

    });
  },

  scrollNews: function(){
    var currentLinkIndex = parseInt(localStorage.getItem("currentNewsLink"));

    if(currentLinkIndex >= 9){
      currentLinkIndex = 0;
    } else {
      currentLinkIndex += 1;
    }

    var link = this.links[currentLinkIndex];
    var container = this.container;
    var position = link.getAttribute("data-pos");

    var translateValue = "translate3d(" + position + ", 0px, 0)";
    container.style.transform = translateValue;

    for (var i = 0; i < this.links.length; i++) {
      this.links[i].classList.remove("active");
    }

    link.classList.add("active");

    localStorage.setItem("currentNewsLink", currentLinkIndex);

  }
}

module.exports = NewsUI;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var UI = __webpack_require__(2);
var Game = __webpack_require__(1);


var app = function(){

  var ui = new UI();
  var select = document.getElementById('entry-select');
  select.onchange = ui.selectEntry.bind(ui);

  var button = document.getElementById('add-new-entry');
  button.onclick = ui.newEntryForm.bind(ui);

    // ui.depthGauge.adjustDisplay();
    // setInterval(ui.depthGauge.adjustDisplay.bind(ui.depthGauge), 100);

  setInterval(ui.newsUI.scrollNews.bind(ui.newsUI), 5000);

  setInterval(ui.dateTimeWidget.updateWidget.bind(ui.dateTimeWidget), 1000);
  var game = new Game();

};


window.onload = app;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

var dateTimeWidget = function(container){
    this.container = container;
};

dateTimeWidget.prototype = {
  appendWidget: function(){
    var widget = this.createWidget();
    this.container.appendChild(widget);
  },

  createWidget: function(){
    var widgetDiv = document.createElement('div');
    widgetDiv.id = "widget-wrapper";

    var timeDiv = document.createElement('div');
    timeDiv.id = "time-wrapper";
    var dateDiv = document.createElement('div');
    dateDiv.id = "date-wrapper";

    var timeP = document.createElement('p');
    timeP.id = "time-display";

    var dateP = document.createElement('p');
    dateP.id = "date-display";

    var dateTime = Date();
    var date = dateTime.substring(0, 15);
    var time = dateTime.substring(16, 21);

    dateP.innerText = date;
    timeP.innerText = time;

    dateDiv.appendChild(dateP);
    timeDiv.appendChild(timeP);

    widgetDiv.appendChild(dateDiv);
    widgetDiv.appendChild(timeDiv);

    return widgetDiv;
  },

  updateWidget: function(){
    var dateP = document.getElementById('date-display');
    var timeP = document.getElementById('time-display');

    var dateTime = Date();
    var date = dateTime.substring(0, 15);
    var time = dateTime.substring(16, 21);

    dateP.innerText = date;
    timeP.innerText = time;
  }

}

module.exports = dateTimeWidget;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map