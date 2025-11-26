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



$('h1').on('mouseleave', function () {
	alert('Elhúzta az egeret a fejléc szövegéről!');
});

$('p').eq(0).find('span').on('click', function () {
	$('p').eq(0).hide();
});

$('p').eq(1).find('span').on('dblclick', function () {
	$('p').eq(1).hide();
});

$('button').hover(
	function () {
		$(this)
			.data('oldText', $(this).text())
			.text('Információ: kattinthatsz rám!');
	},
	function () {
		$(this).text($(this).data('oldText'));
	}
);

$('input').on('mousemove', function (e) {
	if (e.originalEvent.movementY > 0) {
		$(this).css('border', '2px solid blue');
	} else if (e.originalEvent.movementY < 0) {
		$(this).css('border', '2px solid red');
	}
});

$('input').on('click', function () {
	$(this).css('background-color', 'lightgreen');
});
