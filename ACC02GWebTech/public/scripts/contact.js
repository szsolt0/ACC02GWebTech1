$('#formBtn').on('click', function(e) {
	$('#formMessage').hide().removeClass('text-green-600 text-red-600');

	const name = $('#name').val().trim();
	const email = $('#email').val().trim();
	const subject = $('#subject').val().trim();
	const message = $('#message').val().trim();

	// Basic validation
	if (!name || !email || !subject || !message) {
		$('#formMessage').addClass('text-red-600').text('Kérjük, töltse ki az összes mezőt!').fadeIn();
		return;
	}

	// Simple email check: contains exactly one "@"
	const emailParts = email.split('@');
	if (emailParts.length !== 2 || emailParts[0].length === 0 || emailParts[1].length === 0) {
		$('#formMessage').addClass('text-red-600').text('Érvénytelen email cím!').fadeIn();
		return;
	}

	const payload = {
		sender: { name: name, "reply-to": email },
		subject: subject,
		content: message
	};

	$.ajax({
		url: '/api/sendmsg',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(payload),
		dataType: 'json',
		success: function(response) {
			if (response.success) {
				$('#contactForm').fadeOut(400, function() {
					$('#formMessage').removeClass('text-red-600').addClass('text-green-600').text('Köszönjük! Üzenetét elküldtük.').fadeIn();
				});
			} else {
				$('#formMessage').addClass('text-red-600').text('Hiba: ' + response.errmsg).fadeIn();
			}
		},
		error: function() {
			$('#formMessage').addClass('text-red-600').text('Hiba történt az üzenet küldése során.').fadeIn();
		}
	});
});
