class fanObject {
  int[] yearValues;
  int[] yearsObj;
  String objectName;
  color c;

  fanObject(String[] rows, int[] y) {
    yearsObj = y;
    yearValues = new int[yearsObj.length];
    c = color(random(0,200), random(0,200), random(0,200));
    objectName = rows[0];
    
    for (int i = 1; i<rows.length; i++) {
     int currentYear = yearsObj[i-1];
     int fanVal = int(rows[i]);
     yearValues[i-1] = fanVal;
//     println(objectName, currentYear, fanVal);
    }
  }

  String getNom() {
    return objectName;
    }
  
  int getValue(int y) {
    return yearValues[y];
    }
  
  color getColor() {
    return c;
    }
}
