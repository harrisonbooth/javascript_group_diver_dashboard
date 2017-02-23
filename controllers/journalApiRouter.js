var express = require('express');
var journalRouter = express.Router();

var JournalQuery = require('../client/db/journalQuery');
var journalQuery = new JournalQuery();

journalRouter.get('/', function(req, res){
  journalQuery.all(function(returnedEntries){
    res.json(returnedEntries);
  });
});


// journalRouter.get('/:id', function(req, res){
//   journalQuery.findByID(req.params.id, function(returnedEntry){
//     res.json(returnedEntry);
//   });
// });


module.exports = journalRouter;
