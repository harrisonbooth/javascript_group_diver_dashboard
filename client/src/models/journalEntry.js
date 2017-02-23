var JournalEntry = function(content){

  this.content = content;
  this.timestamp = Date().substring(0, 24);
}

module.exports = JournalEntry;