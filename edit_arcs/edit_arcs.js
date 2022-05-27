$.ajax({
    url: "../edit_mangas/edit_mangas.php",
    type: "GET",
    data: {
        choice: "select"
    },
    dataType: "json",
    success: (res, status) => {
        if (res.success) {
            let AllManga;

            res.mangas.forEach(manga => {
                AllManga += "<option value ='" + manga.id_manga + "'>" + manga.logo + "</option>";
            });

            $('#manga').append(AllManga);
        }
    }
})

$.ajax({
    url: "edit_arcs.php",
    type: "GET",
    data: {
        choice: 'select'
    },
    dataType: "json",
    success: (res, status) => {
        if (res.success) {
            let html = '';

            res.arcs.forEach(arc => {
                html += "<tr id='tr-" + arc.id_arc + "'>" +
                    "<td>" + arc.arc_number + "</td>" +
                    "<td>" + arc.name_arc + "</td>" +
                    "<td>" + "<img src='" + "../mangas/" + arc.picture + "'>" + "</td>" +
                    "<td>" + "<img src='" + "../mangas/" + arc.manga + "'>" + "</td>" +
                    "<td><button onclick='wantToDelete(" + arc.id_arc + ", \"" + arc.name_arc + "\")'>Supprimer</button></td>" +
                    "</tr>";
            });

            $('table').append(html);
        } else $("#error").html(res.msg)
    }
})

$("input:submit").click((e) => {
    e.preventDefault();

    const id = $("#id_arc").val();
    const arc_number = $("#arc_number").val();
    const name = $("#name").val();
    const picture = $("#picture").val();
    const manga = $("#manga").val();

    insertArc(arc_number, name, picture, manga);
});

function insertArc(arc_number, name, picture, manga) {
    $.ajax({
        url: "edit_arcs.php",
        type: "POST",
        data: {
            choice: 'insert',
            arc_number,
            name,
            picture,
            manga
        },
        dataType:"json",
        success: (res, status) => {
            if (res.success) {
                const newArc = "<tr id='tr-" + res.newid + "'>" +
                    "<td>" + arc_number + "</td>" +
                    "<td>" + name + "</td>" +
                    "<td><img src='" + picture + "'></td>" +
                    "<td><img src='" + manga + "'></td>" +
                    "<td><button onclick='wantToDelete(" + res.newid + ", " + arc.name + ")'>Supprimer</button></td>" +
                    "</tr>";

                $('table').append(newArc);
            } else $("#error").html(res.msg);

            document.querySelector('form').reset();
        }
    })
};

function wantToDelete(id, name) {
    const wantTo = confirm("Supprimer" + name + "?");

    if (wantTo) {
        $.ajax({
            url: "edit_arcs.php",
            type: "POST",
            data: {
                choice: 'delete',
                id
            },
            dataType: "json",
            success: (res, status) => {
                if (res.success) {
                    $("#tr-" + id).remove();
                } else $("#error").html(res.msg);
            }
        });
    }
}