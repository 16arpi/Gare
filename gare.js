/*


	Arrivées :
	* Vous devez faire arriver des trains. Pour ça, vous devez vous référer à un train dans la colonne des arrivées.
	* Prenons "INTERCITE 1138 590 LE HAVRE"
	* INTERCITE est le type, 1138 est le numéro, 590 est à le moment de son arrivée, LE HAVRE est sa destination
	* Pour le faire arriver en gare, il faut choisir un quai de libre quand son moment d'arrivée arrivera.
	* Une fois le quai trouvé (prenons quai D), indiquer à l'ordi que vous vous l'y envoyer grâce à cette commande :
	* 1138 arriver D
	* normalement, une notification s'affiche
	* une fois le train arrivé, soit vous l'envoyez au hangar [1138 hangar] ou vous l'assigner à un train de départ.

	Quais (de haut en bas) :
	- D
	- C
	- B
	- A

	VARIABLES :
	- NUM :				-> Numéro du train
	- TYPE :			-> Type de train : INTERCITE, TGV et TER
	- TIME : 			-> « l'heure », c'est à dire la seconde selon l'horloge affichée

	COMMANDES :
	- NUM gare TYPE quai LETTRE	-> Amener un nouveau train à quai
	- NUM départ TIME		-> Lancer le départ d'un train (à partir de TIME sec)
	- NUM hangar			-> Envoyé un train arrivé au garage
	- NUM arriver LETTRE		-> Assigné un quai à un train qui arrive
	- NUM assigner numero NUM	-> Assigné à un train un nouveau numéro (utile pour s'adapter au planning)

*/

jQuery.easing.def = "easeInOutQuad";

var lignesQuai = [];
var villes = ["CAEN", "RENNES", "CHERBOURG", "LE HAVRE", "ROUEN RIVES DROITE", "SAINT-LO", "MANTES-LA-JOLIE"];
var tempsArriveeGare = 10000;
var messageId = 0;

/* TIME COUNTER */


$(document).ready(function(){
  var lastQuai = $("#quaiA").position();
  $("#incoming").css("top", lastQuai.top + 70);
  $("#incoming").css("left", lastQuai.left);

  $("#departure").css("top", lastQuai.top + 70);
  $("#departure").css("left", lastQuai.left + 600);
});

var incomeTime = [1, 30];
var departureTime = [1, 60, 120];

for (i = 0; i < 12; i++) {
  var nb =  Math.floor(Math.random() * (1800 + 1));
  if (nb != 0) {
    incomeTime.push(nb);
  }
}

for (i = 0; i < 12; i++) {
  var nb =  Math.floor(Math.random() * (1800 + 1));
  if (nb != 0) {
    departureTime.push(nb);
  }
}

console.log(incomeTime);
console.log(departureTime);

setTimeout(start, 0);

var i = 0;
var num = document.getElementById('time');

function start() {
  setInterval(increase, 1000);
}

function increase() {
    if (i < 1800) {
      i++;
      num.innerText = i;
      if (incomeTime.includes(i)) {
        setTrain(180000);
      }
      if (departureTime.includes(i)) {
        newDeparture(240000);
      }
    }
}

/* END TIME COUNTER */

function showMessage(text) {
  var types = "<font style=\"color:#8BC34A;\" >information</font> <font style=\"color:#FFEB3B;\" >attention</font> <font style=\"color:#F44336;\" >danger</font>";

  $("#message").append("<span id=\""+messageId+"\">"+text+"</span>");

  setTimeout(function(){
    $("#"+messageId).remove();
  }, 7000);
}

function addTrainQuaiList(data, position, type) {
  lignesQuai.push(data);
  $("#lignesQuaiList").append("<span class=\"rame-label\" onclick=\"selectRame('"+data[0]+"')\" id=\'t"+data[0]+"\' >"+data[2]+" N°"+data[0]+"</span>");
  var rame = $("#r"+data[0]).position();
  $("#t"+data[0]).css("top", rame.top + 12);
  $("#t"+data[0]).css("left", rame.left + 12);

  showMessage("<font style=\"color:#03A9F4;\" >arrivée</font> : le train <font style=\"color:#03A9F4;\" >"+quai[2]+"</font> <font style=\"color:#03A9F4;\" >n°"+data[0]+"</font> est arrivé en gare...");
}

