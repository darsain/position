# position

Returns element's position object relative to `document`, `window`, or other elements.

Position object looks like this:

```js
{
	left: 100,   // distance from the left side of a relative target
	top: 100,    // distance from the top side of a relative target
	width: 200,  // width of element's border-box
	heigth: 300, // height of element's border-box
	right: 300,  // left + width
	bottom: 400  // top + height
}
```

###### *Support*

IE8+

## Installation

```
component install darsain/position
```

## Example

```js
var position = require('position');

// get position of an `element` relative to `document.documentElement`
position(element);

// get position of a `window` relative to `document.documentElement` (i.e. viewport position)
position(window);

// get position of a `document.documentElement` relative to itself
// `document` is an alias for `document.documentElement`
// useful for getting the size of a document
position(document);
position(document.documentElement);

// get position of an `element` relative to `window`
position(element, window);

// get position of an `element` relative to other element
position(element, element.parentNode);

// get position of a `documentElement` relative to `window` or other `element`
// I don't know why you'd need this, but yeah, it works this way too
position(document, window);
position(document.documentElement, window);
position(document, element);
position(document.documentElement, element);
```

## API

### position(element, [relativeTo])

Returns position object of an element, or `null` when invalid or detached element has been passed.

**element** and **[relativeTo]** arguments can be any of these:

- `HTMLElement`
- `window`
- `document` - alias for `documentElement`
- `documentElement`

**[relativeTo]** defaults to `documentElement`.

## Quirks

`position()` does what it can to normalize the output between browsers, but there are still some minor inconsistencies.

##### IE8:

- `position(window)` has scrollbars subtracted from its dimensions

## License

MIT