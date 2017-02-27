var NumberWidget = function(limit){
  this.limit = limit;
};

NumberWidget.prototype = {

  addWidget: function(container){
    appendWidget(container);
  },

  appendWidget: function(container){
    console.log(this.limit);
    var container = container;
    var widget = this.createWidget();

    container.appendChild(widget);
  },

  createWidget: function(){
    var numberDisplay = document.createElement('p');
    numberDisplay.id = "number-display";

    var bar1 = document.createElement('div');
    var bar2 = document.createElement('div');
    bar1.classList.add("bar-display");
    bar2.classList.add("bar-display");

    var widgetWrapper = document.createElement('div');
    widgetWrapper.id = "widget-wrapper";

    var number = this.limit;
    numberDisplay.innerText = number * 10;
    bar1.style.height = "50px";
    bar1.style.transitionDuration = "5s";
    bar2.style.height = "75px";
    bar2.style.transitionDuration = "2s";

    widgetWrapper.appendChild(bar2);
    widgetWrapper.appendChild(bar1);
    widgetWrapper.appendChild(numberDisplay);

    return widgetWrapper;
  },

  adjustDisplay: function(){
    console.log("Display adjusting");
    var numberDisplay = document.getElementById('number-display');
    var bar1 = document.getElementsByClassName('bar-display')[0];
    var bar2 = document.getElementsByClassName('bar-display')[1];

    var number = parseInt(numberDisplay.innerText);

    if((number/10) > (this.limit/2)){
      number -= (Math.random() * this.limit)/8;
    } else {
      number += (Math.random() * this.limit)/8;
    }

    console.log(number);
    console.log(this.limit);
    numberDisplay.innerText = number.toFixed(0);

    if((Math.random() * 1) > 0.4){
      bar1.style.height = String(number/1000 * 200) + "px";
      bar2.style.height = String(number/1000 * 0) + "px";
    } else {
      bar1.style.height = String(number/1000 * 0) + "px";
      bar2.style.height = String(number/1000 * 200) + "px";
    }

  }
}

module.exports = NumberWidget;
