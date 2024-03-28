require("dotenv").config();
// Requiring fs module in which
// writeFile function is defined.
const fetch = (...args) => import ("node-fetch").then(({default : fetch}) => fetch(...args));
const startggurl = "https://api.start.gg/gql/alpha";
const startggkey = process.env.STARTGG_KEY;
const Authorization = "Bearer " + startggkey;

module.exports =  { 
    getEventId:  function (tournamentName, eventName) {
        const eventSlug = `tournament/${tournamentName}/event/${eventName}`;
        id = fetch(startggurl, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                "Authorization": "Bearer " + startggkey
            },
            body: JSON.stringify({
                query: "query EventQuery($slug: String) {event(slug: $slug) {id name}}",
                variables: {
                    slug: eventSlug
                },
            })
        }).then(r => r.json())
            .then(data => {
                return data.data.event.id;
            });
        return id;
    },

    getTeams: function (eventId) {
        let teams= "";
        teams = fetch(startggurl, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                "Authorization": "Bearer " + startggkey
            },
            body: JSON.stringify({
                query: "query EventEntrants($eventId :ID!) {event(id: $eventId) {id name entrants(query: { })  { pageInfo{total} nodes { id name participants {id gamerTag} } } } },",
                variables: {
                    eventId: eventId
                },
            })
        }).then(r => r.json())
            .then(data => {
                totalEntry = data.data.event.entrants.pageInfo.total;
                teams = "";
                for (i = 0; i < totalEntry; i++) {
                    teams = teams + data.data.event.entrants.nodes[i].name + "\n";
                }
                teams = teams.substring(0, teams.length - 1);
                return teams;

            });
        return teams;
    }
}