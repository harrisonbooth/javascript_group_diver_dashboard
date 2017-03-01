var UI = require('../src/views/masterUI');
var Game = require('./gameFile');

var app = function(){

  var ui = new UI();
  var select = document.getElementById('entry-select');
  select.onchange = ui.selectEntry.bind(ui);

  var button = document.getElementById('add-new-entry');
  button.onclick = ui.newEntryForm.bind(ui);

    // ui.depthGauge.adjustDisplay();
    // setInterval(ui.depthGauge.adjustDisplay.bind(ui.depthGauge), 100);

  setInterval(ui.newsUI.scrollNews.bind(ui.newsUI), 5000);

  setInterval(ui.dateTimeWidget.updateWidget.bind(ui.dateTimeWidget), 1000);
  var game = new Game();

};

window.onload = app;
