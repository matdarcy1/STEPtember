$( document ).ready(function() {

    const teams = ["83b7b0f780031af0110e3a9f4193f521", "28019145828c6b99c4977305f6f4a598", "781a042e171c7173b2df003c9f6466ba", "071f1714c3acdd789d0ae504355ff32a", "6f11c0ca228154dd772ae7fbc65af272", "d3a44a685654449fadf2382afa0e09bc"];

    teams.forEach(function(teamHash) {
        $.post( "https://app.steptember.org.au/Mobileapp/getDashboard", { member_hash: teamHash })
        .done(function( data ) {
            const obj = JSON.parse(data);
            $( "#teamtable" ).append( " <tr>\
                                            <td>" + obj.team.teamName + "</td>\
                                            <td>" + obj.team.teamStepCount + "</td>\
                                        </tr>");
        });
    });

    
});