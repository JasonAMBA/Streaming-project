const urlParams = new URLSearchParams(window.location.search);
const episode_id = urlParams.get('id');

$.ajax({
    url: "../watch/watch.php",
    type: "POST",
    data: {
        choice: 'insert',
        episode_id
    },
    dataType: "json",
    success:(res, status) => {
        if (res.success) {
            alert("Episode ajouté à votre historique !")
        } else alert("Erreur lors de l'ajout");
    }
})

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
                    "<h4> episode" + " " + episode.number_episode + " : " + episode.titre_episode + "</h4>" +
                    "<video controls src='" + "../mangas/" + episode.video + "'>" + "</video>" +
                    "</div>"
                });

                $('#episode').append(ep);
            }
        }
    })
}

episode_id ? getEpisode(episode_id) : alert('error');

if (localStorage.getItem('user')) {
    $('#historical').show();
} else $('#historical').hide();

$('#deco').click((e) => {
    e.preventDefault();
    $.ajax({
        url: "../logout/logout.php",
        type: "GET",
        data: {

        },
        dataType: "json",
        success: (res, status) => {
            if (res.success) {
                localStorage.removeItem('user');
                window.location.replace("../homepage/homepage.html")
            } else alert("erreur")
        }
    })
})

if (localStorage.getItem('user')) {
    $('#deco').show();
} else $('#deco').hide();

$.ajax({
    url: "../watch/watch.php",
    type: "GET",
    data: {
        choice: 'select_id'
    },
    dataType: 'json',
    success: (res, status) => {
        if (res.success) {
            let hist = '';

            res.ids.forEach(id => {
                hist += "<a href='../watch/watch.html?id=" + id.id_user + "'>" + "<h2> Historique </h2>" + "</a>"
            });

            $('#historical').append(hist);
        } else alert("erreur lors de l'ajout de l'historique !")
    }
});

if (localStorage.getItem('user')) {
    $('#historical').show();
} else $('#historical').hide();

$.ajax({
    url: "../edit_mangas/edit_mangas.php",
    type: "GET",
    data: {
        choice: 'select'
    },
    dataType: 'json',
    success: (res, status) => {
        if (res.success) {
            let html = '';

            res.mangas.forEach(manga => {
                html += "<a href='../manga/manga.html?id=" + manga.id_manga + "'>" + "<img src=" + "../various/back.png" + ">" + "</a>"
            });

            $('#back').append(html);
        } else $("#error").html(res.msg)
    }
});
