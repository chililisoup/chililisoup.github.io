var endBoxHTML = "</table>";
var notes = 24;
var noteColor = "rgb(135, 232, 111)";
var inputTimeSet = document.getElementById("timeSet");
var inputMeasureSet = document.getElementById("measureSet");
var boxWidth = 100;

function setupMidiEditor() {
  var boxHTML = "<table class='noteTable'>";
  var measures = inputMeasureSet.value;
  var time = inputTimeSet.value;
  
  for (var i = 0; i < notes; i++) {
    boxHTML += "<tr><th class='noteVal'>" + (i + 1) + "</th>";
    for (var l = 0; l < time*measures; l++) {
      if (l % time === 0) {
        boxHTML += "<th class='boxes measureCell' onmousedown='switchCell(" + i + ", " + l + ")' id='cell_" + (i + 1) + "_" + (l + 1) + "'></th>";
      } else {
        boxHTML += "<th class='boxes' onmousedown='switchCell(" + i + ", " + l + ")' id='cell_" + (i + 1) + "_" + (l + 1) + "'></th>";
      }
    }
    boxHTML += "</tr>";
  }
  boxHTML += endBoxHTML;
  document.getElementById("noteArea").innerHTML = boxHTML;
  boxWidth = 100;
}


function switchCell(a, b) {
  var cellID = "cell_" + (a + 1) + "_" + (b + 1);
  if (document.getElementById(cellID).style.background == noteColor) {
    document.getElementById(cellID).style.background = "white";
  } else {
    document.getElementById(cellID).style.background = noteColor;
  }
}

function zoom(n) {
  boxWidth += n;
  if (boxWidth == 0) {
    boxWidth = 10;
  }
  if (boxWidth == 260) {
    boxWidth = 250;
  }
  var x = document.getElementsByClassName('boxes');
  for(var i=0; i< x.length;i++){
    x[i].style.width = boxWidth + "px";
  }
}
