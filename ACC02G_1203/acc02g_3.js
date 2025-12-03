// start animation
$("#anim").click(function () {

	let speed = 800; // ms

	$("#box")
		.css({
			left: "300px",
			width: "300px",
			height: "80px",
			fontSize: "12pt",
			opacity: 1
		})

		.animate({
			left: "600px",
			width: "450px",
			fontSize: "30pt"
		}, speed)

		.animate({
			top: "150px",
			width: "250px",
			height: "120px"
		}, speed)

		.animate({
			left: "0px",
			opacity: 0.4
		}, speed)

		.animate({
			left: "300px",
			top: "0px",
			width: "300px",
			height: "80px",
			fontSize: "12pt",
			opacity: 1
		}, speed, function () {
			alert("VÉGE");
		});
});


// hide par
$("#hidep").click(function () {
	$("p").slideUp(500, function () {

		$("#box").css({
			marginTop: "20px"
		});

		alert("Bekezdések elrejtése");
	});
});


let open = true;

$("#toggle").click(function () {

	if (open) {
		$("#box").animate({
			width: "0px",
			height: "0px",
			fontSize: "0pt",
			opacity: 0.5
		}, 500, function () {
			$("#box").animate({
				left: "500px"
			}, 500);
		});
	} else {
		$("#box").animate({
			width: "300px",
			height: "80px",
			fontSize: "12pt",
			opacity: 1
		}, 500, function () {
			$("#box").animate({
				left: "500px"
			}, 500);
		});
	}

	open = !open;
});
