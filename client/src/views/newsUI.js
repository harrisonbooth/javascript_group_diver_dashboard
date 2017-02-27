var NewsStory = require("../models/newsStory");

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
