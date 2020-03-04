var mode = 1,
	output = document.getElementById("output").innerHTML;
document.addEventListener("keyup", keyUpHandler, false);
function keyUpHandler() {
    encode();
}
	
function encode() {
    var input = document.getElementById("input").value;
	if (mode == 1) {
		output = input;
		output = output.replace(/,/g, '‚');
		output = output.replace(/\//g, '∕');
		output = output.replace(/-/g, '–');
		output = output.replace(/\./g, '․');
		output = output.replace(/a/gi, '.,');
		output = output.replace(/b/gi, '..,');
		output = output.replace(/c/gi, '...,');
		output = output.replace(/d/gi, '....,');
		output = output.replace(/e/gi, '-,');
		output = output.replace(/f/gi, '-.,');
		output = output.replace(/g/gi, '-..,');
		output = output.replace(/h/gi, '-...,');
		output = output.replace(/i/gi, '-....,');
		output = output.replace(/j/gi, '/,');
		output = output.replace(/k/gi, '/.,');
		output = output.replace(/l/gi, '/..,');
		output = output.replace(/m/gi, '/...,');
		output = output.replace(/n/gi, '/....,');
		output = output.replace(/o/gi, '/-,');
		output = output.replace(/p/gi, '/-.,');
		output = output.replace(/q/gi, '/-..,');
		output = output.replace(/r/gi, '/-...,');
		output = output.replace(/s/gi, '/-....,');
		output = output.replace(/t/gi, '//,');
		output = output.replace(/u/gi, '//.,');
		output = output.replace(/v/gi, '//..,');
		output = output.replace(/w/gi, '//...,');
		output = output.replace(/x/gi, '//....,');
		output = output.replace(/y/gi, '//-,');
		output = output.replace(/z/gi, '//-.,');
		
		output = output.replace(/ /g, '<br>');
		output = output.replace(/\n/g, '<br><br>');
	} else {
		output = input;
		var oldText = output;
		output = output.replace(/\n\n/g, '<br>');
		output = output.replace('//-.,', 'z');
        output = output.replace('//-,', 'y');
        output = output.replace('//....,', 'x');
        output = output.replace('//...,', 'w');
        output = output.replace('//..,', 'v');
        output = output.replace('//.,', 'u');
        output = output.replace('//,', 't');
        output = output.replace('/-....,', 's');
    	output = output.replace('/-...,', 'r');
    	output = output.replace('/-..,', 'q');
    	output = output.replace('/-.,', 'p');
       	output = output.replace('/-,', 'o');
       	output = output.replace('/....,', 'n');
       	output = output.replace('/...,', 'm');
       	output = output.replace('/..,', 'l');
    	output = output.replace('/.,', 'k');
       	output = output.replace('/,', 'j');
    	output = output.replace('-....,', 'i');
        output = output.replace('-...,', 'h');
        output = output.replace('-..,', 'g');
        output = output.replace('-.,', 'f');
        output = output.replace('-,', 'e');
        output = output.replace('....,', 'd');
        output = output.replace('...,', 'c');
        output = output.replace('..,', 'b');
        output = output.replace('.,', 'a');
		//Loss prevention thingy \/
		output = output.replace('//-a', 'z');
		output = output.replace('//f', 'z');
		output = output.replace('/p', 'z');
		output = output.replace('//e', 'y');
		output = output.replace('/o', 'y');
		output = output.replace('//...a', 'x');
		output = output.replace('//..a', 'w');
		output = output.replace('//.a', 'v');
		output = output.replace('//a', 'u');
		output = output.replace('//..b', 'x');
		output = output.replace('//.b', 'w');
		output = output.replace('//b', 'v');
		output = output.replace('//.c', 'x');
		output = output.replace('//c', 'w');
		output = output.replace('//d', 'x');
		output = output.replace('/n', 'x');
		output = output.replace('/m', 'w');
		output = output.replace('/l', 'v');
		output = output.replace('/k', 'u');
		output = output.replace('/j', 't');
		output = output.replace('/e', 'o');
		output = output.replace('/f', 'p');
		output = output.replace('/g', 'q');
		output = output.replace('/h', 'r');
		output = output.replace('/i', 's');
		output = output.replace('/-...a', 's');
		output = output.replace('/-..a', 'r');
		output = output.replace('/-.a', 'q');
		output = output.replace('/-a', 'p');
		output = output.replace('/-..b', 's');
		output = output.replace('/-.b', 'r');
		output = output.replace('/-b', 'q');
		output = output.replace('/-.c', 's');
		output = output.replace('/-c', 'r');
		output = output.replace('/-d', 's');
		output = output.replace('/...a', 'n');
		output = output.replace('/..a', 'm');
		output = output.replace('/.a', 'l');
		output = output.replace('/a', 'k');
		output = output.replace('/..b', 'n');
		output = output.replace('/.b', 'm');
		output = output.replace('/b', 'l');
		output = output.replace('/.c', 'n');
		output = output.replace('/c', 'm');
		output = output.replace('/d', 'n');
		output = output.replace('-...a', 'i');
		output = output.replace('-..a', 'h');
		output = output.replace('-.a', 'g');
		output = output.replace('-a', 'f');
		output = output.replace('-..b', 'i');
		output = output.replace('-.b', 'h');
		output = output.replace('-b', 'g');
		output = output.replace('-.c', 'i');
		output = output.replace('-c', 'h');
		output = output.replace('-d', 'i');
		output = output.replace('...a', 'd');
		output = output.replace('..a', 'c');
		output = output.replace('.a', 'b');
		output = output.replace('..b', 'd');
		output = output.replace('.b', 'c');
		output = output.replace('.c', 'd');
		
		var newText = output;
		if (oldText !== newText) {
			decodeAgain();	
		}
	}
}
function decodeAgain() {
	var oldText = output;
	output = output.replace('//-.,', 'z');
    output = output.replace('//-,', 'y');
    output = output.replace('//....,', 'x');
    output = output.replace('//...,', 'w');
    output = output.replace('//..,', 'v');
   	output = output.replace('//.,', 'u');
    output = output.replace('//,', 't');
   	output = output.replace('/-....,', 's');
   	output = output.replace('/-...,', 'r');
    output = output.replace('/-..,', 'q');
    output = output.replace('/-.,', 'p');
    output = output.replace('/-,', 'o');
    output = output.replace('/....,', 'n');
    output = output.replace('/...,', 'm');
    output = output.replace('/..,', 'l');
    output = output.replace('/.,', 'k');
    output = output.replace('/,', 'j');
    output = output.replace('-....,', 'i');
    output = output.replace('-...,', 'h');
    output = output.replace('-..,', 'g');
    output = output.replace('-.,', 'f');
    output = output.replace('-,', 'e');
    output = output.replace('....,', 'd');
    output = output.replace('...,', 'c');
    output = output.replace('..,', 'b');
    output = output.replace('.,', 'a');
		
	output = output.replace('//-a', 'z');
	output = output.replace('//f', 'z');
	output = output.replace('/p', 'z');
	output = output.replace('//e', 'y');
	output = output.replace('/o', 'y');
	output = output.replace('//...a', 'x');
	output = output.replace('//..a', 'w');
	output = output.replace('//.a', 'v');
	output = output.replace('//a', 'u');
	output = output.replace('//..b', 'x');
	output = output.replace('//.b', 'w');
	output = output.replace('//b', 'v');
	output = output.replace('//.c', 'x');
	output = output.replace('//c', 'w');
	output = output.replace('//d', 'x');
	output = output.replace('/n', 'x');
	output = output.replace('/m', 'w');
	output = output.replace('/l', 'v');
	output = output.replace('/k', 'u');
	output = output.replace('/j', 't');
	output = output.replace('/e', 'o');
	output = output.replace('/f', 'p');
	output = output.replace('/g', 'q');
	output = output.replace('/h', 'r');
	output = output.replace('/i', 's');
	output = output.replace('/-...a', 's');
	output = output.replace('/-..a', 'r');
	output = output.replace('/-.a', 'q');
	output = output.replace('/-a', 'p');
	output = output.replace('/-..b', 's');
	output = output.replace('/-.b', 'r');
	output = output.replace('/-b', 'q');
	output = output.replace('/-.c', 's');
	output = output.replace('/-c', 'r');
	output = output.replace('/-d', 's');
	output = output.replace('/...a', 'n');
	output = output.replace('/..a', 'm');
	output = output.replace('/.a', 'l');
	output = output.replace('/a', 'k');
	output = output.replace('/..b', 'n');
	output = output.replace('/.b', 'm');
	output = output.replace('/b', 'l');
	output = output.replace('/.c', 'n');
	output = output.replace('/c', 'm');
	output = output.replace('/d', 'n');
	output = output.replace('-...a', 'i');
	output = output.replace('-..a', 'h');
	output = output.replace('-.a', 'g');
	output = output.replace('-a', 'f');
	output = output.replace('-..b', 'i');
	output = output.replace('-.b', 'h');
	output = output.replace('-b', 'g');
	output = output.replace('-.c', 'i');
	output = output.replace('-c', 'h');
	output = output.replace('-d', 'i');
	output = output.replace('...a', 'd');
	output = output.replace('..a', 'c');
	output = output.replace('.a', 'b');
	output = output.replace('..b', 'd');
	output = output.replace('.b', 'c');
	output = output.replace('.c', 'd');
	
	var newText = output;
	if (oldText !== newText) {
		decodeAgain();	
	}
}
function modeChange(n) {
    	mode = n;
	encode();
}
function clearBoxes() {
	document.getElementById("input").value = "";
	output = "";
}
