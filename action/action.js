function actionGen() {

    var partA = Math.floor(Math.random() * 22);
    var aPlural = true;
	if (partA == 0) {
       		partA = "A";
		aPlural = false;
    	} else if (partA == 1) {
        	partA = "Two";
    	} else if (partA == 2) {
        	partA = "Three";
    	} else if (partA == 3) {
		partA = "Four";
	} else if (partA == 4) {
		partA = "Five";
	} else if (partA == 5) {
		partA = "Many";
	} else if (partA == 6) {
		partA = "Lots of";
	} else if (partA == 7) {
		partA = "A few";
	} else if (partA == 8) {
		partA = "Tons of";
	} else if (partA == 9) {
		partA = "Some";
	} else if (partA == 10) {
		partA = "One";
		aPlural = false;
	} else if (partA == 11) {
		partA = "Half of a";
		aPlural = false;
	} else if (partA == 12) {
		partA = "Pieces of";	   
	} else if (partA == 13) {
		partA = "A";
		aPlural = false;
	} else if (partA == 14) {
		partA = "A";
		aPlural = false;
	} else if (partA == 15) {
		partA = "A";
		aPlural = false;
	} else if (partA == 16) {
		partA = "A";
		aPlural = false;
	} else if (partA == 17) {
		partA = "A couple of";	   
	} else if (partA == 18) {
		partA = "A crap ton of";	   
	} else if (partA == 19) {
		partA = "Little bits of";	   
	} else if (partA == 20) {
		partA = "The";
		aPlural = false;	
	} else {
		partA = "The";
	}
	
	var partB = Math.floor(Math.random() * 36);
	if (partB == 0) {
		partB = "red";
	} else if (partB == 1) {
		partB = "orange";
		if (partA == "A") {
			partA = "An";
		} else if (partA == "Half of a") {
			partA = "Half of an";	
		}
	} else if (partB == 2) {
		partB = "yellow";
	} else if (partB == 3) {
		partB = "green";
	} else if (partB == 4) {
		partB = "blue";
	} else if (partB == 5) {
		partB = "purple";
	} else if (partB == 6) {
		partB = "ugly";
		if (partA == "A") {
			partA = "An";
		} else if (partA == "Half of a") {
			partA = "Half of an";	
		}
	} else if (partB == 7) {
		partB = "cool";
	} else if (partB == 8) {
		partB = "good-looking";
	} else if (partB == 9) {
		partB = "tiny";
	} else if (partB == 10) {
		partB = "large";
	} else if (partB == 11) {
		partB = "invisible";
		if (partA == "A") {
			partA = "An";
		} else if (partA == "Half of a") {
			partA = "Half of an";	
		}
	} else if (partB == 12) {
		partB = "flying";
	} else if (partB == 13) {
		partB = "nerdy";
	} else if (partB == 14) {
		partB = "tall";
	} else if (partB == 15) {
		partB = "short";
	} else if (partB == 16) {
		partB = "nice";
	} else if (partB == 17) {
		partB = "microscopic";
	} else if (partB == 18) {
		partB = "weird";
	} else if (partB == 19) {
		partB = "dancing";
	} else if (partB == 20) {
		partB = "angry";
		if (partA == "A") {
			partA = "An";
		} else if (partA == "Half of a") {
			partA = "Half of an";	
		}
	} else if (partB == 21) {
		partB = "rude";	   
	} else if (partB == 22) {
		partB = "dumb";	   
	} else if (partB == 23) {
		partB = "sad";	   
	} else if (partB == 24) {
		partB = "killer";	   
	} else if (partB == 25) {
		partB = "funny";	   
	} else if (partB == 26) {
		partB = "likeable";	   
	} else if (partB == 27) {
		partB = "determined";	   
	} else if (partB == 28) {
		partB = "rich";	   
	} else if (partB == 29) {
		partB = "poor";	   
	} else if (partB == 30) {
		partB = "thicc";
	} else if (partB == 31) {
		partB = "racist";	
	} else if (partB == 32) {
		partB = "black";	   
	} else if (partB == 33) {
		partB = "gray";	   
	} else if (partB == 34) {
		partB = "white";	   
	} else {
		partB = "brown";	   
	}
	
	var partC = Math.floor(Math.random() * 21);
	if (partC == 0) {
		if (aPlural) {
			partC = "men";
		} else {
			partC = "man";
		}
	} else if (partC == 1) {
		if (aPlural) {
			partC = "women";
		} else {
			partC = "woman";
		}
	} else if (partC == 2) {
		if (aPlural) {
			partC = "bassists";
		} else {
			partC = "bassist";
		}
	} else if (partC == 3) {
		if (aPlural) {
			partC = "dogs";
		} else {
			partC = "dog";
		}
	} else if (partC == 4) {
		if (aPlural) {
			partC = "burritos";
		} else {
			partC = "burrito";
		}
	} else if (partC == 5) {
		if (aPlural) {
			partC = "hams";
		} else {
			partC = "ham";
		}
	} else if (partC == 6) {
		if (aPlural) {
			partC = "teachers";
		} else {
			partC = "teacher";
		}
	} else if (partC == 7) {
		if (aPlural) {
			partC = "celebrities";
		} else {
			partC = "celebrity";
		}
	} else if (partC == 8) {
		if (aPlural) {
			partC = "Jeffs";
		} else {
			partC = "Jeff";
		}
	} else if (partC == 9) {
		if (aPlural) {
			partC = "notebooks";
		} else {
			partC = "notebook";
		}
	} else if (partC == 10) {
		if (aPlural) {
			partC = "athletes";
		} else {
			partC = "athlete";	
		}
	} else if (partC == 11) {
		if (aPlural) {
			partC = "criminals";
		} else {
			partC = "criminal";	
		}
	} else if (partC == 12) {
		if (aPlural) {
			partC = "children";
		} else {
			partC = "child";	
		}
	} else if (partC == 13) {
		if (aPlural) {
			partC = "cops";
		} else {
			partC = "cop";	
		}
	} else if (partC == 14) {
		if (aPlural) {
			partC = "horses";
		} else {
			partC = "horse";	
		}
	} else if (partC == 15) {
		if (aPlural) {
			partC = "Kyles";
		} else {
			partC = "Kyle";	
		}
	} else if (partC == 16) {
		if (aPlural) {
			partC = "turds";
		} else {
			partC = "turd";	
		}
	} else if (partC == 17) {
		if (aPlural) {
			partC = "chefs";
		} else {
			partC = "chef";	
		}
	} else if (partC == 18) {
		if (aPlural) {
			partC = "neighbors of yours";
		} else {
			partC = "neighbor of yours";	
		}
	} else if (partC == 19) {
		if (aPlural) {
			partC = "genies";
		} else {
			partC = "genie";	
		}
	} else {
		if (aPlural) {
			partC = "people";
		} else {
			partC = "person";	
		}		
	}
	
	partD = Math.floor(Math.random() * 30);
	if (partD == 0) {
		partD = "eating";
	} else if (partD == 1) {
		partD = "punching";
	} else if (partD == 2) {
		partD = "kissing";
	} else if (partD == 3) {
		partD = "singing with";
	} else if (partD == 4) {
		partD = "shopping with";
	} else if (partD == 5) {
		partD = "stealing from";
	} else if (partD == 6) {
		partD = "fighting for";
	} else if (partD == 7) {
		partD = "judging";
	} else if (partD == 8) {
		partD = "staring at";
	} else if (partD == 9) {
		partD = "talking with";
	} else if (partD == 10) {
		partD = "holding";	   
	} else if (partD == 11) {
		partD = "arguing with";	   
	} else if (partD == 12) {
		partD = "yelling at";	   
	} else if (partD == 13) {
		partD = "shoplifting with";	   
	} else if (partD == 14) {
		if (aPlural) {
			partD = "taking pictures of";		
		} else {
			partD = "taking a picture of";		
		}
	} else if (partD == 15) {
		partD = "playing chess with";	   
	} else if (partD == 16) {
		partD = "practicing yoga with";	   
	} else if (partD == 17) {
		partD = "being taught to read by";	   
	} else if (partD == 18) {
		partD = "being sent to jail by";	   
	} else if (partD == 19) {
		partD = "crying after looking at";	   
	} else if (partD == 20) {
		partD = "cooking";
	} else if (partD == 21) {
		partD = "and";	
	} else if (partD == 22){
		partD = "and";	
	} else if (partD == 23) {
		partD = "buying tickets to see";	   
	} else if (partD == 24) {
		partD = "playing in a band with";	   
	} else if (partD == 25) {
		partD = "escaping jail with";	   
	} else if (partD == 26) {
		partD = "lying to";	   
	} else if (partD == 27) {
		partD = "starring in a movie with";	   
	} else if (partD == 28) {
		partD = "looking in the mirror and seeing";	   
	} else {
		partD = "talking about";	   
	}
	
	 var partE = Math.floor(Math.random() * 22);
    var ePlural = true;
	if (partE == 0) {
        partE = "a";
		ePlural = false;
    } else if (partE == 1) {
        partE = "two";
    } else if (partE == 2) {
        partE = "three";
    } else if (partE == 3) {
		partE = "four";
	} else if (partE == 4) {
		partE = "five";
	} else if (partE == 5) {
		partE = "many";
	} else if (partE == 6) {
		partE = "lots of";
	} else if (partE == 7) {
		partE = "a few";
	} else if (partE == 8) {
		partE = "tons of";
	} else if (partE == 9) {
		partE = "some";
	} else if (partE == 10) {
		partE = "one";
		ePlural = false;
	} else if (partE == 11) {
		partE = "half of a";
		ePlural = false;
	} else if (partE == 12) {
		partE = "pieces of";	   
	} else if (partE == 13) {
		partE = "a";
		ePlural = false;
	} else if (partE == 14) {
		partE = "a";
		ePlural = false;
	} else if (partE == 15) {
		partE = "a";
		ePlural = false;
	} else if (partE == 16) {
		partE = "a";
		ePlural = false;
	} else if (partE == 17) {
		partE = "a couple of";	   
	} else if (partE == 18) {
		partE = "a crap ton of";	   
	} else if (partE == 19) {
		partE = "little bits of";	   
	} else if (partE == 20) {
		partE = "the";
		ePlural = false;	
	} else {
		partE = "the";
	}
	
	var partF = Math.floor(Math.random() * 32);
	if (partF == 0) {
		partF = "red";
	} else if (partF == 1) {
		partF = "orange";
		if (partE == "a") {
			partE = "an";
		} else if (partE == "half of a") {
			partE = "half of an";	
		}
	} else if (partF == 2) {
		partF = "yellow";
	} else if (partF == 3) {
		partF = "green";
	} else if (partF == 4) {
		partF = "blue";
	} else if (partF == 5) {
		partF = "purple";
	} else if (partF == 6) {
		partF = "ugly";
		if (partE == "a") {
			partE = "an";
		} else if (partE == "half of a") {
			partE = "half of an";	
		}
	} else if (partF == 7) {
		partF = "cool";
	} else if (partF == 8) {
		partF = "good-looking";
	} else if (partF == 9) {
		partF = "tiny";
	} else if (partF == 10) {
		partF = "large";
	} else if (partF == 11) {
		partF = "invisible";
		if (partE == "a") {
			partE = "an";
		} else if (partE == "half of a") {
			partE = "half of an";	
		}
	} else if (partF == 12) {
		partF = "flying";
	} else if (partF == 13) {
		partF = "nerdy";
	} else if (partF == 14) {
		partF = "tall";
	} else if (partF == 15) {
		partF = "short";
	} else if (partF == 16) {
		partF = "nice";
	} else if (partF == 17) {
		partF = "microscopic";
	} else if (partF == 18) {
		partF = "weird";
	} else if (partF == 19) {
		partF = "dancing";
	} else if (partF == 20) {
		partF = "angry";
		if (partE == "a") {
			partE = "an";
		} else if (partE == "half of a") {
			partE = "half of an";	
		}
	} else if (partF == 21) {
		partF = "rude";	   
	} else if (partF == 22) {
		partF = "dumb";	   
	} else if (partF == 23) {
		partF = "sad";	   
	} else if (partF == 24) {
		partF = "killer";	   
	} else if (partF == 25) {
		partF = "funny";	   
	} else if (partF == 26) {
		partF = "likeable";	   
	} else if (partF == 27) {
		partF = "determined";	   
	} else if (partF == 28) {
		partF = "rich";	   
	} else if (partF == 29) {
		partF = "poor";	   
	} else if (partF == 30) {
		partF = "thicc";
	} else if (partF == 31) {
		partF = "racist";	
	} else if (partF == 32) {
		partF = "black";	   
	} else if (partF == 33) {
		partF = "gray";	   
	} else if (partF == 34) {
		partF = "white";	   
	} else {
		partF = "brown";	   
	}
	
	var partG = Math.floor(Math.random() * 21);
	if (partG == 0) {
		if (ePlural) {
			partG = "men";
		} else {
			partG = "man";
		}
	} else if (partG == 1) {
		if (ePlural) {
			partG = "women";
		} else {
			partG = "woman";
		}
	} else if (partG == 2) {
		if (ePlural) {
			partG = "bassists";
		} else {
			partG = "bassist";
		}
	} else if (partG == 3) {
		if (ePlural) {
			partG = "dogs";
		} else {
			partG = "dog";
		}
	} else if (partG == 4) {
		if (ePlural) {
			partG = "burritos";
		} else {
			partG = "burrito";
		}
	} else if (partG == 5) {
		if (ePlural) {
			partG = "hams";
		} else {
			partG = "ham";
		}
	} else if (partG == 6) {
		if (ePlural) {
			partG = "teachers";
		} else {
			partG = "teacher";
		}
	} else if (partG == 7) {
		if (ePlural) {
			partG = "celebrities";
		} else {
			partG = "celebrity";
		}
	} else if (partG == 8) {
		if (ePlural) {
			partG = "Jeffs";
		} else {
			partG = "Jeff";
		}
	} else if (partG == 9) {
		if (ePlural) {
			partG = "notebooks";
		} else {
			partG = "notebook";
		}
	} else if (partG == 10) {
		if (ePlural) {
			partG = "athletes";
		} else {
			partG = "athlete";	
		}
	} else if (partG == 11) {
		if (ePlural) {
			partG = "criminals";
		} else {
			partG = "criminal";	
		}
	} else if (partG == 12) {
		if (ePlural) {
			partG = "children";
		} else {
			partG = "child";	
		}
	} else if (partG == 13) {
		if (ePlural) {
			partG = "cops";
		} else {
			partG = "cop";	
		}
	} else if (partG == 14) {
		if (ePlural) {
			partG = "horses";
		} else {
			partG = "horse";	
		}
	} else if (partG == 15) {
		if (ePlural) {
			partG = "Kyles";
		} else {
			partG = "Kyle";	
		}
	} else if (partG == 16) {
		if (ePlural) {
			partG = "turds";
		} else {
			partG = "turd";	
		}
	} else if (partG == 17) {
		if (ePlural) {
			partG = "chefs";
		} else {
			partG = "chef";	
		}
	} else if (partG == 18) {
		if (ePlural) {
			partG = "neighbors of yours";
		} else {
			partG = "neighbor of yours";	
		}
	} else if (partG == 19) {
		if (ePlural) {
			partG = "genies";
		} else {
			partG = "genie";	
		}
	} else {
		if (ePlural) {
			partG = "people";
		} else {
			partG = "person";	
		}
	}
	
   var pBreak = "<br>"
   var product = pBreak.concat(partA, " ", partB, " ", partC, " ", partD, " ", partE, " ", partF, " ", partG, ".");
   document.getElementById("output").innerHTML = product;
}
