const fs = require('fs') 
const querries = require('./querries');

eventName = "eurocup";
tourney = "eurocup-omega-strikers";

let Eventid = function(event,tourney) {
    return querries.getEventId(event,tourney).then(id => {return id}).then(id => {
    querries.getTeams(id).then(teams => {return teams} ).then(teams => {
        fs.writeFile("Teams.txt", teams, (err) => {
            if (err) throw err;
        });
    });

});
}

id = Eventid(eventName,tourney) 
id.then(function(id){
    return id
})

//1038994
