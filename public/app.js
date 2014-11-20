
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

