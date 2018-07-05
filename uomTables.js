"use strict";

//------------------Create Table Inputs--------------------

var uomTable = document.getElementsByClassName("uomTable")[0];
var tblBody = uomTable.tBodies[0];
var rows = tblBody.rows,
     rlen = rows.length,
     arr = new Array(),
     i, j, cells, clen;
 for (i = 0; i < rlen; i++) {
  cells = rows[i].cells;
  clen = cells.length;
  arr[i] = new Array();
    for (j = 0; j < clen; j++) {
    arr[i][j] = Number(cells[j].innerText);
                }
    }
 for (i = 0; i < rlen; i++) {
    rows[i].innerHTML = "<td><input type='number' value= " 
                    + arr[i].join("></td><td><input type='number' value=") + "></td>";
            }

//---------Add On Click event on  Table TH (Claccification)----

var tblhead = uomTable.tHead;
rows = tblhead.rows[0];
cells = rows.cells;
rows.style.textAlign="center";
rows.style.fontWeight="bold";
var asc1 = 1, asc2 =1, asc3 = 1 , asc4 =1; 
cells[0].onclick= function() {changeColor(cells,0);sort_table( 0, asc1);asc1 *= -1; asc2 = 1; asc3 = 1; asc4 = 1};
cells[1].onclick= function() {changeColor(cells,1);sort_table( 1, asc2);asc2 *= -1; asc3 = 1; asc1 = 1; asc4 = 1};
cells[2].onclick= function() {changeColor(cells,2);sort_table( 2, asc3);asc3 *= -1; asc1 = 1; asc2 = 1; asc4 = 1};
cells[3].onclick= function() {changeColor(cells,3);sort_table( 3, asc4);asc4 *= -1; asc1 = 1; asc2 = 1; asc3 = 1};

//-------------Sellect Background Color Function----------------

function changeColor(cells,cell){
    cells[cell].style.backgroundColor = "yellow";
     for(i = 0; i<4; i++){
         if(cell!==i){
             cells[i].style.backgroundColor = "white";
         }
     }
    
}

//--------------Sort Table Function ----------------------------

        function sort_table(col, asc) {
            tblBody = uomTable.tBodies[0];
            var rows = tblBody.rows,
                rlen = rows.length,
                arr = new Array(),
                i, j, cells, clen;
            // fill the array with values from the table
            for (i = 0; i < rlen; i++) {
                cells = rows[i].getElementsByTagName('input');
                clen = cells.length;
                arr[i] = new Array();
                for (j = 0; j < clen; j++) {
                    arr[i][j] = Number(cells[j].value);
                }
            }
            // sort the array by the specified column number (col) and order (asc)
            arr.sort(function (a, b) {
                return (a[col] == b[col]) ? 0 : ((a[col] > b[col]) ? asc : -1 * asc);
            });
            // replace existing rows with new rows created from the sorted array
            for (i = 0; i < rlen; i++) {
                rows[i].innerHTML = "<td><input type='number' value='" 
                    + arr[i].join("'></td><td><input type='number' value='") + "'></td>";
            }
            insertIcons();
            changeCSS();
        }
//----------------------Create Table Footer------------------------------------------

var tableFooter = uomTable.tFoot;

//---------------------Create Footer Row-----------------------------------

var footerTR = [];
for (i = 0; i < 2; i++) {
    footerTR[i] = document.createElement("TR");
    footerTR[i].setAttribute("id", "footerTr"+i); 
    tableFooter.appendChild(footerTR[i]);
}

//----------------Create Footer Select Options (Row 2)------------

var footerTD0 = [];
for (i =0; i<4; i++){
 footerTD0[i] = document.createElement("TD");
 footerTD0[i].setAttribute("id", "footerTD0"+i);
 document.getElementById("footerTr0").appendChild(footerTD0[i]);
 footerTD0[i].innerHTML = "<select style='background-color: #F0F8FF;' id='select"+i+"'   onclick='option("+i+")'' onchange='option("+i+")''><option value='Min' selected='selected'>Min</option><option value='Max'>Max</option><option value='Mean'>Mean</option><option value='Mode'>Mode</option><option value='Median'>Median</option><option value='Range'>Range</option><option value='Variance'>Variance</option><option value='StdDev'>StdDev</option></select>";
}

//--------------------Create Footer Results (ROW 2)----------------

