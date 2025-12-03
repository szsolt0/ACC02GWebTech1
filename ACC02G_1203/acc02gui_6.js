$("#op-buttons input").checkboxradio();
$("#op-buttons").controlgroup();


// ACC02G_1126/ACC02G_5

$("#anim-box").draggable();     // jQuery UI feature
$("#anim-box").resizable();     // jQuery UI feature

$("#startAnim").click(function () {

	$("#anim-box")
		.animate({ left: "600px", width: "350px", fontSize: "24px" }, 700)
		.animate({ top: "400px", width: "200px", height: "180px" }, 700)
		.animate({ left: "0px", opacity: 0.4 }, 700)
		.animate({ left: "300px", top: "250px", opacity: 1 }, 700, function () {

			// jQuery UI dialog effect
			$("<div>VÉGE</div>").dialog({
				modal: true,
				title: "Animáció befejezve",
				buttons: { OK: function () { $(this).dialog("close"); } }
			});

		});
});

$("#hideParas").click(function () {
	$("#p1, #p2, #p3").toggle("fold", 500);
});

$("#toggleBox").click(function () {
	$("#anim-box").toggle("puff", 600);
});



// ACC02G_1126/ACC02G_6

$("#calc-dialog").dialog({
	autoOpen: false,
	modal: true,
	width: 300
});

$("#calc-btn").click(function () {

	let a = parseFloat($("#a").val());
	let b = parseFloat($("#b").val());
	let op = $("input[name='operation']:checked").val();

	if (isNaN(a) || isNaN(b)) {
		$("#dialog-result").text("Hiba: Mindkét szám szükséges!");
		$("#calc-dialog").dialog("open");
		return;
	}

	if (!op) {
		$("#dialog-result").text("Hiba: Nincs kiválasztva művelet!");
		$("#calc-dialog").dialog("open");
		return;
	}

	let result = 0;

	switch (op) {
		case "mul": result = a * b; break;
		case "div": result = b !== 0 ? a / b : "Hiba: 0-val nem lehet osztani"; break;
		case "add": result = a + b; break;
		case "sub": result = a - b; break;
	}

	$("#dialog-result").text("Eredmény: " + result);
	$("#calc-dialog").dialog("open");

	// jQuery UI effect on inputs
	$("#a, #b").effect("highlight", { color: "#ffd27f" }, 1200);
});
