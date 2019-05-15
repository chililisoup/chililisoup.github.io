var boxHTML = "<table>";
var endBoxHTML = "</table>";
var notes = 24;
var measures = 4;
var time = 4;
var noteColor = "rgb(135, 232, 111)";

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


function switchCell(a, b) {
  var cellID = "cell_" + (a + 1) + "_" + (b + 1);
  if (document.getElementById(cellID).style.background == noteColor) {
    document.getElementById(cellID).style.background = "white";
  } else {
    document.getElementById(cellID).style.background = noteColor;
  }
}