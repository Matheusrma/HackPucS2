
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

  var Environment = {};

  Environment.isMac = navigator.platform.toLowerCase().indexOf('mac') > -1;
  Environment.isChrome = navigator.userAgent.indexOf('Chrome') > -1;
  Environment.isSafari = navigator.userAgent.indexOf('Safari') > -1 
                         && navigator.userAgent.indexOf('Chrome') == -1;
  Environment.isIE = $.browser.msie;
  Environment.isFirefox = $.browser.mozilla;

  Environment.isiOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false);
  Environment.isAndroid = (navigator.userAgent.indexOf('android') > -1);

  var bodyClass;
  if (!(Environment.isiOS || Environment.isAndroid))
  {
      $('#whats-app-share').show();
  }

  var senderName = getParameterByName('name');

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

