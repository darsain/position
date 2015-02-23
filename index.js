module.exports = position;

var win = window;
var doc = win.document;
var docEl = doc.documentElement;

/**
 * Poor man's shallow object extend.
 *
 * @param {Object} a
 * @param {Object} b
 *
 * @return {Object}
 */
function extend(a, b) {
	for (var key in b) a[key] = b[key];
	return a;
}

/**
 * Checks whether object is window.
 *
 * @param {Object} obj
 *
 * @return {Boolean}
 */
function isWin(obj) {
	return obj && obj.setInterval != null;
}

/**
 * Returns element's object with `left`, `top`, `bottom`, `right`, `width`, and `height`
 * properties indicating the position and dimensions of element on a page.
 *
 * @param {Element} element
 *
 * @return {Object}
 */
function position(element) {
	var winTop = win.pageYOffset || docEl.scrollTop;
	var winLeft = win.pageXOffset || docEl.scrollLeft;
	var box = { left: 0, right: 0, top: 0, bottom: 0, width: 0, height: 0 };

	if (isWin(element)) {
		box.width = win.innerWidth || docEl.clientWidth;
		box.height = win.innerHeight || docEl.clientHeight;
	} else if (docEl.contains(element) && element.getBoundingClientRect != null) {
		extend(box, element.getBoundingClientRect());
		// width & height don't exist in <IE9
		box.width = box.right - box.left;
		box.height = box.bottom - box.top;
	} else {
		return box;
	}

	box.top = box.top + winTop - docEl.clientTop;
	box.left = box.left + winLeft - docEl.clientLeft;
	box.right = box.left + box.width;
	box.bottom = box.top + box.height;

	return box;
}