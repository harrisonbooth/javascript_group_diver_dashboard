var JournalEntry = require('./journalEntry');

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
