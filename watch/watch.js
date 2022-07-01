const urlParams = new URLSearchParams(window.location.search);
const user_id = urlParams.get('id');

function getUser(id) {
    
    $.ajax({
        url: "watch.php",
        type: "GET",
        data:{
            choice: 'select',
            id
        },
        dataType: "json",
        success: (res, status) => {
            if (res.success) {
                let episodes = '';

                res.historicals.forEach(historical => {
                    episodes += "<div>" +
                        "<h5> le " + historical.date + " à "+ historical.time + "</h5>" +
                        "<p>" + historical.manga + " Episode " + historical.number_episode + " : " + historical.titre_episode + "</p>" + "<hr>" +
                        "</div>"
                });

                $('#episodes').append(episodes);
            }
        }
    })
}

user_id ? getUser(user_id) : alert('error');