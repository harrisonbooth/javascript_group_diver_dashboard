var UI = require('../src/views/masterUI');

var app = function(){
  var ui = new UI();
  var select = document.getElementById('entry-select');
  select.onchange = ui.selectEntry.bind(ui);

  var button = document.getElementById('add-new-entry');
  button.onclick = ui.newEntryForm.bind(ui);

<<<<<<< HEAD
  ui.depthGauge.adjustDisplay();
  setInterval(ui.depthGauge.adjustDisplay.bind(ui.depthGauge), 100);
=======
  var sonarButton = document.getElementById('sonar-button');
  sonarButton.onclick = ui.playSonarSound.bind(this);
>>>>>>> 1e4cb5671c0aea16e99d060d04d3b6ac41d49df0
};

window.onload = app;