var results = [],  footerTD1 = [];
for (i =0; i<4; i++){
 footerTD1[i] = document.createElement("TD");
 footerTD1[i].setAttribute("id", "footerTD1"+i);
 document.getElementById("footerTr1").appendChild(footerTD1[i]);
}

//----------------------Option Fuction------------------------

function option(y){
  var x = document.getElementById("select"+y).value;
    tblBody = uomTable.tBodies[0];
                var rows = tblBody.rows,
                rlen = rows.length,
                arr = new Array(),
                i, j, cells, clen;
//------------- fill the array with values from the table---------
            for (i = 0; i < rlen; i++) {
                cells = rows[i].getElementsByTagName('input');
                clen = cells.length;
                arr[i] = new Array();
                for (j = 0; j < clen; j++) {
                    arr[i][j] = Number(cells[j].value);
                }
            }
//---------------------Take values from the Option column-------------------
    var values = [];
    for (j = 0; j < 5; j++){
    values.push(arr[j][y]);
    }
//-----------------------Culculations----------------------------------------   
    var cul = {	
	max: function(values) {
		return Math.max.apply(Math, values);
	},
	
	min: function(values) {
		return Math.min.apply(null, values);
	},
	
	range: function(values) {
		return cul.max(values) - cul.min(values);
	},
	
	midrange: function(values) {
		return cul.range(values) / 2;
	},

	sum: function(values) {
		var num = 0;
		for (var i = 0, l = values.length; i < l; i++) num += values[i];
		return num;
	},
	
	mean: function(values) {
		return cul.sum(values) / values.length;
	},
	
	median: function(values) {
		values.sort(function(a, b) {
			return a - b;
		});
		var mid = values.length / 2;
		return mid % 1 ? values[mid - 0.5] : (values[mid - 1] + values[mid]) / 2;
	},
	
	mode: function(values) {
     var mode, count = [], i, number, maxIndex = 0;
 
      for (i = 0; i < values.length; i += 1) {
        number = values[i];
        count[number] = (count[number] || 0) + 1;
        if (count[number] > maxIndex) {
            maxIndex = count[number];
        }
      }
 
      for (i in count)
        if (count.hasOwnProperty(i)) {
            if (count[i] === maxIndex) {
                mode = Number(i);
            }}
		return mode;
	},
	
	variance: function(values) {
		var mean = cul.mean(values);
		return cul.mean(values.map(function(num) {
			return Math.pow(num - mean, 2);
		}));
	},
	
	standardDeviation: function(values) {
		return Math.sqrt(cul.variance(values));
	},
	
};

    
//---------------Return The Results------------------------------
    if (x==="Max"){
     footerTD1[y].innerHTML=cul.max(values);
    }else if (x==="Min"){
     footerTD1[y].innerHTML=cul.min(values);
    }else if (x==="Mean"){
     footerTD1[y].innerHTML=cul.mean(values);
    }else if (x==="Mode"){
     footerTD1[y].innerHTML=cul.mode(values);
    }else if(x==="Median"){
     footerTD1[y].innerHTML=cul.median(values);
    }else if(x==="Range"){
     footerTD1[y].innerHTML=cul.range(values);
    }else if(x==="Variance"){
     footerTD1[y].innerHTML=cul.variance(values);
    }else if(x==="StdDev"){
     footerTD1[y].innerHTML=cul.standardDeviation(values).toFixed(2);
    }
}

//-----------------  Insert Icons Link -----------------------------

 var link = document.createElement('link');
    link.id = 'link';
    link.rel = 'stylesheet';
    link.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css';
    document.head.appendChild(link);
    var icon=[];
        icon[0] = "<td><i class='glyphicon glyphicon-duplicate' style='padding: 4px ; color: red;'></i></td>";
        icon[1] = "<td><i class='glyphicon glyphicon-trash' style='padding: 4px ; color: red;'></i></td>";

//----------------Insert Icons in Table--------------------
window.onload = insertIcons();
function insertIcons(){
  for(i=0 ; i<2 ; i++){
    for(j = 0; j < 5; j++){
       rows = tblBody.getElementsByTagName("tr");
       var newChell = rows[j].insertCell(-1);
       newChell.innerHTML = icon[i];
       newChell.setAttribute("id", "icon"+i+j);
       var num1=i, num2=j;
       newChell.setAttribute("onclick","copyDelete("+i+","+j+")")
  }}
}
//------------Copy Delete Fuction----------------------


