var UI = require('../src/views/masterUI');

var app = function(){
  var ui = new UI();
  var select = document.getElementById('entry-select');
  select.onchange = ui.selectEntry.bind(ui);

  var button = document.getElementById('add-new-entry');
  button.onclick = ui.newEntryForm.bind(ui);

  ui.depthGauge.adjustDisplay();
  setInterval(ui.depthGauge.adjustDisplay.bind(ui.depthGauge), 100);

  var sonarButton = document.getElementById('sonar-button');
  sonarButton.onclick = ui.playSonarSound.bind(this);

};

window.onload = app;
