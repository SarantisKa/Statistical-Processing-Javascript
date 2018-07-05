var exportButton = document.getElementById("exportButton");
exportButton.onclick= function() {exportpdf()};

function exportpdf(){    
 var pdf = new jsPDF();
 var print = document.getElementById("page-wrap")
  print.style.background ="white";
     pdf.addHTML(print, function() {
        pdf.save('*.pdf');
     })
}