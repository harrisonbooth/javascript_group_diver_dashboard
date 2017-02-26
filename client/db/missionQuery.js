var MongoClient = require('mongodb').MongoClient;

var MissionQuery = function(){
  this.url = 'mongodb://localhost:27017/mission';
};

MissionQuery.prototype = {
  all: function(onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if(db){
        var collection = db.collection('missionUpdates');
        collection.find().toArray(function(err, updateDocs){
          onQueryFinished(updateDocs);
        });
      }
    });
  };

};
