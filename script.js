$('#reset1').click(() => {
    $('#title').val("");
    $('#year').val("");
    $('#imdbID').val("");
    $('.class1').empty();
});
$('#reset2').click(() => {
    $('#imdbID').val("");
    $('#title').val("");
    $('#year').val("");
    $('.class1').empty();
});
$('#search1').click(() => {
    $('#imdbID').val("");
    $('.class1').empty();
    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: 'https://www.omdbapi.com/?apikey=145eddf2&s=' + $('#title').val(),
        success: (response) => {
            console.log(response);
            if (response.Response == "False") {
                alert("Please check the title of the movie");
            }
            let movies = response.Search;
            if ($('#year').val()) {
                var yearMatched = 0;
                for (movie in movies) {
                    console.log(movies[movie]);
                    if (movies[movie].Year == $('#year').val()) {
                        yearMatched = 1;
                        console.log(movies[movie].Title)
                        console.log(movies[movie].Year)
                        console.log(movies[movie].Type)
                        console.log(movies[movie].imdbID)
                        let card = `<div class="col-sm-6 col-md-6 col-lg-4 col-xl-4">
                                        <div class="card" style="width:300px;margin-bottom:20px;">
                                          <img class="card-img-top" style="" src=${movies[movie].Poster} alt="poster">
                                          <div class="card-body text-center">
                                            <p class="card-text ">
                                            <h5>${movies[movie].Title}</h5>
                                            Year : ${movies[movie].Year}<br>
                                            Type : ${movies[movie].Type}<br>
                                            ImdbId : ${movies[movie].imdbID}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                  `;
                        $('.class1').append(card);
                        if (movies[movie].Poster == "N/A") {
                            console.log("N/A");
                            $('.card-img-top').eq(movie).attr("src", "poster.png");
                        }
                    }
                }
                if (yearMatched == 0) {
                    alert("Please check the entered parameters!")
                }
            }
            if (!$('#year').val()) {
                for (movie in movies) {
                    console.log(movies[movie]);
                    let card = `<div class="col-sm-6 col-md-6 col-lg-4 col-xl-4">
                                <div class="card" style="margin-bottom:20px;">
                                  <img class="card-img-top" style="" src=${movies[movie].Poster} alt="poster">
                                  <div class="card-body text-center">
                                    <p class="card-text ">
                                    <h5>${movies[movie].Title}</h5>
                                    Year : ${movies[movie].Year}<br>
                                    Type : ${movies[movie].Type}<br>
                                    ImdbId : ${movies[movie].imdbID}
                                    </p>
                                  </div>
                                </div>
                            </div>
                          `;
                    $('.class1').append(card);
                    if (movies[movie].Poster == "N/A") {
                        console.log("N/A");
                        $('.card-img-top').eq(movie).attr("src", "poster.png");
                    }
                }
            }
        },
        error: (err) => {
            console.log(err);
        }
    })
});
$('#search2').click(() => {
    $('#title').val("");
    $('#year').val("");
    $('.class1').empty();
    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: 'https://www.omdbapi.com/?apikey=145eddf2&i=' + $('#imdbID').val(),
        success: (response) => {
            console.log(response);
            if (response.Response == "False") {
                alert("Enter a valid imdbID");
            }
            if (response.Response != "False") {
                let card = `<div class="col-sm-6 col-md-6 col-lg-4 col-xl-4">
                        <div class="card" style="width:300px;margin-bottom:20px;">
                          <img class="card-img-top" style="" src=${response.Poster} alt="poster">
                          <div class="card-body text-center">
                            <p class="card-text ">
                            <h5>${response.Title}</h5><br>
                            <div style="border-top:1px solid grey">Type : ${response.Type}</div><br>
                            <div style="border-top:1px solid grey">Production : ${response.Production}<br></div><br>
                            <div style="border-top:1px solid grey">Plot : ${response.Plot}<br></div><br>
                            <div style="border-top:1px solid grey">Year : ${response.Year}<br></div><br>
                            <div style="border-top:1px solid grey">Released : ${response.Released}<br></div><br>
                            <div style="border-top:1px solid grey">Imdb Rating : ${response.imdbRating}<br></div><br>
                            <div style="border-top:1px solid grey">Runtime : ${response.Runtime}<br></div><br>
                            <div style="border-top:1px solid grey">Genre : ${response.Genre}<br></div><br>
                            <div style="border-top:1px solid grey">Language : ${response.Language}<br></div><br>
                            <div style="border-top:1px solid grey">Actors : ${response.Actors}<br></div><br>
                            <div style="border-top:1px solid grey">ImdbId : ${response.imdbID}<br></div>
                            </p>
                          </div>
                        </div>
                      </div>
                  `;
                $('.class1').append(card);
                if (response.Poster == "N/A") {
                    console.log("N/A");
                    $('.card-img-top').attr("src", "poster.png");
                }
            }
        },
        error: (err) => {
            console.log(err);
        }
    })
});