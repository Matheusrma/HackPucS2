
angular.module('hackpuc', []);

angular.module('hackpuc').controller('MainCtrl', function ($http) {
  var self = this;

  function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  } 

  function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )
    {
      return 'iOS';
    }
    else if( userAgent.match( /Android/i ) )
    {
      return 'Android';
    }
    else
    {
      return 'unknown';
    }
  }

  $('#email-button').on('click', function() {
    console.log('acadca');
    ga('send', 'event', 'Share', 'Email');
  });

  if (getMobileOperatingSystem() != 'unknown') {
      $('#whats-app-share').show();
  }

  var senderName = getParameterByName('name');

  var infoPhrases = [
    'O câncer de próstata tem até 90% de chances de cura se diagnosticado precocemente.',
    '10% dos homens com mais de 50 anos têm câncer de próstata.',
    'Aos 75 anos, a probabilidade de ter câncer de próstata pode chegar a 50%.',
    '1 a cada 36 homens morrem de câncer de próstata',
    'Em 2014, 69.000 homens serão diagnosticados com câncer de próstata'
  ];

  self.infoText = infoPhrases[Math.floor(Math.random() * infoPhrases.length)];

  self.shareName = '';
  self.toShareEmail = '';

  self.isShared = false;
  self.isEmailInvalid = false;

  this.getSenderName = function(){
    return senderName || 'Um Amigo';
  }

  this.share = function(){
    self.isShared = true;
    self.shareLink = encodeURI(location.origin + '/?name=' + this.shareName);

    $('.fb-share-button').attr('data-href', self.shareLink);
  }

  this.isNameFalsy = function(){
    return this.shareName == false;
  }

  this.sendMail = function(){
    if (!validateEmail(self.toShareEmail)){
      self.isEmailInvalid = true;
      return;
    }

    self.isEmailInvalid = false;

    $http.post('/api/sendMail',
      {
        to : self.toShareEmail,
        name: self.shareName
      }).
      success(function(data, status, headers, config) {
        console.log('UHUL');
      }).
      error(function(data, status, headers, config) {
        console.log('SHIT');
      });
  }
});

