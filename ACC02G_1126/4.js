// ------------------------------
// 3 bekezdés kezelése
// ------------------------------

// Elrejt
$('#pHide').on('click', function () {
	$('p').hide();
});

// Megjelenít
$('#pShow').on('click', function () {
	$('p').show();
});

// Toggle
$('#pToggle').on('click', function () {
	$('p').toggle();
});


// ------------------------------
// Űrlap áttetszőség
// ------------------------------

$('#op1').on('click', function () {
	$('#myForm').css('opacity', 0.1);
});

$('#op5').on('click', function () {
	$('#myForm').css('opacity', 0.5);
});

$('#op8').on('click', function () {
	$('#myForm').css('opacity', 0.8);
});


// ------------------------------
// Űrlap elrejtés / megjelenítés
// ------------------------------

$('#formHide').on('click', function () {
	$('#myForm').hide();
});

$('#formShow').on('click', function () {
	$('#myForm').show();
});

$('#formToggle').on('click', function () {
	$('#myForm').toggle();
});
