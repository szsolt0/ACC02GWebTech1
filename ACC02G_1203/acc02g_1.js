const loadData = async () => {
	const place = $('#place');
	const {kurzus, cim, telefonszam} = await $.getJSON('acc02g_orarend.json')

	place.empty()

	place.append('<h2>MISKOLCI EGYETEM</2>');

	const fullAddress = `${cim.iranyitoszam} ${cim.varos} ${cim.utca}`;

	$("<p>")
		.append($("<strong>").text("Cím: "))
		.append(document.createTextNode(fullAddress))
		.appendTo(place);

	place.append('<p><strong>Telefonszám</strong></p>');

	for (const num of telefonszam) {
		$("<p>")
			.text(`${num.tipus}: ${num.szam}`)
			.appendTo(place);
	}

	place.append('<p><strong>MI, PTI Órarend 2025 tavasz</strong></p>');

	for (const course of kurzus) {
		$("<p>")
			.append($("<strong>").text("Időpont:"))
			.append('<br>')
			.append(document.createTextNode(`Nap: ${course.idopont.nap}`))
			.append('<br>')
			.append(document.createTextNode(`Tól: ${course.idopont.tol}\nIg: ${course.idopont.ig}`))
			.append('<br>')
			.append(document.createTextNode(`Ig: ${course.idopont.ig}`))
			.appendTo(place);

		$("<p>")
			.append($("<strong>").text("Helyszín: "))
			.append(document.createTextNode(course.helyszin))
			.appendTo(place);

		$("<p>")
			.append($("<strong>").text("Oktató: "))
			.append(document.createTextNode(course.oktato))
			.appendTo(place);

		$("<p>")
			.append($("<strong>").text("Szak: "))
			.append(document.createTextNode(course.szak))
			.appendTo(place);

		$("<p>")
			.append($("<strong>").text("Típus: "))
			.append(document.createTextNode(course.tipus))
			.appendTo(place);
	}
};