function copyDelete(i,j){
    var rows = tblBody.getElementsByTagName("tr");
    
    if (i===1){ //-----Delete------
      var x = rows[j].getElementsByTagName("input");
      var r = confirm("Are you sure you want to delete this row?");
      if (r == true) {
        for(i=0;i < x.length;i++){
        x[i].value="";
        }
      }
    }else if (i===0){ //------Copy------
          var  x = rows[j].getElementsByTagName("input"),copyText="";
          for(i=0;i < x.length;i++){
          copyText= copyText+(" "+(x[i].value).toString());
          }
          navigator.clipboard.writeText(copyText);
          alert("Copied the selected row: " + copyText);
    }
}


//------------Table CSS Style Function--------------------------

changeCSS();

function changeCSS(){

    var inputs = document.getElementsByTagName("input");
    for (i=0;i<inputs.length;i++){
        inputs[i].style.padding="2px";
        inputs[i].style.margin="6px";
        inputs[i].style.width = "100px";
    }

    var headTd = tblhead.getElementsByTagName("td");
    for (i=0;i<headTd.length;i++){
        headTd[i].style.padding="3px";
        headTd[i].style.margin="3px";
        headTd[i].style.borderBottom="2px solid black";
    }
    footerTR[0].style.borderTop="2px solid black";
    var footerTd = tableFooter.getElementsByTagName("td");
    for (i=0;i<footerTd.length;i++){
        footerTd[i].style.padding="3px";
        footerTd[i].style.margin="3px";
        footerTd[i].style.textAlign="center";
    }
}


//---------Sort Table Checkbox-------------------
function sort(){
    var checkBox = document.getElementById("checkbox");
    var x = document.getElementById("selectX").value;
    var chartButton = document.getElementById("chartButton");
    if (checkBox.checked == true){
    switch (Number(x)){
    case 0:
        chartButton.onclick= function() {changeColor(cells,0);sort_table( 0, asc1);asc1 *= -1; asc2 = 1; asc3 = 1; asc4 = 1;createChart()};
        break;
    case 1:
         chartButton.onclick= function() {changeColor(cells,1);sort_table( 1, asc2);asc2 *= -1; asc3 = 1; asc1 = 1; asc4 = 1;createChart()};
        break;
    case 2:
        chartButton.onclick= function() {changeColor(cells,2);sort_table( 2, asc3);asc3 *= -1; asc1 = 1; asc2 = 1; asc4 = 1;createChart()};
        break;
    case 3:
        chartButton.onclick= function() {changeColor(cells,3);sort_table( 3, asc4);asc4 *= -1; asc1 = 1; asc2 = 1; asc3 = 1;createChart()};
        break; }
    }
}

//----------Default table ----------------

var defaultbutton = document.getElementById("DefaultButton");
defaultbutton.onclick=function() {reload()};
function reload(){
    location.reload();
}




//-------Create New Table------------------

function newTable(){
    var form = document.getElementById("form");
    form.style.display = "block";
    var inputValues = document.querySelectorAll("input");
    var nameSubmit = document.getElementById("nameSub");
    var checkboxDelete = document.getElementById("checkboxDelete");
    nameSubmit.onclick = function(){getNames()};
    function getNames(){
        var inp = {}
        var tablename = document.getElementById("nameIn").value;
        var caption = document.getElementById("caption");
        caption.innerHTML = tablename;
        for(var i=0; i<4 ; i++){
            inp[i]= document.getElementById("in"+i).value;
            var headertd = document.getElementById("td"+i);
            headertd.innerHTML = inp[i];
            form.style.display = "none";
            var xOption = document.getElementById("XOption"+i);
            xOption.innerHTML = inp[i];
            var yOption = document.getElementById("YOption"+i);
            yOption.innerHTML = inp[i];
        }
        if(checkboxDelete.checked == true){
        for(i=0;i<inputValues.length;i++){
             inputValues[i].value="";}
        }
    }
    
}

//----------Prevent Default---------------
var inputsPreventDefault = document.getElementsByTagName("input");


//---------- Change Input With Enter Key --------
$('.uomTable input').keydown(function (e) {
     if (e.which === 13) {
         var index = $('.uomTable input').index(this) + 1;
         $('.uomTable input').eq(index).focus();
     }
 });
