$(document).ready(function() {
	let selectedTime = null;

	// Fetch available times when a date is selected
	$('#date').on('change', function() {
		const date = $(this).val();
		if (!date) return;

		$('#timeSlots').empty();
		selectedTime = null;

		$.ajax({
			url: '/api/query-date',
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({ date }),
			success: function(res) {
				if (!res.success) {
					$('#formMessage').removeClass('hidden text-green-600').addClass('text-red-600').text('Hiba a dátum lekérdezésénél').fadeIn();
					return;
				}

				// Populate time slots
				res['free-times'].forEach(slot => {
					const btn = $('<button type="button"></button>')
						.text(`${slot.from} - ${slot.to}`)
						.addClass('p-2 border rounded hover:bg-blue-200 transition')
						.prop('disabled', !slot.available)
						.toggleClass('opacity-50 cursor-not-allowed', !slot.available)
						.on('click', function() {
							$('#timeSlots button').removeClass('bg-blue-600 text-white');
							$(this).addClass('bg-blue-600 text-white');
							selectedTime = slot.from;
						});
					$('#timeSlots').append(btn);
				});
			},
			error: function() {
				$('#formMessage').removeClass('hidden text-green-600').addClass('text-red-600').text('Hálózati hiba').fadeIn();
			}
		});
	});

	// Submit appointment
	$('#submitBtn').on('click', function() {
		const name = $('#name').val().trim();
		const email = $('#email').val().trim();
		const date = $('#date').val();
		const favcolor = $('#favcolor').val();

		if (!name || !email || !date || !selectedTime) {
			$('#formMessage').removeClass('hidden text-green-600').addClass('text-red-600').text('Kérjük, töltse ki az összes mezőt és válasszon időpontot!').fadeIn();
			return;
		}

		const emailParts = email.split('@');
		if (emailParts.length !== 2 || emailParts[0].length === 0 || emailParts[1].length === 0) {
			$('#formMessage').removeClass('hidden text-green-600').addClass('text-red-600').text('Érvénytelen email cím!').fadeIn();
			return;
		}

		$.ajax({
			url: '/api/make-appointment',
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({ name, email, date, time: selectedTime, "fav-color": favcolor }),
			success: function(res) {
				if (res.success) {
					$('#formMessage').removeClass('hidden text-red-600').addClass('text-green-600').text('Időpont foglalása sikeres!').fadeIn();
				} else {
					$('#formMessage').removeClass('hidden text-green-600').addClass('text-red-600').text(res.errmsg).fadeIn();
				}
			},
			error: function() {
				$('#formMessage').removeClass('hidden text-green-600').addClass('text-red-600').text('Hálózati hiba!').fadeIn();
			}
		});
	});
});
