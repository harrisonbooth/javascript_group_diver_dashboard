var UI = require('../src/views/masterUI');

var app = function(){
  var ui = new UI();
  var select = document.getElementById('entry-select');
  select.onchange = ui.selectEntry.bind(ui);

  var button = document.getElementById('add-new-entry');
  button.onclick = ui.newEntryForm.bind(ui);

  var sonarButton = document.getElementById('sonar-button');
  sonarButton.onclick = ui.playSonarSound;
};

window.onload = app;
