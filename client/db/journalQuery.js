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

  newEntry: function(entryToAdd, onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if(db){
        var collection = db.collection('journalEntries');
        collection.find({entryNumber: "entry number counter"}).toArray(function(err, y){
          var newEntryNumber = y[0].currentEntryNumber + 1;
          // console.log(newEntryNumber);
          collection.update(y[0], {entryNumber: "entry number counter", currentEntryNumber: newEntryNumber});
          console.log(y[0]);
          entryToAdd.entryNumber = newEntryNumber;
          collection.insert(entryToAdd);
          collection.find().toArray(function(err, entryDocs){
            onQueryFinished(entryDocs);
            // console.log(currentEntryNumberObject);
          });
        }.bind(this));
      }
    });
  }
}



module.exports = JournalQuery;
