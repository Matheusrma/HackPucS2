
angular.module('hackpuc', []);

angular.module('hackpuc').controller('MainCtrl', function () {
  var self = this;

  function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  var senderName = getParameterByName('name');

  this.shareName = '';
  this.isShared = false;

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
});

