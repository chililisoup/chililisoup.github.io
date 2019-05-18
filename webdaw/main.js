var endBoxHTML = "</table>";
var notes = 87;
var inputTimeSet = document.getElementById("timeSet");
var inputMeasureSet = document.getElementById("measureSet");
var boxWidth = 100;

function setupMidiEditor() {
  var boxHTML = "<table class='noteTable'>";
  var measures = inputMeasureSet.value;
  var time = inputTimeSet.value;
  
  
  for (var i = 0; i < notes; i++) {
    var noteName;
    
    //Add octave names, don't forget it goes A0, Bb0, B0, C1, etc
    
    var n = i;
    if (i > 11) {
      n = i - 12;
    }
    if (i > 23) {
      n = i - 24;
    }
    if (i > 35) {
      n = i - 36;
    }
    if (i > 47) {
      n = i - 48;
    }
    if (i > 59) {
      n = i - 60;
    }
    if (i > 71) {
      n = i - 72;
    }
    if (i > 83) {
      n = i - 84;
    }
    
    
    var noteAccidental = 0;
    if (n == 0) {
      noteName = "B";         
    } else if (n == 1) {
      noteName = "B";     
      noteAccidental = -1;      
    } else if (n == 2){
      noteName = "A";
    } else if (n == 3) {
      noteName = "A";
      noteAccidental = -1;   
    } else if (n == 4) {
      noteName = "G";         
    } else if (n == 5) {
      noteName = "F"; 
      noteAccidental = 1;
    } else if (n == 6) {
      noteName = "F";
    } else if (n == 7) {
      noteName = "E";         
    } else if (n == 8) {
      noteName = "E";
      noteAccidental = -1;   
    } else if (n == 9) {
      noteName = "D";         
    } else if (n == 10) {
      noteName = "C"; 
      noteAccidental = 1;   
    } else {
      noteName = "C";     
    }   
    
    
    var cellColor = "white";
    if (noteAccidental == -1) {
      noteAccidental = "&#9837;"
      cellColor = "silver";
    } else if (noteAccidental == 1) {
      noteAccidental = "&#9839;"
      cellColor = "silver";
    } else {
      noteAccidental = "";
    }
    
    
    boxHTML += "<tr><th class='noteVal' style='background: " + cellColor + ";'>" + noteName + noteAccidental + "</th>";
    for (var l = 0; l < time*measures; l++) {
      if (l % time === 0) {
        boxHTML += "<th class='boxes measureCell' style='background: " + cellColor + ";' onmousedown='switchCell(" + i + ", " + l + ")' id='cell_" + (i + 1) + "_" + (l + 1) + "'></th>";
      } else {
        boxHTML += "<th class='boxes' style='background: " + cellColor + ";' onmousedown='switchCell(" + i + ", " + l + ")' id='cell_" + (i + 1) + "_" + (l + 1) + "'></th>";
      }
    }
    boxHTML += "</tr>";
  }
  boxHTML += endBoxHTML;
  document.getElementById("noteArea").innerHTML = boxHTML;
  document.getElementById("noteArea").style.height = "750px";
  boxWidth = 100;
}


function switchCell(a, b) {
  var cellID = "cell_" + (a + 1) + "_" + (b + 1);
  if (document.getElementById(cellID).style.background == "white") {
    document.getElementById(cellID).style.background = "limegreen";
  } else if (document.getElementById(cellID).style.background == "silver") {
    document.getElementById(cellID).style.background = "green";
  } else if (document.getElementById(cellID).style.background == "green") {
    document.getElementById(cellID).style.background = "silver";
  } else {
    document.getElementById(cellID).style.background = "white";
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
