
angular.module('hackpuc', []);

angular.module('hackpuc').controller('MainCtrl', function () {
  var self = this;

  function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  this.senderName = getParameterByName('name');

  this.shareName = '';
  this.isShared = false;

  this.share = function(){
    self.isShared = true;
    this.shareLink = encodeURI(location.origin + '/?name=' + this.shareName);
  }

  this.isNameFalsy = function(){
    return this.shareName == false;
  }
});

