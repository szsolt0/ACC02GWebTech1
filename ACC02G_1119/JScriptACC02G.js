const createAndAppend = (what, where) => {
	const x = document.createElement(what);
	where.appendChild(x);
	return x;
};

const writeSubject = (subject, place) => {
	const tárgy = createAndAppend('p', place);
	tárgy.style.color = 'blue';
	tárgy.innerText = `Tárgy: ${subject.targy}`;

	createAndAppend('p', place).innerText = `Helyszín: ${subject.helyszin}`;
	createAndAppend('p', place).innerText = `Oktató: ${subject.oktato}`;
	createAndAppend('p', place).innerText = `Szak: ${subject.szak}`;
	createAndAppend('p', place).innerText = `Időpont: ${subject.idopont.nap} ${subject.idopont.tol} - ${subject.idopont.ig}`;
	createAndAppend('br', place);
};

(async () => {
	const json = await (await fetch('orarendACC02G.json')).json();
	const subjects = json.ACC02G_orarend.ora;
	const place = document.body;

	for (const subject of subjects) {
		writeSubject(subject, place);
	}
})();
