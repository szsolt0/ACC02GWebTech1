const hidePars = () => {
	$('.hide').hide();
};

const k1Pressed = () => {
	$('ul').each(function (_index) {
		$(this).children('li:lt(2)').hide();
	});

	$('[href]').removeAttr('href');
};

const k2Pressed = () => {
	k1Pressed();
	$('#k2').hide();
};

const k3Pressed = () => {
	k1Pressed();

	for (let i = 1; i < 7; ++i) {
		$(`h${i}`).hide();
	}
};

const k4Pressed = () => {
	k1Pressed();
	$('a').hide();
};

const k5Pressed = () => {
	k1Pressed();
	$('table tr:odd').hide();
};
