var MongoClient = require('mongodb').MongoClient;

var JournalQuery = function(){
  this.url = 'mongodb://localhost:27017/journal';
};

JournalQuery.prototype = {
  all: function(onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if(db){
        var collection = db.collection('journalEntries');
        collection.find().toArray(function(err, entryDocs){
          onQueryFinished(entryDocs);
        });
      }
    });
  },

  findByEntryNumber: function(desiredEntryNumber, onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if(db){
        var collection = db.collection('journalEntries');
        collection.find({entryNumber: desiredEntryNumber}).toArray(function(err, entryDocs){
          onQueryFinished(entryDocs);
        });
      }
    });
  },
}

module.exports = JournalQuery;
