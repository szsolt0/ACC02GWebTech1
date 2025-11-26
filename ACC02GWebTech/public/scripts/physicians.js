(() => {
	// Load physicians.json
	$.getJSON('physicians.json', function(data) {
		const container = $('#physiciansList');
		container.empty();

		data.forEach((doc, index) => {
			const workTypes = doc.work_types.join(', ');

			const doctorCard = $(`
				<div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition duration-300 opacity-0 transform translate-y-4">
					<h3 class="text-xl font-semibold mb-2">${doc.name}</h3>
					<p class="text-gray-700"><strong>Szakterületek:</strong> ${workTypes}</p>
				</div>
			`);

			container.append(doctorCard);

			// Animate each card with staggered fadeIn and slide up
			doctorCard.delay(150 * index).animate(
				{ opacity: 1, top: 0, transform: 'translateY(0)' },
				{ duration: 600, step: function(now, fx) {
					$(this).css('transform', `translateY(${(1 - now) * 20}px)`);
				}}
			);
		});
	}).fail(function() {
		$('#physiciansList').html('<p class="text-red-600">Hiba történt az orvosok betöltése során.</p>');
	});
})();
