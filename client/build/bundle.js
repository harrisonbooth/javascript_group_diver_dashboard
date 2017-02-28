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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
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
/***/ (function(module, exports, __webpack_require__) {

var JournalEntryList = __webpack_require__(2);
var MissionUpdate = __webpack_require__(5);
var JournalEntry = __webpack_require__(0);
var NumberWidget = __webpack_require__(3);
var MapWrapper = __webpack_require__(4);
var NewsUI = __webpack_require__(7);

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

  this.depthGauge = new NumberWidget(100);
  widgetContainer = document.getElementById('widget-container');
  this.depthGauge.appendWidget(widgetContainer);

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
    var input = document.createElement('input');
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

    var input = document.createElement('input');
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
    var container = document.getElementById('mission-updates-container');
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
        var container = document.getElementById('mission-updates-container');

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
/* 2 */
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
/* 3 */
/***/ (function(module, exports) {

var NumberWidget = function(limit){
  this.limit = limit;
};

NumberWidget.prototype = {

  addWidget: function(container){
    appendWidget(container);
  },

  appendWidget: function(container){
    var container = container;
    var widget = this.createWidget();

    container.appendChild(widget);
  },

  createWidget: function(){
    var numberDisplay = document.createElement('p');
    numberDisplay.id = "number-display";

    var bar1 = document.createElement('div');
    var bar2 = document.createElement('div');
    bar1.classList.add("bar-display");
    bar2.classList.add("bar-display");

    var widgetWrapper = document.createElement('div');
    widgetWrapper.id = "widget-wrapper";

    var number = this.limit;
    numberDisplay.innerText = number * 10;
    bar1.style.height = "50px";
    bar1.style.transitionDuration = "5s";
    bar2.style.height = "75px";
    bar2.style.transitionDuration = "2s";

    widgetWrapper.appendChild(bar2);
    widgetWrapper.appendChild(bar1);
    widgetWrapper.appendChild(numberDisplay);

    return widgetWrapper;
  },

  adjustDisplay: function(){
    var numberDisplay = document.getElementById('number-display');
    var bar1 = document.getElementsByClassName('bar-display')[0];
    var bar2 = document.getElementsByClassName('bar-display')[1];

    var number = parseInt(numberDisplay.innerText);

    if((number/10) > (this.limit/2)){
      number -= (Math.random() * this.limit)/8;
    } else {
      number += (Math.random() * this.limit)/8;
    }

    numberDisplay.innerText = number.toFixed(0);

    if((Math.random() * 1) > 0.4){
      bar1.style.height = String(number/1000 * 200) + "px";
      bar2.style.height = String(number/1000 * 0) + "px";
    } else {
      bar1.style.height = String(number/1000 * 0) + "px";
      bar2.style.height = String(number/1000 * 200) + "px";
    }

  }
}

module.exports = NumberWidget;


/***/ }),
/* 4 */
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
/* 5 */
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
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var NewsStory = __webpack_require__(6);

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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var UI = __webpack_require__(1);

var app = function(){
  var ui = new UI();
  var select = document.getElementById('entry-select');
  select.onchange = ui.selectEntry.bind(ui);

  var button = document.getElementById('add-new-entry');
  button.onclick = ui.newEntryForm.bind(ui);

  ui.depthGauge.adjustDisplay();
  setInterval(ui.depthGauge.adjustDisplay.bind(ui.depthGauge), 100);

  setInterval(ui.newsUI.scrollNews.bind(ui.newsUI), 5000);

};

window.onload = app;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map