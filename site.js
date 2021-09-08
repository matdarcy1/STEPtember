$( document ).ready(function() {

    const teams = ["83b7b0f780031af0110e3a9f4193f521", 
                    "28019145828c6b99c4977305f6f4a598", 
                    "ac8398f6a692501c0284cec3102bc085", 
                    "071f1714c3acdd789d0ae504355ff32a", 
                    "6f11c0ca228154dd772ae7fbc65af272", 
                    "d3a44a685654449fadf2382afa0e09bc"];

    var teamData = [];
    
    $.each(teams, function(index, teamHash) {

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

    $.each(teamData, function(index, team) {

        var logsMissing = 0;
	var total = [];

        team.graphdata.forEach(function(data, index) {
            if(data[0] == 0) { logsMissing++ }
            if(data[1] == 0) { logsMissing++ }
            if(data[2] == 0) { logsMissing++ }
            if(data[3] == 0) { logsMissing++ }
            if(data[4] == 0) { logsMissing++ }
        });


        $( "#teamrows" ).append("<tr>\
                                    <td>" + team.team + "</td>\
                                    <td>" + team.steps + "</td>\
                                    <td>" + logsMissing + "</td>\
                                </tr>");


        var detailsHtml = "  <div class='col-lg-4 col-sm-12'>\
                                <div class='card mb-5 text-center'>"
                                        + "<h3>" + team.team + "</h3>" +
                                        "<div class='card-body'>\
                                            <table class='table table-striped table-bordered text-center '>";


                                                team.graphdata.forEach(function(data, index) {
                                                    if(index == 0) {
							total[0] = 0;
							total[1] = 0;
							total[2] = 0;
							total[3] = 0;
                                                        detailsHtml += "<thead class='thead-dark'>\
                                                                            <tr>\
                                                                                <th scope='col'>" + data[0] + "</th>\
                                                                                <th scope='col'>" + data[1] + "</th>\
                                                                                <th scope='col'>" + data[2] + "</th>\
                                                                                <th scope='col'>" + data[3] + "</th>\
                                                                                <th scope='col'>" + data[4] + "</th>\
                                                                            </tr>\
                                                                        </thead>\
                                                                        <tbody>";
                                                    } else {
							total[0] += data[1];
							total[1] += data[2];
							total[2] += data[3];
							total[3] += data[4];
														
                                                        detailsHtml += "<tr>\
                                                                            <td>" + data[0] + "</th>\
                                                                            <td>" + data[1] + "</td>\
                                                                            <td>" + data[2] + "</td>\
                                                                            <td>" + data[3] + "</td>\
                                                                            <td>" + data[4] + "</td>\
                                                                        </tr>";
                                                    }
                                                });
                                                detailsHtml += "<tr style='font-weight:bold'><td>Total</td>\
								<td>" + total[0] + "</td>\
								<td>" + total[1] + "</td>\
								<td>" + total[2] + "</td>\
								<td>" + total[3] + "</td>\
								</tr>";


                detailsHtml += "              </tbody>\
                                            </table>\
                                        </div>\
                                    </div>\
                                </div>";

            $("#teamdetails").append(detailsHtml);    
    });
});
