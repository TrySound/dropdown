# Dropdown
Just control all custom dropdowns on your page

## Dependencies

dropdown dependent of [classList shim](https://github.com/jwilsson/domtokenlist) and new [closest shim](https://github.com/jonathantneal/closest)

## Usage

```js
dropdown.init()
```

```html
<div class="dropdown">
		<span class="dropdown-link">Link 1</span>
		<ul class="dropdown-list">
			<li class="dropdown">
				<span class="dropdown-link">Link 1</span>
				<ul class="dropdown-list">
					<li>Content 1</li>
					<li>Content 2</li>
					<li>Content 3</li>
				</ul>
			</li>
			<li class="dropdown">
				<span class="dropdown-link">Link 2</span>
				<ul class="dropdown-list">
					<li>Content 1</li>
					<li>Content 2</li>
					<li>Content 3</li>
				</ul>
			</li>
		</ul>
</div>
```

```css
.dropdown {
	position: relative;
}

.dropdown-link {
	cursor: pointer;
}

.dropdown-list {
	visibility: hidden;
	position: absolute;
	left: 0;
	top: 100%;
}

.dropdown-active {
	z-index: 100;
	visibility: visible;
}
```

## API

### dropdown.init(opts)

Initialize click listener on links

#### Options

**link** - selector of clickable trigger

Default: `'.dropdown-link'`

**list** - selector of content that will be matched with next sibling

Default: `undefined`

**classLinkActive**

Default: `'dropdown-active'`

**classListActive**

Default: `classLinkActive value`

### dropdown.close()

Close last opened dropdown and return true if it existed

### dropdown.on(name, callback)

**name:** `'open'` or `'close'`

**callback:** `function (link, list, opts)`

Could be useful for plugins


##License

[The MIT License (MIT)](LICENSE.md)

Copyright &copy; 2015 Bogdan Chadkin
