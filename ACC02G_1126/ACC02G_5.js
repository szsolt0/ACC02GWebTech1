$('#startAnim').on('click', function () {

	const box = $('#box');

	// Reset box to starting position and size
	box.css({
		left: '300px',
		top: '250px',
		width: '300px',
		height: '150px',
		fontSize: '12pt',
		opacity: 1
	});

	// Animation speed (ms)
	const speed = 800;

	// 1. Move RIGHT, grow width + font
	box.animate(
		{ left: '600px', width: '450px', fontSize: '30pt' },
		speed
	)

	// 2. Move DOWN, shrink width, grow height 10%
	.animate(
		{ top: '450px', width: '300px', height: '165px' },
		speed
	)

	// 3. Move LEFT to corner, lower opacity
	.animate(
		{ left: '0px', opacity: 0.4 },
		speed
	)

	// 4. Return to start position, reset font & opacity
	.animate(
		{
			left: '300px',
			top: '250px',
			width: '300px',
			height: '150px',
			fontSize: '12pt',
			opacity: 1
		},
		speed,
		function () {
			// Final message
			alert("VÉGE");
		}
	);
});



$('#hideParas').on('click', function () {

	// Hide all paragraphs
	$('p').hide();

	// Move the box to the position where paragraphs were
	$('#box').animate(
		{ top: '50px' }, // moves upward where paragraphs were
		600
	);

	// Final message
	alert("Bekezdések elrejtése");
});



let folded = false;

$('#toggleBox').on('click', function () {

	const box = $('#box');

	if (!folded) {
		// Fold the box
		box.animate(
			{ height: '0px', opacity: 0.3 },
			500
		);
	} else {
		// Unfold the box
		box.animate(
			{ height: '150px', opacity: 1 },
			500
		);
	}

	folded = !folded;

	// After fold/unfold → move right and stop
	box.animate(
		{ left: '500px' },
		500
	);
});
