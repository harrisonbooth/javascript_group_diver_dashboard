var express = require('express');
var journalRouter = express.Router();

var JournalQuery = require('../client/db/journalQuery');
var journalQuery = new JournalQuery();

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



module.exports = journalRouter;
