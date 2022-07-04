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
                    "<a href='../arc/arc.html?id=" + arc.id_arc + "'>" + "<button class='arc'> Arc" + " " + arc.arc_number + " " + ":" + " " + arc.name_arc + "</button>" + "</a>" +
                    "</div>"
                });

                $('#arcs').append(allArc);
            }
        }
    })
}

manga_id ? getArc(manga_id) : alert('error');

$("input:submit").click((e) => {
    e.preventDefault();

    const content = $("#content").val();

    commentUser(content);
})

$.ajax({
    url: "../comment/comment.php",
    type: "GET",
    data: {
        choice: 'select',
        manga_id
    },
    dataType: 'json',
    success: (res, status) => {
        if (res.success) {
            let comments = "";

            res.comments.forEach(comment => {
                comments += "<div class='comment'>" +
                    "<p>" + "<strong>" + comment.prenom + " " + ":" + "</strong>" + "</p>" +
                    "<p>" + comment.content + "</p>" +
                    "<p>" + comment.date + "</p>" +
                    "</div>";
            });

            $('#comment').append(comments);
        } else $("#error").html(res.msg)
    }
})

function commentUser(content) {
    $.ajax({
        url: "../comment/comment.php",
        type: "POST",
        data: {
            choice: 'insert',
            content,
            manga_id
        },
        dataType: 'json',
        success: (res, status) => {
            if (res.success) {
                const newComment = "<div class='comment'>" +
                    "<p>" + content + "</p>" +
                    "</div>";
                $('#comment').append(newComment);
            } else $("#error").html(res.msg);

            document.querySelector('form').reset();
        }
    });
}

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