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
  }
}

module.exports = JournalEntryList;