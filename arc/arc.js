const urlParams = new URLSearchParams(window.location.search);
const arc_id = urlParams.get('id');

function getArc(id) {

    $.ajax({
        url: "arc.php",
        type: "GET",
        data: {
            choice: "arc",
            id
        },
        dataType: "json",
        success: (res, status) => {
            if (res.success) {
                let arc = '';

                res.infos.forEach(info => {
                    arc += "<div>" +  
                        "<h4> Arc" + " " + info.arc_number + " " + ": " + info.name_arc + "</h4>" +
                        "<img src='" + "../mangas/" + info.picture + "'>" +
                        "</div>"
                });

                $('#arc').append(arc);
            }
        }
    })
}

arc_id ? getArc(arc_id) : alert('error');

function getEpisode(id) {

    $.ajax({
        url: "arc.php",
        type: "GET",
        data: {
            choice: "episode",
            id
        },
        dataType: "json",
        success: (res, status) => {
            if (res.success) {
                let ep = '';

                res.episodes.forEach(episode => {
                    ep += "<div>" +  
                    "<a href='../episode/episode.html?id=" + episode.id_episode + "'>" + "<h4> Episode" + " " + episode.number_episode +  "</h4>" + "</a>" +
                    "</div>"
                });

                $('#episode').append(ep);
            }
        }
    })
}

arc_id ? getEpisode(arc_id) : alert('error');