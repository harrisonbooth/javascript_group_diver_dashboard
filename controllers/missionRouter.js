var express = require('express');
var missionRouter = express.Router();
var MissionQuery = require('../client/db/missionQuery');

var missionQuery = new MissionQuery();

missionRouter.get('/', function(req, res){
  missionQuery.all(function(returnedMessages){
    res.json(returnedMessages);
  });
});

module.exports = missionRouter;
