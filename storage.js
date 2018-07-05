
var saveButton = document.getElementById("saveButton");
var loadButton = document.getElementById("loadButton");
saveButton.onclick = function(){save()};
loadButton.onclick = function(){load()};
allValues = new Array();


//-------------Load Fuction----------------

function load(){
 allValues = JSON.parse(localStorage.getItem("values"));
 instertValues();
    
}

//--------------Save Fuction---------------

function save() {
    takeValues();
        if (localStorage.values !== allValues) {
            localStorage.setItem("values", JSON.stringify(allValues));
        }
        document.getElementById("result").innerHTML = "You have clicked the button " + localStorage.values + " time(s).";
}

//---------Take values from table----------

function takeValues(){
var uomTable = document.getElementsByClassName("uomTable")[0];
var tblBody = uomTable.tBodies[0];
allValues = [];
var rows = tblBody.rows,
     rlen = rows.length,
     arr = new Array(),
     i, j, cells, clen;
  for (i = 0; i < rlen; i++) {
  cells = rows[i].getElementsByTagName('input');
  clen = cells.length;
  arr[i] = new Array();
  for (j = 0; j < clen; j++) {
  arr[i][j] = Number(cells[j].value);
  allValues.push(arr[i][j]);
  }
}}

//-----Insert stored values in table--------

function instertValues(){
var uomTable = document.getElementsByClassName("uomTable")[0];
var tblBody = uomTable.tBodies[0];
var rows = tblBody.rows,
    rlen = rows.length,
    arr = new Array(),
    n=0;
    i, j, cells, clen;
    for (i = 0; i < rlen; i++) {
    cells = rows[i].getElementsByTagName('input');
    clen = cells.length;
    arr[i] = new Array();
    for (j = 0; j < clen; j++) {
    cells[j].value = allValues[n++];
}}}
