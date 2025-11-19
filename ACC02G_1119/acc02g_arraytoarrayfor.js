const SZObj = {
	"name": "Sebe Zsolt",
	"age": 22,
	"cars": [
		{ "name": "Toyota", "models": ["CHR", "Corolla", "Proace"] },
		{ "name": "Ford",   "models": ["Kuga", "Mondeo", "Mustang"] },
		{ "name": "BMW",    "models": ["320", "X3", "X5"] },
		{ "name": "Fiat",   "models": ["500", "Panda", "Tipo"] }
	]
};

const createAndAppend = (what, where) => {
	const x = document.createElement(what);
	where.appendChild(x);
	return x;
};

const appendH3 = (text) => {
	const h3 = createAndAppend('h3', document.body);
	h3.innerText = text;
};

const appendList = (items) => {
	const ul = createAndAppend('ul', document.body);

	for (const item of items) {
		const li = createAndAppend('li', ul);
		li.innerText = item;
	}
};

(() => {
	const obj = SZObj;

	document.getElementById('stud-name').innerText = `${obj.name} (${obj.age})`;

	for (const car of obj.cars) {
		appendH3(car.name);
		appendList(car.models);
	}
})();
