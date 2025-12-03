$('#calc-btn').on('click', function () {

	// Read input values
	let a = parseFloat($('#a').val());
	let b = parseFloat($('#b').val());

	// Read selected operation
	let op = $('input[name="operation"]:checked').val();

	// Validate numbers
	if (isNaN(a) || isNaN(b)) {
		$('#result').text("Please enter both numbers!");
		return;
	}

	// Validate selection
	if (!op) {
		$('#result').text("Please select an operation!");
		return;
	}

	let result;

	// Perform the operation
	switch (op) {

		case "A*B":
			result = a * b;
			break;

		case "A/B":
			if (b === 0) {
				result = "Cannot divide by zero!";
			} else {
				result = a / b;
			}
			break;

		case "A+B":
			result = a + b;
			break;

		case "A-B":
			result = a - b;
			break;

		default:
			result = "Unknown operation!";
	}

	// Display result
	$('#result').text(result);
});
