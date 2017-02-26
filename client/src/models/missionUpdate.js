var MissionUpdate = function(){};

MissionUpdate.prototype = {
  makeRequest: function(url, callback){
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = callback;
    request.send();
  },

  listofMissions: function(callback){
    this.makeRequest("http://localhost:3000/api/mission", function(){
      if(this.status !== 200) return;
      var jsonString = this.responseText;
      var missionList = JSON.parse(jsonString);

      callback(missionList);
    }
  }
  
}

module.exports = MissionUpdate;
