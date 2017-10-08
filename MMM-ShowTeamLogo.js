Module.register("MMM-ShowTeamLogo",{
    defaults: {
        text: "Hello World!",
        lists: "some list",
        width: "100px",
        options: {
          url: 'http://api.football-data.org/v1/soccerseasons/', 
          headers: {'X-Auth-Token': 'YOUR_TOKEN'},
          shortNameLeague: "BL1",
          shortNameTeam: "HSV",
          nextGamesView: 4,
          lastGamesView: 4,
        },
    },

    socketNotificationReceived: function(notification, payload) {

        if(notification === 'GET_URL_PATH_TO_LOGO'){
          this.logoPath = payload;
          this.updateDom(3000); 
        }

    },

    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("div");  
        
        if(this.logoPath.length === 0){
          wrapper.innerHTML = "Keine Logo gefunden"
        }
        else{
            wrapper.style.height = "150px";
            wrapper.style.width = "200px";
            wrapper.style.backgroundImage = "url('" + this.logoPath + "')";
            wrapper.style.backgroundSize = "cover";
        }
        return wrapper;
    },

    start: function() {        
        this.logoPath = [];
        this.sendSocketNotification("CONNECTED", this.config.options);
        this.update();
    },

    update: function () {
        this.sendSocketNotification("UPDATEUI", "options");
    }
});
