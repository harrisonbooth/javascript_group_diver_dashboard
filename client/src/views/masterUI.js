var JournalEntryList = require("../models/JournalEntryList");
var JournalEntry = require("../models/journalEntry");
var MapWrapper = require("../models/mapWrapper");
var NewsStory = require("../models/newsStory");

var UI = function(){
  this.entryList = new JournalEntryList();
  this.entryList.listOfEntries(function(results){
    this.populateSelect(results);
  }.bind(this));
  this.newsStory = new NewsStory();
  this.newsStory.newsStoryResponse(function(newsArray){
    this.showNewsStory(newsArray);
  }.bind(this));
  this.showMap();
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
    var center = {lat: 51.5, lng: -0.129};
    var zoom = 10;
    var mainMap = new MapWrapper(center, zoom, container);

    var mapControls = document.getElementById('map-controller');
    var returnGeoLocation = document.createElement('button');
    returnGeoLocation.innerText = 'My Location';
    returnGeoLocation.id = 'user-location-button';
    mapControls.appendChild(returnGeoLocation);
    returnGeoLocation.onclick = mainMap.getUserLocation.bind(mainMap);
  },

 showNewsStory: function(newsArray){
    var ultraContainer = document.getElementById('ultra-news-story-container');
    var container = document.getElementById('news-story-container');
    var links = document.getElementsByClassName('itemLinks');
    var counter = 0;
    var activeLink = 0;

    for(var i = 0; i < links.length; i++) {
      var link = links[i];
      link.addEventListener('click', setClickedItem, false);

      link.itemID = i;
    }

    links[activeLink].classList.add("active");
    console.log(links);


    function setClickedItem(event) {
        removeActiveLinks();
     
        var clickedLink = event.target;
        activeLink = clickedLink.itemID;
     
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
      image.width = "220";
      a.setAttribute('href', story.url);
      a.innerText = story.title;

      storyP.appendChild(a);
      div.appendChild(image);
      div.appendChild(storyP)
      container.appendChild(div);
      ultraContainer.appendChild(container);

    });

 }


}

module.exports = UI;
