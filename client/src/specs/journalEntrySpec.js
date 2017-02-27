var JournalEntry = require('../models/journalEntry');
var assert = require('assert');

describe('JournalEntry', function(){

  context('it should have constructors', function(){

    var entry = new JournalEntry('hello');

    it('should have content', function(){
      assert.equal('hello', entry.content);
    });

    it('should have a timestamp', function(){
      assert.notEqual(null, entry.timestamp);
    })

  })

});
