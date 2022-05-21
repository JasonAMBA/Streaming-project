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