function setTrain(wait) {
  var val = Math.floor(1000 + Math.random() * 9000);
  var svgns = "http://www.w3.org/2000/svg";
  var rect = document.createElementNS(svgns, 'rect');
  var rameId = val;


  rect.setAttributeNS(null, 'x', '2000');
  rect.setAttributeNS(null, 'y', '70');

  quai = "A";


  rect.setAttributeNS(null, 'height', '40');
  rect.setAttributeNS(null, 'width', '1200');
  rect.setAttributeNS(null, 'fill', '#ffffff');
  rect.setAttributeNS(null, 'id', "r"+rameId);
  document.getElementById('line').appendChild(rect);

  //assignRame(rameId);

  /* COTE HTML */

  var gareNb =  Math.floor(Math.random() * (6 + 1));
  console.log(gareNb);

  if (gareNb == 1) {
    var type = "TGV";
    var gare = villes[gareNb];
  }

  else if (gareNb == 6) {
    var type = "TER";
    var gare = villes[gareNb];
  }

  else {
    var type = "INTERCITE";
    var gare = villes[gareNb];
  }

  var data = [rameId, quai, type];

  var heure = Math.floor((wait + tempsArriveeGare)/1000) + parseInt($("#time").html());

  var cell = "<div onclick=\"selectRame('"+rameId+"')\" id=\"c"+rameId+"\" class=\"row\"><div class=\"type\" >"+type+"</div><div class=\"num\">"+rameId+"</div><div class=\"heure\">"+heure+"</div><div class=\"ville\">"+gare+"</div><div class=\"voie\">_</div></div>";

  $("#incoming").append(cell);

  showMessage("<font style=\"color:#03A9F4;\" >arrivée</font> : enregistrement du train <font style=\"color:#03A9F4;\" >"+type+"</font> <font style=\"color:#03A9F4;\" >n°"+rameId+"</font> en provenance de <font style=\"color:#03A9F4;\" >"+gare+"</font> - assignation à quai nécessaire");

  setTimeout(function(){
    $("#r"+rameId).animate(
      {'x': "-=1600px"}, tempsArriveeGare, function(){
        addTrainQuaiList(data);
        setTimeout(function(){
          $("#c"+rameId).css("display", "none");
        }, 10000);
      }
    );
  },wait);

}

function newDeparture(wait) {
  var val = Math.floor(1000 + Math.random() * 9000);
  var rameId = val;

  var gareNb =  Math.floor(Math.random() * (6 + 1));
  console.log(gareNb);

  if (gareNb == 1) {
    var type = "TGV";
    var gare = villes[gareNb];
  }

  else if (gareNb == 6) {
    var type = "TER";
    var gare = villes[gareNb];
  }

  else {
    var type = "INTERCITE";
    var gare = villes[gareNb];
  }

  var heure = Math.floor(wait/1000) + parseInt($("#time").html());

  var cell = "<div onclick=\"selectRame('"+rameId+"')\" id=\"d"+rameId+"\" class=\"row\"><div class=\"type\" >"+type+"</div><div class=\"num\">"+rameId+"</div><div class=\"heure\">"+heure+"</div><div class=\"ville\">"+gare+"</div><div class=\"voie\">_</div></div>";

  $("#departure").append(cell);

  showMessage("<font style=\"color:#03A9F4;\" >départ</font> : enregistrement du train <font style=\"color:#03A9F4;\" >"+type+"</font> <font style=\"color:#03A9F4;\" >n°"+rameId+"</font> à destination de <font style=\"color:#03A9F4;\" >"+gare+"</font>");

  setTimeout(function(){
    $("#d"+rameId).css("color", "#F47366");
  }, wait+60000);
}

