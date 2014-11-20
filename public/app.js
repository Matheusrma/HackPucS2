
angular.module('hackpuc', []);

angular.module('hackpuc').controller('MainCtrl', function () {
  var self = this;

  function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  ZeroClipboard.config( { swfPath: "./lib/ZeroClipboard.swf" } );
  
  var client = new ZeroClipboard('my-button_text');
  client.on( 'load', function(client) {

    console.log('dvdsvsavasv');

    client.on( 'datarequested', function(client) {
      var text = $('#copy_this_text').text();
      client.setText(text);
    });

    // callback triggered on successful copying
    client.on( 'complete', function(client, args) {
      console.log("Text copied to clipboard: \n" + args.text );
    });
  });

  // In case of error - such as Flash not being available
  client.on( 'wrongflash noflash', function() {
    console.log('error');
    ZeroClipboard.destroy();
  } );
  
  this.senderName = getParameterByName('name');

  this.shareName = '';
  this.isShared = false;

  this.share = function(){
    self.isShared = true;
    this.shareLink = 'file:///Users/matheusrma/Documents/projects/web/HackPucS2/index.html?name=' 
                      + this.shareName;

    client.setText(this.shareLink);
  }

  this.getShareLink = function(){
    return this.shareLink;
  }
});

