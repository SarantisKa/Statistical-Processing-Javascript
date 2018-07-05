"use strict";
window.onload = createChart();
function createChart() {
    
//----------Create X & Y Charts Options------------------
var uomTable = document.getElementsByClassName("uomTable")[0];
var tblHead = uomTable.tHead;
var rows = tblHead.rows;
var cells = rows[0].cells;
for(i=0;i<cells.length;i++){
    var xOption = document.getElementById("XOption"+i);
    var yOption = document.getElementById("YOption"+i);
    xOption.value=i;
    yOption.value=i;
    xOption.innerHTML=cells[i].innerHTML;
    yOption.innerHTML=cells[i].innerHTML;
    
}
    
//------------- fill the array with values from the table--------
    tblBody = uomTable.tBodies[0];
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
                }
            }   
var x = Number(document.getElementById("selectX").value);
var a = document.getElementById("XOption"+x).innerHTML;
var y = Number(document.getElementById("selectY").value);
var b = document.getElementById("YOption"+y).innerHTML;
var tName = document.getElementById("caption").innerHTML;
var x0,x1,x2,x3,x4,y0,y1,y2,y3,y4;
if (x === 0) {
    x0=arr[0][0];
    x1=arr[1][0];
    x2=arr[2][0];
    x3=arr[3][0];
    x4=arr[4][0];
} else if (x === 1) {
    x0=arr[0][1];
    x1=arr[1][1];
    x2=arr[2][1];
    x3=arr[3][1];
    x4=arr[4][1];
} else if (x === 2) {
    x0=arr[0][2];
    x1=arr[1][2];
    x2=arr[2][2];
    x3=arr[3][2];
    x4=arr[4][2];
} else if (x === 3) {
    x0=arr[0][3];
    x1=arr[1][3];
    x2=arr[2][3];
    x3=arr[3][3];
    x4=arr[4][3];
} else {
    alert("Pleaze Select an Option")
}           

if(x === y){
    alert("X must be deferrent from Y pleaze select another option")
} else if (y === 0) {
    y0=arr[0][0];
    y1=arr[1][0];
    y2=arr[2][0];
    y3=arr[3][0];
    y4=arr[4][0];
} else if (y === 1) {
    y0=arr[0][1];
    y1=arr[1][1];
    y2=arr[2][1];
    y3=arr[3][1];
    y4=arr[4][1];
} else if (y === 2) {
    y0=arr[0][2];
    y1=arr[1][2];
    y2=arr[2][2];
    y3=arr[3][2];
    y4=arr[4][2];
} else if (y === 3) {
    y0=arr[0][3];
    y1=arr[1][3];
    y2=arr[2][3];
    y3=arr[3][3];
    y4=arr[4][3];
} else {
    alert("Pleaze Select an Option")
}
        

//------------Create Chart--------------
var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	title: {
		text: tName
	},
	axisX: {
		title: a
	},
	axisY: {
		title: b,
		//suffix: "%"
	},
	data: [{
		type: "line",
		name: "CPU Utilization",
		connectNullData: true,
		//nullDataLineDashType: "solid",
		//xValueType: "dateTime",
		//xValueFormatString: "DD MMM hh:mm TT",
		//yValueFormatString: "#,##0.##\"%\"",
		dataPoints: [
			{ x: x0, y: y0 },
			{ x: x1, y: y1 },
			{ x: x2, y: y2 },
			{ x: x3, y: y3 },
			{ x: x4, y: y4 },
            ]
	}]
});
chart.render();

}
