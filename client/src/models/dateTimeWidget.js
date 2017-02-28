var dateTimeWidget = function(container){
    this.container = container;
};

dateTimeWidget.prototype = {
  appendWidget: function(){
    var widget = this.createWidget();
    this.container.appendChild(widget);
  },

  createWidget: function(){
    var widgetDiv = document.createElement('div');
    widgetDiv.id = "widget-wrapper";

    var timeDiv = document.createElement('div');
    timeDiv.id = "time-wrapper";
    var dateDiv = document.createElement('div');
    dateDiv.id = "date-wrapper";

    var timeP = document.createElement('p');
    timeP.id = "time-display";

    var dateP = document.createElement('p');
    dateP.id = "date-display";

    var dateTime = Date();
    var date = dateTime.substring(0, 15);
    var time = dateTime.substring(16, 21);

    dateP.innerText = date;
    timeP.innerText = time;

    dateDiv.appendChild(dateP);
    timeDiv.appendChild(timeP);

    widgetDiv.appendChild(dateDiv);
    widgetDiv.appendChild(timeDiv);

    return widgetDiv;
  },

  updateWidget: function(){
    var dateP = document.getElementById('date-display');
    var timeP = document.getElementById('time-display');

    var dateTime = Date();
    var date = dateTime.substring(0, 15);
    var time = dateTime.substring(16, 21);

    dateP.innerText = date;
    timeP.innerText = time;
  }

}

module.exports = dateTimeWidget;
