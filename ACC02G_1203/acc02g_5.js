// 1. Szöveg hozzáadása
$("#addText").click(function () {
	$("#box").append("<br>Programtervező informatikus");
});

// 2. Gomb → hozzáfűzi: PTI MI Gomb
$("#addGomb").click(function () {
	$("#box").append("<br>PTI MI Gomb");
});

// 3. Új gomb felvétele → a forrás után egy új gomb jön létre
$("#addNewButton").click(function () {
	$("#box").append("<br><button>ME GEIK-PTI</button>");
});

// 4. Fejléc felvétele
$("#addHeader").click(function () {
	$("body").prepend("<h1>jQuery feladat</h1>");
});

// 5. Alcím felvétele
$("#addSubtitle").click(function () {
	$("body").prepend("<h2>HTML metódusok</h2>");
});

// 6. Űrlap fejléc felvétele
$("#addFormHeader").click(function () {
	$("#formarea").prepend("<h3>ŰRLAP – NEPTUNKÓD</h3>");
});
