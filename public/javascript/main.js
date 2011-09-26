    var client = new function() {
      var _poll1 = function() {
        $.get('/jsupdate1', function(res) {
          $('div#output1').text(res);
          _poll1();
        });
      }
      
      $.get('/jsstatus1', function(res) {
        $('div#output1').text(res);
        _poll1();
      });

      var _poll2 = function() {
        $.get('/jsupdate2', function(res) {
          $('div#output2').text(res);
          _poll2();
        });
      }
      
      $.get('/jsstatus2', function(res) {
        $('div#output2').text(res);
        _poll2();
      });

      var _poll3 = function() {
        $.get('/jsupdate3', function(res) {
          $('div#output3').text(res);
          _poll3();
        });
      }
      
      $.get('/jsstatus3', function(res) {
        $('div#output3').text(res);
        _poll3();
      });
    }