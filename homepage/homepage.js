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

if (localStorage.getItem('user')) {
    $('#register').hide();
} else $('#register').show();

if (localStorage.getItem('user')) {
    $('#login').hide();
} else $('#login').show();

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
                html += "<a href='../manga/manga.html?id=" + manga.id_manga + "'>" + "<img src='" + "../mangas/" + manga.logo + "'>" + "</a>"
            });

            $('#manga').append(html);
        } else $("#error").html(res.msg)
    }
});

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