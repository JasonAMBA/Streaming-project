const urlParams = new URLSearchParams(window.location.search);
const manga_id = urlParams.get('id');

function getManga(id) {

    $.ajax({
        url: "manga.php",
        type: "GET",
        data: {
            choice: "manga",
            id
        },
        dataType: "json",
        success: (res, status) => {
            if (res.success) {
                let manga = '';

                res.infos.forEach(info => {
                    manga += "<div>" + 
                        "<img src='" + "../mangas/" + info.logo + "'>" +
                        "<h4> Date de sortie :" + " " + info.release_date + "</h4>" +
                        "<h4> Résumé :" + " " + info.summary + "</h4>" +
                        "<h4> Auteur :" + " " + info.author + "</h4>" +
                        "<h4> Nombre d'arcs :" + " " + info.number_arcs + "</h4>" +
                        "<h4> Nombre d'épisodes :" + " " + info.number_episodes + "</h4>" +
                        "</div>"
                });

                $('#manga').append(manga);
            }
        }
    })
}

manga_id ? getManga(manga_id) : alert('error');

function getArc(id) {
    $.ajax({
        url: "manga.php",
        type: "GET",
        data: {
            choice: "arc",
            id
        },
        dataType: "json",
        success: (res, status) => {
            if (res.success) {
                let allArc = '';

                res.arcs.forEach(arc => {
                    allArc += "<div>" +
                    "<a href='../arc/arc.html?id=" + arc.id_arc + "'>" + "<h4> Arc :" + " " + arc.arc_number + " " + arc.name_arc + "</h4>" + "</a>"
                });

                $('#arcs').append(allArc);
            }
        }
    })
}

manga_id ? getArc(manga_id) : alert('error');