/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var JournalEntryList = __webpack_require__(2);

var UI = function(){
  this.entryList = new JournalEntryList();
  this.entryList.listOfEntries(function(results){
    this.populateSelect(results);
  }.bind(this));
};

UI.prototype = {
  populateSelect: function(results){
    var select = document.getElementById('entry-select');
    results.forEach(function(entry){
      var option = document.createElement('option');
      if (entry.timestamp !== undefined){
        option.innerText = ("[" + entry.entryNumber + "] " + entry.timestamp);
        option.value = entry.entryNumber;
        select.appendChild(option);
      }
    });
  },
  selectEntry: function(){
    var selectedEntryNumber = this.value;
    
  }
}

module.exports = UI;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var UI = __webpack_require__(0);

var app = function(){
  var ui = new UI();
  var select = document.getElementById('entry-select');
  select.onchange = ui.selectEntry;
};

window.onload = app;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var JournalEntryList = function(){

}

JournalEntryList.prototype = {
  makeRequest: function(url,callback){
    var request = new XMLHttpRequest();
    request.open('GET',url);
    request.onload = callback;
    request.send();
  },

  listOfEntries: function(callback){
    this.makeRequest("http://localhost:3000/api/journal", function(){
      if(this.status !== 200) return;
      var jsonString = this.responseText;
      var entryList = JSON.parse(jsonString);
      
      callback(entryList);
    });
  },

  selectEntry: function(id, callback){
    var url = "http://localhost:3000/api/journal/" + id;
    this.makeRequest(url, function(){
      if(this.status !== 200) return;
      var jsonString = this.responseText;
      var entry = JSON.parse(jsonString)[0];

      callback(entry);
    });
  }
}

module.exports = JournalEntryList;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map