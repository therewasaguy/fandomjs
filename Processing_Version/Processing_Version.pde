fanObject[] fanObjects;
int[] years;
String table[];
int width = 640*2;
int height = 480*2;
color mouseColor;
float xoff = 0.0;

void setup() {
  size(width, height);
  background(255);
  years = new int[30];
  for (int i = 0; i<= 29; i++) {
    years[i] = 1985+i;
    println(years[i]);
  }
  loadData();
}

void draw() {
  background(255);
  printData(years);
  checkMouse(mouseX,mouseY);
  for (int i = 0; i<years.length; i++) {
    fill(0);
    text(years[i], (float(i)/30)*width*.9+width*.127, height-height*.02);
    noFill();
  }
  xoff = xoff + .01;
}

void checkMouse(int mx, int my) {
  loadPixels();
  mouseColor = pixels[mx+my*width];
  updatePixels();
}

void loadData() {
  table = loadStrings("fandom.csv");
  fanObjects = new fanObject[table.length-1];
  
  for (int i = 1; i< table.length; i++) {
    //chop each line into an array of CSV
    String[] rowVals = new String[years.length];
    rowVals = split(table[i], ',' );
    println(rowVals.length + " is the length!");
    fanObjects[i - 1] = new fanObject(rowVals, years);
  }
}

void printData(int[] y) {

  //for every object in the object array
  for (int i = 0; i<fanObjects.length; i++) {
    fanObject currentObj = fanObjects[i];
    //print(currentObj.getNom());
    color objColor = currentObj.getColor();
    fill(objColor);
    stroke(objColor);
    //if selected, then strokeWeight and textsize = big, otherwise small
    if (mouseColor == objColor) {
      println(mouseColor);
      strokeWeight(15); 
    } else {
      strokeWeight(3);
    }
    rect(10, (float(i)/fanObjects.length)*height - 8, 150, 11);
    fill(255);
    noFill();

    text(currentObj.getNom(), 10, (float(i)/fanObjects.length)*height); 
    //start shape
    beginShape();
    
    for (int j = 0; j<years.length; j++) {
      int val = currentObj.getValue(j);
      curveVertex(((float(j)/30)*width)*.9+width*.15, ((float((10-val))/10)*height)*.8+.1*height + noise(xoff*10));
    }
    //end shape
    endShape();

  if (mouseColor == objColor && mouseX > 150) {
      fill(0);
      text(currentObj.getNom(), mouseX + 10, mouseY + 2); 
  }

  }

}

//if mouse touches color, strokeWeight = 5, fontSize = 5

