var NumberWidget = require('../models/numberWidget');
var assert = require('assert');

describe('Number Widget', function(){

  context('it should have constructors', function(){

    var widget = new NumberWidget(3);

    it('should not be null', function(){
      assert.notEqual(null, widget);
    });

    it('should have a limit', function(){
      assert.equal(3, widget.limit);
    });

  });

});
