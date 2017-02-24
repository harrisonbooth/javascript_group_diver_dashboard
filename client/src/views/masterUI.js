var JournalEntryList = require("../models/JournalEntryList");

var UI = function(){
  this.entryList = new JournalEntryList();
  this.entryList.listOfEntries(function(results){
    this.populateSelect(results);
  }.bind(this));
};

UI.prototype = {
  populateSelect: function(results){
    var select = document.getElementById('entry-select');
    results.forEach(function(entry){
      var option = document.createElement('option');
      if (entry.timestamp !== undefined){
        option.innerText = ("[" + entry.entryNumber + "] " + entry.timestamp);
        option.value = entry.entryNumber;
        select.appendChild(option);
      }
    });
  },
  selectEntry: function(){
    var selectedEntryNumber = this.value;
    
  }
}

module.exports = UI;
