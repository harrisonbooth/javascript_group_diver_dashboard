var UI = require('../src/views/masterUI');

var app = function(){
  var ui = new UI();
  var select = document.getElementById('entry-select');
  select.onchange = ui.selectEntry;
};

window.onload = app;
