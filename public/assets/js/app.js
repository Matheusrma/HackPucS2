
angular.module('hackpuc', ['ngTagsInput']);

angular.module('hackpuc').controller('MainCtrl', function ($http) {
  var self = this;

  var init = function(){

    self.infoText = infoPhrases[Math.floor(Math.random() * infoPhrases.length)];

    self.toShareEmail = '';
    self.isEmailInvalid = false;
    
    self.emailList = [];

    if (getMobileOperatingSystem() != 'unknown') {
        $('#whats-app-share').show();
        $('#social-networks').css('width', '340px');
    }

    startTimeline($('#happy-finger'), $('#content'));
  }

  var infoPhrases = [
    'O câncer de próstata tem até 90% de chances de cura se diagnosticado precocemente.',
    '10% dos homens com mais de 50 anos têm câncer de próstata.',
    'Aos 75 anos, a probabilidade de ter câncer de próstata pode chegar a 50%.',
    '1 a cada 36 homens morrem de câncer de próstata',
    'Em 2014, 69.000 homens serão diagnosticados com câncer de próstata'
  ];

  //PUBLIC INTERFACE

  this.share = function(){
    self.isShared = true;
    self.shareLink = encodeURI(location.origin + '/?name=' + this.shareName);

    $('.fb-share-button').attr('data-href', self.shareLink);
  }

  this.isNameFalsy = function(){
    return this.shareName == false;
  }

  this.sendMail = function(){
    for(var i = 0; i < self.emailList.length; ++i) {
      var email = self.emailList[i];
      if (!validateEmail(email.text)){
        self.isEmailInvalid = true;
        return;
      }  
    }

    self.isEmailInvalid = false;

    var mappedEmailList = self.emailList.map(function(email){
      return email.text;
    }); 

    $http.post('/api/sendMail',
      {
        to : mappedEmailList,
        name: 'Um amigo'
      }).
      success(function(data, status, headers, config) {
        console.log('UHUL');
      }).
      error(function(data, status, headers, config) {
        console.log('SHIT');
      });

    $('#email-modal').modal('toggle');
  }

  //PRIVATE FUNCTIONS

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

    if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ) {
      return 'iOS';
    }
    
    if( userAgent.match( /Android/i ) ) {
      return 'Android';
    }
    
    return 'unknown';
  }

  function startTimeline(hand, content) {
    
    var screenHeight = window.innerHeight;

    $.playSound('assets/sound/love2');

    hand.css('top', screenHeight);
    content.css('opacity', 0);

    TweenLite.to(hand, 1.5, {top:screenHeight * 0.88, onComplete:function(){
      TweenLite.to(hand, 0.3, {top:screenHeight * 0.9, onComplete:function(){
        TweenLite.to(hand, 1.2, {top:screenHeight * 0.25, onComplete:function(){
          TweenLite.to(content, 1, {opacity:1, onComplete:function(){

          }});    
        }});
      }});
    }});
  }


  init();
});