function setNewTrain(num, type, quai) {
  if (num && quai && type) {

    if (type == "intercite" || type == "INTERCITE") {
      type = "INTERCITE";
    }

    else if (type == "tgv" || type == "TGV") {
      type = "TGV";
    }

    else if (type == "ter" || type == "TER") {
      type = "TER";
    }

    console.log($("#d"+num+" .type").html());
    console.log(type);
    if ($("#d"+num+" .type").html() == type) {

      var svgns = "http://www.w3.org/2000/svg";
      var rect = document.createElementNS(svgns, 'rect');
      var rameId = num;

      rect.setAttributeNS(null, 'x', '2000');

      if (quai == "D" || quai == "d") {
        rect.setAttributeNS(null, 'y', '70');
        quai = "D";
      }

      else if (quai == "C" || quai == "c") {
        rect.setAttributeNS(null, 'y', '120');
        quai = "C";
      }

      else if (quai == "B" || quai == "b") {
        rect.setAttributeNS(null, 'y', '260');
        quai = "B";
      }

      else if (quai == "A" || quai == "a") {
        rect.setAttributeNS(null, 'y', '310');
        quai = "A";
      }

      else {
        rect.setAttributeNS(null, 'y', '70');
        quai = "A";
      }

      var data = [rameId, quai, type];

      rect.setAttributeNS(null, 'height', '40');
      rect.setAttributeNS(null, 'width', '1200');
      rect.setAttributeNS(null, 'fill', '#ffffff');
      rect.setAttributeNS(null, 'id', "r"+rameId);
      document.getElementById('line').appendChild(rect);

      //assignRame(rameId);

      setTimeout(function(){
        $("#d"+rameId+" .voie").html(quai);
      }, 1000);


      setTimeout(function(){
        $("#r"+rameId).animate(
          {'x': '-=1600px'}, tempsArriveeGare, function(){
            addTrainQuaiList(data);
          }
        );
      },5000);

    }

    else {
      showMessage("<font style=\"color:#FFEB3B;\" >attention</font> : le type de rame ne correspond pas...");
    }
  }

  else {
    showMessage("<font style=\"color:#FFEB3B;\" >attention</font> : quai, numéro et type de rame nécessaires...");
  }
}

function changeRameId(num, newid) {
  var quai = $("#c"+num+" .voie").html();
  var type = $("#c"+num+" .type").html();
  var label = type+" N°"+newid;
  $("#t"+num).html(label);
  $("#t"+num).attr("id", "t"+newid);
  $("#r"+num).attr("id", "r"+newid);
  $("#d"+newid+" .voie").html(quai);
  console.log(num);
  console.log(newid);

  showMessage("<font style=\"#4CAF50\" >information</font> : le train "+type+" n°"+num+" prend le n°"+newid);
}

function goTrain(num, delai) {
  var attente = parseInt(delai) - parseInt($("#time").html());
  console.log(attente);
  if ($("#r"+num).length) {
    setTimeout(function(){
      $("#r"+num).animate(
        {'x': "+=3000px"}, 30000
      );
      $("#t"+num).remove();
      setTimeout(function(){
        $("#d"+num).remove();
      },40000);
    }, attente*1000);
    $("#d"+num).css("background", "#fff");
    $("#d"+num).css("color", "#000");
  }
  else {
    showMessage("erreur : aucun train de ce numéro trouvé...");
  }
}

function setQuaiTrain(num, quai) {
  if (!$("t"+num).length) {
    if (quai == "D" || quai == "d") {
      $("#r"+num).animate(
        {'y': '70'}, 1000
      );
      quai = "D";
    }

    else if (quai == "C" || quai == "c") {
      $("#r"+num).animate(
        {'y': '120'}, 1000
      );
      quai = "C";
    }

    else if (quai == "B" || quai == "b") {
      $("#r"+num).animate(
        {'y': '260'}, 1000
      );
      quai = "B";
    }

    else if (quai == "A" || quai == "a") {
      $("#r"+num).animate(
        {'y': '310'}, 1000
      );
      quai = "A";
    }

    $("#c"+num+" .voie").html(quai);
  }
}

function actionCommand(command) {
  if (command.includes("gare") && command.includes("quai")) {
    var quai = command.split(" ");
    setNewTrain(quai[0], quai[2], quai[4]);
  }
  if (command.includes("départ")) {
    var num = command.split(" ");
    goTrain(num[0], num[2]);
  }
  if (command.includes("hangar")) {
    var num = command.split(" ");
    goTrain(num[0]);
  }
  if (command.includes("arriver")) {
    var data = command.split(" ");
    setQuaiTrain(data[0], data[2]);
  }
  if (command.includes("assigner") && command.includes("numero")) {
    var data = command.split(" ");
    changeRameId(data[0], data[3]);
  }
}

$('#request').on('keypress', function (e) {
     if(e.which === 13){
       actionCommand($(this).val());
       $(this).val("");
     }
});

/* PROGRAMMES POSSIBLES */
showMessage("<font style=\"color:#8BC34A;\" >Bienvenue Gare Saint-Lazare !</font>");

function assignRame(num) {
  $("#train-img").append("<span id=\"s"+num+"\" > </span>");
  var trainPosition = $("#r"+num).position();
  $("#s"+num).css({top: trainPosition.top+'px', left: trainPosition.left+'px'});
}

function selectRame(rameId) {
  $("#request").val(rameId+" ");
  $("#request").focus();
}
