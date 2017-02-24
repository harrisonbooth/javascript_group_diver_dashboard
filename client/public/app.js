var UI = require('../src/views/masterUI');

var app = function(){
  var ui = new UI();
  var select = document.getElementById('entry-select');
  select.onchange = ui.selectEntry;

  var button = document.getElementById('add-new-entry');

  button.onclick = ui.newEntryForm;
};

window.onload = app;
