# position

Returns element's position box object relative to documentElement.

## Installation

```
$ component install darsain/position
```

## Example

```js
var position = require('position');

console.log(position(element));
```

Position box object looks like this:

```
{
	left: 100,
	top: 100,
	width: 200,
	heigth: 300,
	right: 300,
	bottom: 400
}
```

You can also pass `window` to get the current window position on a page.

## License

MIT