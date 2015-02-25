var isWindow = require('iswindow');

module.exports = position;

/**
 * Poor man's shallow object extend;
 *
 * @param  {Object} a
 * @param  {Object} b
 * @return {Object}
 */
function extend(a, b) {
	for (var k in b) a[k] = b[k];
	return a;
}

/**
 * Returns element's position object with `left`, `top`, `bottom`, `right`,
 * `width`, and `height` properties indicating the position and dimensions
 * of element on a page, or relative to other element.
 *
 * @param {Element} element
 * @param {Element} [relativeTo] Defaults to `document.documentElement`.
 *
 * @return {Object|null}
 */
function position(element, relativeTo) {
	var isWin = isWindow(element);
	var doc = isWin ? element.document : element.ownerDocument || element;
	var docEl = doc.documentElement;
	var win = isWindow(relativeTo) ? relativeTo : doc.defaultView || window;

	// normalize arguments
	if (element === doc) element = docEl;
	relativeTo = !relativeTo || relativeTo === doc ? docEl : relativeTo;

	var winTop = (win.pageYOffset || docEl.scrollTop) - docEl.clientTop;
	var winLeft = (win.pageXOffset || docEl.scrollLeft) - docEl.clientLeft;
	var box = { top: 0, left: 0 };

	if (isWin) {
		box.width = box.right = win.innerWidth || docEl.clientWidth;
		box.height = box.bottom = win.innerHeight || docEl.clientHeight;
	} else if (element === docEl) {
		// we need to do  this manually because docEl.getBoundingClientRect
		// is inconsistent in <IE11
		box.top = -winTop;
		box.left = -winLeft;
		box.width = Math.max(docEl.clientWidth, docEl.scrollWidth);
		box.height = Math.max(docEl.clientHeight, docEl.scrollHeight);
		box.right = box.width - winLeft;
		box.bottom = box.height - winTop;
	} else if (docEl.contains(element) && element.getBoundingClientRect) {
		// new object needed because DOMRect properties are read-only
		box = extend({}, element.getBoundingClientRect());
		// width & height don't exist in <IE9
		box.width = box.right - box.left;
		box.height = box.bottom - box.top;
	} else {
		return null;
	}

	// current box is already relative to window
	if (relativeTo === win) return box;

	// add window offsets, making the box relative to documentElement
	box.top += winTop;
	box.left += winLeft;
	box.right += winLeft;
	box.bottom += winTop;

	// current box is already relative to documentElement
	if (relativeTo === docEl) return box;

	// subtract position of other element
	var relBox = position(relativeTo);
	box.left -= relBox.left;
	box.right -= relBox.left;
	box.top -= relBox.top;
	box.bottom -= relBox.top;

	return box;
}