var MissionUpdate = require('../models/missionUpdate');
var assert = require('assert');

describe('Mission Update', function(){

  context('it should have constructors', function(){

    var update = new MissionUpdate();

    it('should not be null', function(){
      assert.notEqual(null, update);
    });

  });

});
