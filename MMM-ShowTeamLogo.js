Module.register("MMM-ShowTeamLogo",{
    defaults: {
        height: "100px",
        width: "100px",
        options: {
          url: 'http://api.football-data.org/v1/soccerseasons/', 
          headers: {'X-Auth-Token': 'YOUR_TOKEN'},
          shortNameLeague: "BL1",
          shortNameTeam: "HSV",
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
            wrapper.style.backgroundImage = "url('" + this.logoPath + "')";
            wrapper.style.height = "100%";
            wrapper.style.backgroundRepeat= 'no-repeat';
            wrapper.style.minHeight = this.config.height;
            wrapper.style.minWidth = this.config.width;
            wrapper.style.backgroundSize = "contain";
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
