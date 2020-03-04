document.addEventListener("keyup", keyUpHandler, false);
function keyUpHandler() {
    var input = document.getElementById("input").value.replace(/(?:\r\n|\r|\n)/g, '¶');
    input = input.split('');
	for (i = 0; i < input.length; i++) { if (input[i] == "!") { if (Math.random() > 0.8) { input[i] = "1"; }}}
	input = input.join("");
	input = input.replace(/l/g, "w");
	input = input.replace(/L/g, "W");
	input = input.replace(/r/g, "w");
	input = input.replace(/R/g, "W");
	input = input.replace(/uu/g, "uwu");
	input = input.replace(/Uu/g, "Uwu");
	input = input.replace(/uU/g, "uwU");
	input = input.replace(/UU/g, "UwU");
	input = input.replace(/¶/g, "<br>");
	document.getElementById("output").innerHTML = input + " uwu";
}
function clearBoxes() { document.getElementById("input").value = ""; document.getElementById("output").innerHTML = ""; }
