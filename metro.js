jQuery.easing.def = "easeInOutQuad";

var rameNb = 0;

function changePause(num) {
  $("#pause").attr("value", value.toString());
}

function getPause() {
  return parseInt($("#pause").attr("value"));
}

function setRameLeft() {
  var svgns = "http://www.w3.org/2000/svg";
  var rect = document.createElementNS(svgns, 'rect');
  var rameId = 'rame'+rameNb.toString();
  rameNb=rameNb+1;
  rect.setAttributeNS(null, 'x', '10');
  rect.setAttributeNS(null, 'y', '116');
  rect.setAttributeNS(null, 'height', '8');
  rect.setAttributeNS(null, 'width', '40');
  rect.setAttributeNS(null, 'fill', '#fff');
  rect.setAttributeNS(null, 'id', rameId);
  document.getElementById('line').appendChild(rect);

  startRameLeft(rameId);
}

function startRameLeft(rameId) {
  var danger = parseInt($("#pause").attr("value"));
    for (i = 0; i < 10; i++) {
        $("#"+rameId).animate(
          {'x': '175'}, 30000
        ).delay(10000);
        moveRameRight(rameId);
        moveRameRight(rameId);
        moveRameRight(rameId);
        moveRameRight(rameId);
        moveRameRight(rameId);
        moveRameRight(rameId);
        moveRameRight(rameId);
        moveRameRight(rameId);
        swipDirectionRight(rameId);
        $("#"+rameId).animate(
          {'x': '1135'}, 30000
        ).delay(10000);
        moveRameLeft(rameId);
        moveRameLeft(rameId);
        moveRameLeft(rameId);
        moveRameLeft(rameId);
        moveRameLeft(rameId);
        moveRameLeft(rameId);
        moveRameLeft(rameId);
        moveRameLeft(rameId);
        swipDirectionLeft(rameId);
    }
}

function moveRameLeft(rameId) {

  var danger = parseInt($("#pause").attr("value"));

  var startX = parseInt($("#"+rameId).css("x")) - 120;
  $("#"+rameId).animate(
    {'x': "-=120px"}, 30000
  ).delay(10000);
  return startX;
}

function moveRameRight(rameId) {

  var startX = parseInt($("#"+rameId).css("x")) + 120;
  $("#"+rameId).animate(
    {'x': "+=120px"}, 30000
  ).delay(10000);
}

function swipDirectionRight(rameId) {
  var startX = parseInt($("#"+rameId).css("x")) + 120;
  $("#"+rameId).animate(
    {'x': '1230'}, 30000, "easeInQuad", function(){
      $(this).css({
      "-webkit-transform" : "rotate(40deg)",
      "transform" : "rotate(40deg)",
      "-webkit-transform-origin" : "50% 50%",
      "transform-origin" : "50% 50%"
    });
  }).animate(
    {'x': '1290'}, 20000, "linear", function(){
      $(this).css({
      "-webkit-transform" : "rotate(0deg)",
      "transform" : "rotate(0deg)",
      "-webkit-transform-origin" : "50% 50%",
      "transform-origin" : "50% 50%",
      "x" : "1280",
      "y" : "156"
    });
  }).animate(
    {'x': '1340'}, 10000, "easeOutQuad"
  );
}

function swipDirectionLeft(rameId) {
  var startX = parseInt($("#"+rameId).css("x")) + 120;
  $("#"+rameId).animate(
    {'x': '130'}, 10000, "easeInQuad", function(){
      $(this).css({
      "-webkit-transform" : "rotate(220deg)",
      "transform" : "rotate(220deg)",
      "-webkit-transform-origin" : "50% 50%",
      "transform-origin" : "50% 50%"
    });
  }).animate(
    {'x': '190'}, 20000, "linear", function(){
      $(this).css({
      "-webkit-transform" : "rotate(0deg)",
      "transform" : "rotate(0deg)",
      "-webkit-transform-origin" : "50% 50%",
      "transform-origin" : "50% 50%",
      "x" : "80",
      "y" : "116"
    });
  }).animate(
    {'x': '10'}, 20000, "easeOutQuad"
  ).delay(10000);
}

function goBackAtelierLeft(rameId) {

}

function goBackAtelierRight(rameId) {
  /* pour plus tard */
}

function actionCommand(command) {
  if (command == "lancer rame") {
    setRameLeft();
  }

}

$('#request').on('keypress', function (e) {
     if(e.which === 13){
       actionCommand($(this).val());
       $(this).val("");
     }
});
