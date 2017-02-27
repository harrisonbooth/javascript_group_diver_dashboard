var NewsStory = require('../models/newsStory');
var assert = require('assert');

describe('News Story', function(){

  context('it should have constructors', function(){

    var story = new NewsStory();

    it('should not be null', function(){
      assert.notEqual(null, story);
    });

  });

});
