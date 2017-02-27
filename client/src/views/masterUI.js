var JournalEntryList = require("../models/JournalEntryList");
var MissionUpdate = require("../models/missionUpdate");
var JournalEntry = require("../models/journalEntry");
var NumberWidget = require("../models/NumberWidget");
var MapWrapper = require("../models/mapWrapper");
var NewsUI = require("./newsUI");

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
    defaultOption.selected = 'true';
    defaultOption.disabled = 'false';
    defaultOption.innerText = "Please select an entry";
    select.appendChild(defaultOption);

    results.forEach(function(entry){
      var option = document.createElement('option');
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

    var deleteButton = document.createElement('button');
    deleteButton.id = 'delete-button';
    deleteButton.innerText = 'Delete Entry';
    var entryContentView = document.createElement('p');
    var entryTimestampView = document.createElement('h1');
    var entryList = new JournalEntryList();

    entryList.selectEntry(selectedEntryNumber, function(entry) {
      entryTimestampView.innerText = entry.timestamp;
      entryContentView.innerText = entry.content;
      entryContainer.appendChild(entryTimestampView);
      entryContainer.appendChild(entryContentView);
      entryContainer.appendChild(deleteButton);
    });
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
    var center = {lat: 55.9468761, lng: -3.2018152000000004};
    var zoom = 10;
    var mainMap = new MapWrapper(center, zoom, container);

    var mapControls = document.getElementById('map-controller');
    var returnGeoLocation = document.createElement('button');
    returnGeoLocation.innerText = 'My Location';
    returnGeoLocation.id = 'user-location-button';
    mapControls.appendChild(returnGeoLocation);
    returnGeoLocation.onclick = mainMap.getUserLocation.bind(mainMap);
  },

  populateMissionDiv: function(results){
    var container = document.getElementById('mission-updates-container');

    results.forEach(function(update){
      var p = document.createElement('p');
      var trimmedContent = update.message.substring(0, 70);
      p.innerText = "From: " + update.from + "\n" + trimmedContent + "...  ";
      if(update.attachment === true){
        var img = document.createElement('img');
        img.id = "paperclip-icon";
        img.src = "http://icons.veryicon.com/ico/System/iOS%207/Very%20Basic%20Paper%20Clip.ico";
        p.appendChild(img);
      }
      container.appendChild(p);
    })
  },

  playSonarSound: function(){
    if(localStorage.getItem('sonarCount') === null){
      localStorage.setItem('sonarCount', 0);
    }
    var audioTag = document.createElement('audio');
    audioTag.src = 'sonar-sound.mp3';
    var sonarButton = document.getElementById('sonar-button');

    sonarButton.onclick = function(){
      var sonarCount = localStorage.getItem('sonarCount');
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
