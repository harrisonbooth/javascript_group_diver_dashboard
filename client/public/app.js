var UI = require('../src/views/masterUI');
var Game = require('./game_File');


var app = function(){
  
  var ui = new UI();
  var select = document.getElementById('entry-select');
  select.onchange = ui.selectEntry.bind(ui);

  var button = document.getElementById('add-new-entry');
  button.onclick = ui.newEntryForm.bind(ui);

  var game = new Game();

};


window.onload = app;
