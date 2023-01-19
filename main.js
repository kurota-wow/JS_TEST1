'use strict';
$(document).ready(function(){
  let startTime;
  let elapsedTime = 0;
  let timeoutId;

  function countUp() {
    const d = new Date(Date.now() - startTime + elapsedTime);
    const h = d.getHours() - 9;
    const m = d.getMinutes();
    const s = d.getSeconds();
    const ms = Math.floor(d.getMilliseconds()/100);
    $('#timer').text(`${h}:${m}:${s}:${ms}`);

    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }
  function stateInitial(){
    $("#start").prop("disabled", false);
    $('#stop').prop("disabled", true);
    $('#reset').prop("disabled", true);
  }
  function stateRunning(){
    $("#start").prop("disabled", true);
    $('#stop').prop("disabled", false);
    $('#reset').prop("disabled", true);
  }
  function stateStopped(){
    $("#start").prop("disabled", false);
    $('#stop').prop("disabled", true);
    $('#reset').prop("disabled", false);
  }

  stateInitial();

  $('#start').click(() => {
    stateRunning();
    startTime = Date.now();
    countUp();
  });
  $('#stop').click(() => {
    stateStopped();
    clearTimeout(timeoutId);
    elapsedTime += Date.now() - startTime;
  });
  $('#reset').click(() => {
    stateInitial();
    $('#timer').text('0:0:0:0');
    elapsedTime = 0;
  });
});
