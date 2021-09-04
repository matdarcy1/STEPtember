$( document ).ready(function() {

    const teams = ["83b7b0f780031af0110e3a9f4193f521", 
                    "28019145828c6b99c4977305f6f4a598", 
                    "ac8398f6a692501c0284cec3102bc085", 
                    "071f1714c3acdd789d0ae504355ff32a", 
                    "6f11c0ca228154dd772ae7fbc65af272", 
                    "d3a44a685654449fadf2382afa0e09bc"];

    var teamData = [];
    
    teams.forEach(function(teamHash) {

        var remote = $.ajax({
            data:{
                member_hash: teamHash
            },
            type: "POST",
            url:  "https://app.steptember.org.au/Mobileapp/getDashboard",
            async: false
        }).responseText;

        const obj = JSON.parse(remote);
        teamData.push({'team': obj.team.teamName, 'steps': obj.team.teamStepCount, 'graphdata': obj.stepGraphData.teamBreakDownGraphData });
    });

    teamData.sort((a,b) => (a.steps < b.steps) ? 1 : ((b.steps < a.steps) ? -1 : 0));

    console.log(teamData);

    teamData.forEach(function(team) {
        $( "#teamrows" ).append("<tr>\
                                    <td>" + team.team + "</td>\
                                    <td>" + team.steps + "</td>\
                                </tr>");
/*
        $("#teamdetail").append("<table class='table table-striped table-bordered'>\
                                    <thead class='thead-dark'>\
                                        <tr>\
                                            <th scope='col'>Team Member</th>\
                                            <th scope='col'>Date</th>\
                                            <th scope='col'>Steps</th>\
                                        </tr>\
                                    </thead>\
                                    <tbody id='teamrows'>");
        
                 
        team.graphdata.forEach(function(data, index) {
            console.log(index);
            $("#teamdetail" ).append("<tr>\
                                        <th scope='row'>" + data[0] + "</th>\
                                        <td>" + data[1] + "</td>\
                                    </tr>");
        });


         $("#teamdetail").append("</tbody>\
                                </table>");
                                */
    });

    /*
        $.post( "https://app.steptember.org.au/Mobileapp/getDashboard", { member_hash: teamHash })
        .done(function( data ) {
            const obj = JSON.parse(data);
            $( "#teamrows" ).append( " <tr>\
                                            <th scope='row'>" + obj.team.teamName + "</th>\
                                            <td>" + obj.team.teamStepCount+ "</td>\
                                        </tr>");


        });
        */

    
});