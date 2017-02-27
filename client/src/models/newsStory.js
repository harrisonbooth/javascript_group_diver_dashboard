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
