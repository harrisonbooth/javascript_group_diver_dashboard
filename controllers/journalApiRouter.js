var express = require('express');
var journalRouter = express.Router();

var JournalQuery = require('../client/db/journalQuery');
var journalQuery = new JournalQuery();
var JournalEntry = require('../client/src/models/journalEntry');


journalRouter.get('/:id', function(req, res){
  var desiredEntryNumber = parseInt(req.params.id);
  journalQuery.findByEntryNumber(desiredEntryNumber, function(returnedEntry){
    res.json(returnedEntry);
  });
});

journalRouter.get('/', function(req, res){
  journalQuery.all(function(returnedEntries){
    res.json(returnedEntries);
  });
});

journalRouter.post('/', function(req, res){
  var content = req.body.content;
  var newEntry = new JournalEntry(content)
  journalQuery.newEntry(newEntry, function(returnedEntries){
    res.json(returnedEntries);
  });
});





module.exports = journalRouter;
