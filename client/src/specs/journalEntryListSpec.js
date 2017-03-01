var JournalEntryList = require('../models/JournalEntryList');
var assert = require('assert');

describe('Journal Entry List', function(){

  context('it should have constructors', function(){

    var entryList = new JournalEntryList();

    it('should not be null', function(){
      assert.notEqual(null, entryList);
    });
    
  });

});
