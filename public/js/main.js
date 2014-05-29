similarArtists = (function() {
  'use strict';

  var urlParts = {
    api_key: 'O9UIRTMSDSUPAAVGD',
    id: '',
    format: 'json',
    results: '10',
    start: '0',
    bucket: 'id:spotify-WW',
  };

  var buildUrl = function(urlParts) {
    var finalUrl = 'http://developer.echonest.com/api/v4/artist/similar?';
    for (var key in urlParts) {
      if (urlParts.hasOwnProperty(key)) {
        var urlPart = key + '=' + urlParts[key] + '&';
        finalUrl += urlPart;
      }
    }
    return finalUrl;
  }

  var beautify = function(json) {
    var innerHtml = '<ol>'
    var artists = json.response.artists;
    Array.prototype.forEach.call(artists, function(el, i) {
      var artistName = el.name;
      var artistUri = el.foreign_ids[0].foreign_id.replace('spotify-WW', '');
      var artistUrl = 'http://open.spotify.com' + artistUri.replace(/:/g, '/');
      innerHtml += '<li class="artist-element"><a href="' + artistUrl + '" target="_blank">' + artistName + '</a></li>'
    })
    innerHtml += '</ol>'
    return innerHtml
  }

  var echoNestAjax = function() {
    urlParts.id = document.getElementById('spotify-uri-input').value.replace('spotify', 'spotify-WW')

    var request = new XMLHttpRequest();
    request.open('GET', buildUrl(urlParts), true);

    request.onreadystatechange = function() {
      if (request.readyState == 4 ) {
        if (request.status >= 200 && request.status < 400) {
          document.getElementById('result-list').innerHTML = beautify(JSON.parse(request.responseText));
        }
        else {
          document.getElementById('result-list').innerHTML = 'error';
        }
      }
    }

    request.onerror = function() {
      document.getElementById('result-list').innerHTML = 'connection error';
    };

    request.send();
    
  }

  return {
    echoNestAjax: echoNestAjax
  }

})();
