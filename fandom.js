var fanObjects = [];
var years = [];
var table = [];
var wid = 640*2;
var hei = 480*1.8;
var mouseColor = [255, 255, 255, 255];
var sel;

function setup() {
	createGraphics(wid,hei);
	background(255);
	for (i = 0; i<= 29; i++) {
		years.push(1985+i);
		println(years[i]);
	}
	loadData();
	frameRate(25);
}

function draw() {
	background(255, 255, 255, 90);

	printData(years);
	for (var i = 2; i<years.length; i++) {
	    fill(0);
		noStroke();
		textSize(14);
		text(years[i], (i/30)*wid*.9+wid*.1 + 9, hei-hei*.03);
		textSize(10);
	    if (years[i] == 1987) {
		    text("| Born '85, SF CA", (i/30)*wid*.9+wid*.1 + 5, hei-hei*.01);
	    }
	    if (years[i] == 1998) {
		    text("| NJ", (i/30)*wid*.9+wid*.1 + 8, hei-hei*.01);
	    }
	    if (years[i] == 1990) {
		    text("| Kindergarten", (i/30)*wid*.9+wid*.1 + 8, hei-hei*.01);
	    }
	    if (years[i] == 1999) {
		    text("| High School", (i/30)*wid*.9+wid*.1 + 8, hei-hei*.01);
	    }
	    if (years[i] == 2003) {
		    text("| College", (i/30)*wid*.9+wid*.1 + 8, hei-hei*.01);
	    }
	    if (years[i] == 2007) {
		    text("| NYC", (i/30)*wid*.9+wid*.1 + 12, hei-hei*.01);
	    }
	    if (years[i] == 2013) {
		    text("| ITP", (i/30)*wid*.9+wid*.1 + 8, hei-hei*.01);
	    }
	    noFill();
	}
}

function checkMouse(e) {
	// println(e);
	sel = false;
	println(e);
  	loadPixels();
	mouseColor = pixels[e.pageX+e.pageY*wid];
	println(mouseColor);
	var curPix = e.pageX + e.pageY*width;
	updatePixels();
}

function loadData() {
	lStrings('fandom.txt', function(data) {
		table = data;

		println(table.length + " loaded!");

		for (var i = 1; i<table.length; i++) {
			var rowVals = split(table[i], ',');
			fanObjects[i - 1] = new FanObject(rowVals, years);
		}

	});
}

//parse data from csv file (suggested this as a replacement for 'loadStrings' for the p5.js library, too)
lStrings = function(path, callback) {
    var ret = [];
    var req = new XMLHttpRequest();
    req.open('GET', path, true);
    req.onreadystatechange = function () {
      if((req.readyState === 4) && (req.status === 200 || req.status === 0)) {
        var arr = req.responseText.match(/[^\r\n]+/g);
        for (var k in arr) {
          ret[k] = arr[k];
        }
        if (typeof callback !== 'undefined') {
          callback(ret);
        }
      }
    };
    req.send(null);
  };

function printData(y) {
	for (var i = 0; i<fanObjects.length; i++) {
		currentObj = fanObjects[i];
		objColor = currentObj.c;
		if (mouseColor[0] == objColor[0] && mouseColor[1] == objColor[1] && + mouseColor[2] == objColor[2]) {
			println("mouse color bang!")
			strokeWeight(20);
			fill(objColor);
			stroke(objColor);
			sel = true;
		} else {
			strokeWeight(5);
			if (mouseColor[0] < 254 && sel == true) {
				fill(objColor[0], objColor[1], objColor[2],10);
				stroke(objColor[0], objColor[1], objColor[2],10);
			}
			else {
				fill(objColor);
				stroke(objColor);

			}
		}

		beginShape();
		for (var j = 0; j<years.length; j++) {
			var val = currentObj.yearValues[j];
			vertex(j/30*wid*.9 + wid*.15, (10-val)/10*hei*.92 +.02*hei);
		}
		endShape();
		noStroke(0);
		rect(10, i/fanObjects.length*hei, 200, 12);

		if (currentObj.objType == 'music' || 'food') {
			fill(160);
		} else {
			fill(180);
		}
		textSize(13);
		text(currentObj.objectName, 10, i/fanObjects.length*hei + 8);

		//add name to click area
	  if (mouseColor[0] == objColor[0] && mouseColor[1] == objColor[1] && + mouseColor[2] == objColor[2]) {
	      fill(0);
	      text(currentObj.objectName, mouseX + 10, mouseY + 2); 
	      text("("+currentObj.objType+")", mouseX + 10, mouseY + 20); 
	      noFill();
	      sel = true;
	  }
	}

}

//FAN OBJECT CLASS
function FanObject(columns, y) {
	this.yearsObj = y;
	this.objectName = columns[0];
	this.objType = columns[1]
	println(this.objType);

	/*pick color based on objType */
	// lit / media / art = red
	if (this.objType == 'lit' || this.objType == 'media' || this.objType == 'art') {
		this.c = [Math.floor(random(200,254)), Math.floor(random(0,50)), Math.floor(random(0,50)), 255];

	}
	// music = yellow
	else if (this.objType == 'music') {
		this.c = [Math.floor(random(200,254)), Math.floor(random(200,254)), Math.floor(random(0,10)), 255];
	}

	// food = green
	else if (this.objType == 'food') {
		this.c = [Math.floor(random(0,50)), Math.floor(random(200,254)), Math.floor(random(0,70)), 255];
	}

	// tech = purple
	else if (this.objType == 'tech') {
		this.c = [Math.floor(random(200,254)), Math.floor(random(0,10)), Math.floor(random(200,254)), 255];
	}

	// sports = blue
	else if (this.objType == 'sports') {
		this.c = [Math.floor(random(0,20)), Math.floor(random(0,20)), Math.floor(random(200,254)), 255];
	}

	// other
	else {
	//pick color based on type
		this.c = [Math.floor(random(0,50)), Math.floor(random(0,50)), Math.floor(random(0,50)), 255];
	}
	this.yearValues = [];

	for (var i = 2; i<columns.length; i++) {
		fanVal = columns[i];
		this.yearValues.push(fanVal);
	}
}

window.onload = function() {

	document.getElementById('bod').addEventListener("mousedown", checkMouse,false);  

	// document.getElementById('bod').mousedown = function() {
	//   println("click!!!");
	//   checkMouse();
	// }
}