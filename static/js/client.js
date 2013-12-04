;(function(){
    var ctx = new webkitAudioContext();    
    var count = 0;
    var MAX_LEN = 8;
    var interval = 100;

    var freqs = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];

    var buttons = document.getElementsByTagName("button");

    var colorColumn = function(index, func) {
        var el = null;
        var rows = document.getElementsByClassName("row");

        for (var i = 0, len = rows.length; i < len; i++) {
            el = rows[i].getElementsByTagName('button')[index];
            func(el, "playing");
        }
    };

    var playColumn = function(index) {
        var el = null;
        var rows = document.getElementsByClassName("row");

        for (var i = 0, len = rows.length; i < len; i++) {
            el = rows[i].getElementsByTagName('button')[index];
            if (utils.hasClass(el, "on")) {
                play(freqs[i], interval/1000);
            }
        }
    };


    var toggle = function(e) {
        console.log('in here');        
        if (utils.hasClass(this, "on")) {
            utils.removeClass(this, "on");
        } else {
            utils.addClass(this, "on");
        }
    }

    var play = function (freq, dur) {
        time = ctx.currentTime;
        osc = ctx.createOscillator();
        osc.frequency.value = freq;
        osc.type = "triangle";
        osc.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + dur);
    }



    var step = function() {
        colorColumn((count + MAX_LEN - 1) % MAX_LEN, utils.removeClass);
        colorColumn(count, utils.addClass);
        playColumn(count);
        count = (count + 1) % 8;        
    };


    for (var i = 0, len = buttons.length; i < len; i++) {
        buttons[i].addEventListener("click", toggle)
    }


    setInterval(function() {
        step();
    }, interval);
    
    step();

})();
