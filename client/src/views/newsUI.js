var NewsStory = require("../models/newsStory");

var NewsUI = function(){
  this.newsStory = new NewsStory();
  this.newsStory.newsStoryResponse(function(newsArray){
    this.showNewsStory(newsArray);
  }.bind(this));
}

NewsUI.prototype = {
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

module.exports = NewsUI;
