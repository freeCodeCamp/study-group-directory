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
// find close to coordinates

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(UserLocation);

    } else {
        // loc = "Geolocation is not supported by this browser.";
        NearestCity(38.8951, -77.0367);
    }
}
getLocation();

// Callback function for asynchronous call to HTML5 geolocation
function UserLocation(position) {
  NearestCity(position.coords.latitude, position.coords.longitude);
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

$.getJSON('assets/json/locations.json').then(function(data) {
    data.forEach(function(loc) {
      const coordString = loc.coordinates;
      let values = coordString.split(" ");

      var lat = ConvertDMSToDD(parseFloat(values[0]), values[1]);
      var lng = ConvertDMSToDD(parseFloat(values[2]), values[3]);
      let coords = [loc.city, loc.state, loc.country, lat, lng];

      cities.push(coords);
      cityNames.push(loc.city);

  });
});

function ConvertDMSToDD(degrees, direction) {
    var dd = degrees;

    if (direction == "S" || direction == "W") {
        dd = dd * -1;
    } // Don't do anything for N or E
    return dd;
}

function NearestCity(latitude, longitude) {
  var mindif = 99999;
  var closest;

  for (index = 0; index < cities.length; ++index) {
    var dif = PythagorasEquirectangular(latitude, longitude, cities[index][3], cities[index][4]);
    if (dif < mindif) {
      closest = index;
      mindif = dif;
    }
  }

  $.getJSON('assets/json/locations.json').then(function(data) {
      data.forEach(function(loc) {
        const img = loc.photo,
          city = loc.city,
          url = loc.url,
          coords = loc.coordinates;
          if (city == cities[closest][0]){
          $("#closeCamps").append(
              `
                <li>
                  <div class="four columns alpha">
                      <img class="profile-image" src="${img}">
                      <div class="palette-pad">
                          <h4>${city}</h4>
                          <a href="${url}" target="_blank">
                              <h5>Facebook Page</h5>
                          </a>
                      </div>
                  </div>
                </li>
              `
          );
        }
      });

  });
}
//full list of locations
$.getJSON('assets/json/locations.json').then(function(data) {
    data.forEach(function(loc) {
      const img = loc.photo,
        city = loc.city,
        url = loc.url;

        $("#camps").append(
            `
              <li>
                <div class="four columns alpha">
                    <img class="profile-image" src="${img}">
                    <div class="palette-pad">
                        <h4 class='city'>${city}</h4>
                        <a href="${url}" target="_blank">
                            <h5>Facebook Page</h5>
                        </a>
                    </div>
                </div>
              </li>
            `
        )
    })
});


//search
$('#search').keyup(function () {
    var valThis = this.value.toLowerCase();
    valThis = valThis.toLowerCase();
    //     // length  = this.value.length;
    valThis = valThis.replace(/\s+/g, '');


    $('.city').each(function() {
      var currentLiText = $(this).text(),
          showCurrentLi = ((currentLiText.toLowerCase()).replace(/\s+/g, '')).indexOf(valThis) !== -1;
        $(this).parent().parent().toggle(showCurrentLi);
    });

    // $('#camps>li h4').each(function () {
    //     var text  = $(this).text(),
    //         textL = text.toLowerCase(),
    //         textL = textL.replace(/\s+/g, ''),
    //         htmlR = '<b>' + text.substr(0, length) + '</b>' + text.substr(length);
    //     (textL.indexOf(valThis) == 0) ? $(this).html(htmlR).parent().parent().parent().show() : $(this).parent().parent().parent().hide();
    // });

});


$('#search').autocomplete({

  source: cityNames

  });



function showPosition(position) {
    loc = "Latitude: " + position.coords.latitude +
    " Longitude: " + position.coords.longitude;
      console.log(loc);
}

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

// Twitter timeline
!function(d,s,id){
    var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
    if(!d.getElementById(id)){
        js=d.createElement(s);js.id=id;
        js.src=p+"://platform.twitter.com/widgets.js";
        js.setAttribute('onload', "twttr.events.bind('rendered',function(e) {responsiveTwitterWidget()});");
        fjs.parentNode.insertBefore(js,fjs);
    }
}(document,"script","twitter-wjs");


//sticky navigation
// +(function() {
//
//     // Selectors
//     var sidebar = document.querySelector('.sidebar');
//     var content = document.querySelector('.content');
//
//     // Constants
//     var SIDEBAR_DISTANCE_TOP = sidebar.getBoundingClientRect().top + document.body.scrollTop - 50;
//     var WIDTH_BRAKE_POINT = 767;
//
//     // Global varialbes
//     var distanceTop = document.body.scrollTop;
//     var browserWidth = window.innerWidth || document.body.clientWidth;
//
//     window.addEventListener('resize', function(){
//         browserWidth = window.innerWidth || document.body.clientWidth;
//         doStick();
//     });
//
//     window.addEventListener("scroll", function() {
//         distanceTop = document.body.scrollTop;
//         doStick();
//     });
//
//     function doStick() {
//         if (isStickable()) {
//             SIDEBAR_DISTANCE_TOP < distanceTop ? stick() : unStick();
//         } else {
//             unStick();
//         }
//     }
//
//     function stick() {
//         sidebar.classList.add('stick');
//         content.classList.add('offset-by-four');
//     }
//
//     function unStick() {
//         sidebar.classList.remove('stick')
//         content.classList.remove('offset-by-four')
//     }
//
//     function isStickable() {
//         return browserWidth > WIDTH_BRAKE_POINT;
//     }
//
// })()
