var JournalEntryList = function(){

}

JournalEntryList.prototype = {
  makeRequest: function(url,callback){
    var request = new XMLHttpRequest();
    request.open('GET',url);
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
  }
}

module.exports = JournalEntryList;