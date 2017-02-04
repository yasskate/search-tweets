$(document).ready(function(){
  $("#posiDiv").hide();
  $("#negaDiv").hide();
});

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function ajax_csrf_token(){
  var csrftoken = getCookie('csrftoken');
  $.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
      }
    });
}

$("#searchWord").on("click", function(e){
  $("#posiDiv").hide();
  $("#negaDiv").hide();
  $("#ntweet").html("");
  $("#ptweet").html("");
  $('#spinnertwt').html('<img id="imgspinner" src="../static/img/spinner.gif" alt="Loading..."/> ');

  ajax_csrf_token();
  $.ajax({
    url: '/search/tweet/',
    data: {"word": $("#inputhashtag").val()},
     method: 'POST',
    dataType: 'json',
    success: function(data){
        if (data.ok) {

          var pNumTweets = 0;
          var nNumTweets = 0;
          var pJsonData = jQuery.parseJSON(data.positive);
          var nJsonData = jQuery.parseJSON(data.negative);

          //console.log(pJsonData);
          for (var i = 0; i < pJsonData.statuses.length; i++) {
            pNumTweets += 1;
            //console.log(pJsonData.statuses[i].text);
            //console.log(pJsonData.statuses[i].user);
            var username = pJsonData.statuses[i].user.screen_name;
            var tweet = pJsonData.statuses[i].text;
            var imgUser =  pJsonData.statuses[i].user.profile_image_url;
            var location = pJsonData.statuses[i].user.location;
            var date = pJsonData.statuses[i].created_at;

            var pTweet = "<div class='alert-success'>"+
                            "<div class='media-left media-middle'>"+
                              "<img class='media-object' src='"+imgUser+"' alt='image...'>"+
                            "</div>"+
                            "<div class='media-body'>"+
                              "<a target='blank_' href='https://twitter.com/"+username+"'><h4 class='media-heading'>@"+username+"</a></h4>"+
                              "<br/><label>"+tweet+"</label>"+
                              "<label>"+location+"</label>"+
                              "<label>"+date+"</label><hr/>"+
                            "</div>"+
                        "</div>";
            $("#ptweet").append(pTweet);
            //console.log(pJsonData.statuses[i]);
          }

          for (var j = 0; j < nJsonData.statuses.length; j++) {
            nNumTweets +=1;
            username = nJsonData.statuses[j].user.screen_name;
            tweet = nJsonData.statuses[j].text;
            imgUser =  nJsonData.statuses[j].user.profile_image_url;
            location = nJsonData.statuses[j].user.location;
            date = nJsonData.statuses[j].created_at;

            var nTweet = "<div class='alert-danger'>"+
                            "<div class='media-left media-middle'>"+
                              "<img class='media-object' src='"+imgUser+"' alt='image...'>"+
                            "</div>"+
                            "<div class='media-body'>"+
                              "<a target='blank_' href='https://twitter.com/"+username+"'><h4 class='media-heading'>@"+username+"</a></h4>"+
                              "<br/><label>"+tweet+"</label>"+
                              "<label>"+location+"</label>"+
                              "<label>"+date+"</label><hr/>"+
                            "</div>"+
                        "</div>";
            $("#ntweet").append(nTweet);
          }
          $('#spinnertwt').html("");
          $("#labelPositive").html(pNumTweets);
          $("#labelNegative").html(nNumTweets);

          $("#posiDiv").show();
          $("#negaDiv").show();
          //console.log(data.negative);
        }else {
          alert(data.error);
        }
    }
  });
});

/* #################################### */




var idPlaces;

$('#form_search').submit(function(e){

    $('#listplace').empty();
    $('#twtresult').remove();
    $('#showerror').remove();
    $('#spinnershowtwt').html('<img id="imgspinner" src="../static/img/spinner.gif" alt="Loading"/> ');
    e.preventDefault();

    $.post('/search/tweet/', $(this).serialize(), function(hashtag){
        idPlaces = hashtag.countPlaces
        if (hashtag.ok){
           $('#imgspinner').remove();
            var result = "<h4 id='twtresult'>Se encontraron: "+hashtag.twtstotal+" tweets con el hashtag: <span class='label label-default'>"+hashtag.inhastg+"</span></h4>";
            $('#hashtag').html(result);
            //$('#form_search').each(function(){this.reset();});
            if(hashtag.places){
                var place = hashtag.place;
                for(var i = 0; i < place.length; i++){
                    var resPlace = "<button type='button' id="+i+" class='list-group-item'>"+place[i]+"</button>";
                    $('#listplace').append(resPlace);

                }

                $('.list-group-item').click(function(){
                    var coordsPlace = this.id;
                    alert(coordsPlace);
                });
            }
        }else{
            $('#imgspinner').remove();
        }
        $('#form_search').each(function(){this.reset();});
    }, 'json');
});

/*
for(var x=0; x<idPlaces; x++){
    $idPlace = $('.list-group-item').eq(x).attr('id');
    console.log($idPlace);
}
*/
    //localStorage.setItem('idPlace',$idplace);

/*$('.linkplaces').on('click', function(){
    var idPlace = $(this).attr("id");
    alert(idPlace);
    console.log(this.id);
});

$('a').click(function(e) {
      //$test= $(this).attr('id');
      console.log("dentro del aca! :)");
});

/*
$(document).ready(function() {
    $('a.linkplaces').click(function(){
        var id = $(this).attr('id');
        console.log(id);
    });
});*/

/*
    function getTweets(hashtag){
        $.ajax({
            url: 'https://api.twitter.com/1.1/search/tweets.json',
            data: { q:hashtag },
            dataType: 'jsonp',
            success: function(data){
                console.log(data);
            }
        });
    }
});
*/
