$(document).ready(function(){

$('form').on('submit', function(e) { e.preventDefault(); });

$('.hidden-code').click(function(e) {
    e.preventDefault();
    $(this).children('.gist').slideToggle();
});

var originalText;
$('.example-grid').children().hover(
    function() {
        originalText = $(this).text();
        $(this).html($(this).width()+'px');
    },
    function() {
        $(this).html(originalText);
    }
);

$('#select-search-nearby').change(function(e){
  e.preventDefault();
  $('#closeCamps').children().hide();
  $('#closeCamps>div').filter(function(){
    return parseInt($('h4>a>div', this)[0].innerText.match(/(\d+.\d\d)\skm/)[1]) < parseInt($('#select-search-nearby').val());
  }).show();
});

searchNearby(100);

// find close to coordinates
function searchNearby(maxRadius) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
        NearestCities(position.coords.latitude, position.coords.longitude, maxRadius);
      });
    } else {
        // loc = "Geolocation is not supported by this browser.";
        NearestCities(38.8951, -77.0367, maxRadius);
    }
}

// Convert Degress to Radians
function Deg2Rad(deg) {
  return deg * Math.PI / 180;
}

function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
  lat1 = Deg2Rad(lat1);
  lat2 = Deg2Rad(lat2);
  lon1 = Deg2Rad(lon1);
  lon2 = Deg2Rad(lon2);
  var R = 6371; // km
  var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
  var y = (lat2 - lat1);
  var d = Math.sqrt(x * x + y * y) * R;
  return d;
}

var cities = [];
var cityNames = [];

$.getJSON('assets/json/campsitesfinal.json').then(function(data) {
    data.forEach(function(loc) {
      const coordString = loc.coordinates;
      let values = coordString.split(",");

      var lat = ConvertDMSToDD(parseFloat(values[0]));
      var lng = ConvertDMSToDD(parseFloat(values[1]));
      let coords = [loc.city, loc.state, loc.country, lat, lng];

      cities.push(coords);

      cityNames.push(
        (loc.city.length > 0 ? loc.city + ", " : "") +
        (loc.state.length > 0 ? loc.state + ", " : "") +
        loc.country
      );


  });
});

function ConvertDMSToDD(degrees) {
    var dd = degrees;

    // if (direction == "S" || direction == "W") {
    //     dd = dd * -1;
    // } // Don't do anything for N or E
    return dd;
}

function NearestCities(latitude, longitude, maxRadius) {
  var closest = [];

  for (index = 0; index < cities.length; ++index) {
    var dif = PythagorasEquirectangular(latitude, longitude, cities[index][3], cities[index][4]);
    if (dif < maxRadius) {
      closest.push({index:index, dist:dif});
    }
  }

  closest = closest.sort(function(a, b){
    return a.dist - b.dist;
  });

  $.getJSON('assets/json/campsitesfinal.json').then(function(data) {
    $('#search-nearby').show();
    for (let i = 0; i < closest.length; i++){
      let loc = data[closest[i].index];
      let img = loc.photoUrl || "https://s3.amazonaws.com/freecodecamp/bannercropped.png",
        city = loc.city,
        state = loc.state,
        country = loc.country,
        url = loc.url,
        coords = loc.coordinates;
      let location = '';

      location = (city.length > 0 ? city + ", " : "") +
        (state.length > 0 ? state + ", " : "") +
        country;

      $("#closeCamps").append(
        `
          <div class="alpha center">
            <h4>
              <a href="${url}" target="_blank">
                <img class="profile-image" src="${img}" alt="No Image">
                <div class="palette-pad">
                  ${location} - ${closest[i].dist.toFixed(2)} km
                  (${((closest[i].dist.toFixed(2))*0.621371).toFixed(2)} mi)
                </div>
              </a>
            </h4>
          </div>
        `
      );
     }
   });
}

//full list of locations
$.getJSON('assets/json/campsitesfinal.json').then(function(data) {

    data.forEach(function(loc) {
      const img = loc.photoUrl || "https://s3.amazonaws.com/freecodecamp/bannercropped.png",
        city = loc.city,
        state = loc.state,
        country = loc.country,
        url = loc.url;
        let location = '';

      location = (city.length > 0 ? city + ", " : "") +
        (state.length > 0 ? state + ", " : "") +
        country;

        $("#camps").append(
            `
              <li class="working">
                <div class="sixteen columns alpha">
                  <p>
                    <a class='city' href="${url}" target="_blank">
                      ${location}
                    </a>
                  </p>
                </div>
              </li>
            `
        );

    });
});
var typing_timer;
//search
$('#search').on('keyup', function () {
    var li = [];
    var valThis = this.value.toLowerCase();
    valThis = valThis.toLowerCase();
    valThis = valThis.replace(/\s+/g, '');

    var searchFunc = function(){
      $('.city').each(function() {
      var currentLiText = $(this).text(),
          showCurrentLi = ((currentLiText.toLowerCase()).replace(/\s+/g, '')).indexOf(valThis) !== -1;
        $(this).parent().parent().toggle(showCurrentLi);

        if(showCurrentLi==true){
          li.push(showCurrentLi);

        }
        setTimeout(function(){
          $('.loader').hide();
        }, 250);
    });
    var size = $('#camps').find('li').length;
    $("#res").html(li.length);
  }


    clearTimeout(this.typing_timer);

    this.typing_timer = setTimeout(searchFunc, 250)
    $('.loader').show();



});


// responsive 16x9 iframe - restricted by parent's width
var resizeIframe = function() {
    $('.responsive-iframe iframe').each(function(index, iframe) {
        var parentWidth = $(iframe).parent().width();
        $(iframe).width(parentWidth);
        $(iframe).height(parentWidth / 16 * 9);
    });
};
$(window).on('resize', resizeIframe);
resizeIframe();
});
