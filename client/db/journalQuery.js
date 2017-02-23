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
        collection.find({entryNumber: "entry number counter"}).toArray(function(err, entryNumberCounterArray){
          var newEntryNumber = entryNumberCounterArray[0].currentEntryNumber + 1;
          collection.update(entryNumberCounterArray[0], {entryNumber: "entry number counter", currentEntryNumber: newEntryNumber});
          entryToAdd.entryNumber = newEntryNumber;
          collection.insert(entryToAdd);
          collection.find().toArray(function(err, entryDocs){
            onQueryFinished(entryDocs);
          });
        }.bind(this));
      }
    });
  }, 

  updateEntry: function(desiredEntryNumber, updateContent, onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if(db){
        var collection = db.collection('journalEntries');
        var newTimestamp = Date().substring(0, 24);
        collection.update({entryNumber: desiredEntryNumber}, {entryNumber: desiredEntryNumber, content: updateContent, timestamp: newTimestamp});
        collection.find().toArray(function(err, entryDocs){
          onQueryFinished(entryDocs);
        });
      }
    })
  }
}



module.exports = JournalQuery;
