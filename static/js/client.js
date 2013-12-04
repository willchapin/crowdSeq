;(function(){

  var row = 10;
  var col = 10;
  var rowCls = "row";

  var buttonWidth = 20;
  var buttonHeight = 20;

  var count = 0; 
  var _interval = null;
  var intervalTime = 100;

  var _mouseDown = false;

  var freqs = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
  var buttons = document.getElementsByTagName("button");

  var ctx = new webkitAudioContext();    
  
  var requestAnimFrame = (function(){
    return window.requestAnimationFrame  || window.webkitRequestAnimationFrame 
      || window.mozRequestAnimationFrame || window.oRequestAnimationFrame      
      || window.msRequestAnimationFrame  || function(callback){
        window.setTimeout(callback, 1000 / 60);
      };
  })();

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


  var play = function (freq, dur) {
    var time = ctx.currentTime;
    var osc = ctx.createOscillator();
    osc.frequency.value = freq;
    osc.type = "triangle";
    osc.connect(ctx.destination);
    osc.start(time);
    osc.stop(time + dur);
  };


  var step = function(maxLen) {
    colorColumn((count + maxLen - 1) % maxLen, utils.removeClass);
    colorColumn(count, utils.addClass);
    playColumn(count);
    count = (count + 1) % maxLen;        
  };

  
  var bindButtonsClickHandler = function() {
    for (var i = 0, len = buttons.length; i < len; i++) {
      buttons[i].addEventListener("click", function(){
        utils.toggleClass(this, "on");
      }, false)
    }
  };

  var bindButtonsDragHandler = function(){
    for(var i=0, len=buttons.length; i<len; i++){
      buttons[i].addEventListener("mousemove", function(evt) {
        if(_mouseDown) {
          utils.addClass(this, "on");
        }
      }, false);
    }
  };

  var bindWindowEvents = function() {
    window.addEventListener('mousedown', function(evt){
      _mouseDown = true;
    }, false);

    window.addEventListener('mouseup', function(evt){
      _mouseDown = false;
    }, false);
  };

  var bindEventHandlers = function() {
    bindWindowEvents();
    bindButtonsClickHandler();
    bindButtonsDragHandler();
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
    bindEventHandlers();
  };

  var run = function() {  
    step(col);
    requestAnimFrame(run);
  };
  

  init();
  run();

})();
