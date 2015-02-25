var position = window.position = require('../');

var boxes = {
	'window <> doc': {
		target: window,
		reportTo: document.getElementById('winpos')
	},
	'doc <> doc': {
		target: document,
		reportTo: document.getElementById('docpos')
	},
	'absolute <> doc': {
		target: document.getElementById('absolute')
	},
	'absolute <> window': {
		target: document.getElementById('absolute-win'),
		relativeTo: window
	},
	'fixed <> doc': {
		target: document.getElementById('fixed'),
	},
	'fixed <> window': {
		target: document.getElementById('fixed-win'),
		relativeTo: window
	},
	'child <> parent': {
		target: document.getElementById('child'),
		relativeTo: document.getElementById('parent')
	}
};

check();

position(document);

function check() {
	var pos;
	for (var name in boxes) {
		pos = position(boxes[name].target, boxes[name].relativeTo);
		(boxes[name].reportTo || boxes[name].target).innerHTML = name + '<br>'
			+ '<br>top: ' + pos.top
			+ '<br>left: ' + pos.left
			+ '<br>width: ' + pos.width
			+ '<br>height: ' + pos.height
			+ '<br>right: ' + pos.right
			+ '<br>bottom: ' + pos.bottom;
	}
}

if (window.addEventListener) {
	window.addEventListener('scroll', check);
	window.addEventListener('resize', check);
	document.addEventListener('click', toggleScroll);
} else {
	window.attachEvent('onscroll', check);
	window.attachEvent('onresize', check);
	document.attachEvent('onclick', toggleScroll);
}

function toggleScroll() {
	document.body.className = document.body.className ? '' : 'scroll';
	check();
}