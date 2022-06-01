const urlParams = new URLSearchParams(window.location.search);
const episode_id = urlParams.get('id');

function getEpisode(id) {

    $.ajax({
        url: "episode.php",
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
                    "<h4> episode :" + " " + episode.number_episode + " " + ":" + " " + episode.titre_episode + "</h4>" +
                    "<video controls src='" + "../mangas/" + episode.video + "'>" + "</video>" +
                    "</div>"
                });

                $('#episode').append(ep);
            }
        }
    })
}

episode_id ? getEpisode(episode_id) : alert('error');