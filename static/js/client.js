;(function(){

  var row = 8;
  var col = 32;


  var buttonWidth = 20;
  var buttonHeight = 20;


  var ctx = new webkitAudioContext();    
  var count = 0;
 
  var _interval = null;
  var intervalTime = 100;

  var freqs = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
  var buttons = document.getElementsByTagName("button");

  var rowCls = "row";

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
        play(freqs[i], intervalTime/1000);
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


  var step = function(maxLen) {
    colorColumn((count + maxLen - 1) % maxLen, utils.removeClass);
    colorColumn(count, utils.addClass);
    playColumn(count);
    count = (count + 1) % maxLen;        
  };

  
  var bindButtonsClickHandler = function() {
    for (var i = 0, len = buttons.length; i < len; i++) {
      buttons[i].addEventListener("click", toggle)
    }
  };


  var createButtons = function(row, col) {
    var wrapperEl = document.getElementById("wrapper");
    var rowEl = null;
    var buttonEl = null;
    
    for(var i=0, i_len=row; i<i_len; i++) {      
      rowEl = document.createElement("DIV");
      rowEl.className = rowCls;

      for(var j=0, j_len=col; j<j_len; j++) {
        buttonEl = document.createElement("BUTTON");
        buttonEl.type = "button";
        
        buttonEl.style.width = buttonWidth + 'px';
        buttonEl.style.height = buttonHeight + 'px';
        rowEl.appendChild(buttonEl);
      }
      
      wrapperEl.appendChild(rowEl);
    }
  };

  var init = function(){
    createButtons(row, col);
    bindButtonsClickHandler();
  };

  var run = function() {  
    _interval = setInterval(function() {
      step(col);
    }, intervalTime);
    
    step(col);
  };
  

  init();
  run();

})();
