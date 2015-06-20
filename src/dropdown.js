(function () {

	var plugin = 'dropdown';
	var linkActive = 'classLinkActive';
	var listActive = 'classListActive';
	var instances = [];
	var cb = {
		'open': [],
		'close': []
	};

	function isAncestor(el, ancestor) {
		var node = el;
		while(node) {
			if(node === ancestor) {
				return true;
			}
			node = node.parentNode;
		}

		return false;
	}

	function getListFn(opt) {
		var type = typeof opt;
		return type === 'function' ? opt :
			function (link) {
				var isString = type === 'string';
				var list = link.nextElementSibling;
				if(isString && list && list.matches(opt) || !isString) {
					return list;
				}
			};
	}

	var dropdown = {
		init: function (opts) {
			opts = opts || {};
			opts.link = opts.link || '.' + plugin + '-link';
			opts.list = getListFn(opts.list);
			opts[linkActive] = opts[linkActive] || plugin + '-active';
			opts[listActive] = opts[listActive] || opts[linkActive];

			instances.push(new Dropdown(opts));
		},

		close: function () {
			var inst, i;
			for(i = instances.length - 1; ~i; i -= 1) {
				inst = instances[i];
				if(inst.stack.length) {
					inst.close();
					return true;
				}
			}

			return false;
		},

		on: function (name, callback) {
			if((name === 'open' || name === 'close') && typeof callback === 'function') {
				cb[name].push(callback)
			}
		}
	};

	if(typeof exports === 'object') {
		module.exports = dropdown;
	} else {
		window[plugin] = dropdown;
	}

	function Dropdown(opts) {
		var inst = this;
		var stack = inst.stack = [];
		inst.opts = opts;

		document.addEventListener('click', function (e) {
			var target = e.target;
			var link = target.closest(opts.link);
			var i;

			for(i = stack.length - 1; ~i; i -= 1) {
				if(link === stack[i] || isAncestor(target, opts.list(stack[i]))) {
					break;
				}
				inst.close();
			}

			if(link) {
				e.preventDefault();
				if(link.matches('.' + opts[linkActive])) {
					inst.close();
				} else {
					inst.open(link);
				}
			}
		});
	}

	Dropdown.prototype = {
		open: function (link) {
			var inst = this;
			var opts = inst.opts;
			var list = opts.list(link);
			var callbacks = cb.open;
			var i;

			if(list) {
				for(i = 0; i < callbacks.length; i++) {
					callbacks[i](link, list, opts);
				}
				inst.stack.push(link);
				link.classList.add(opts[linkActive]);
				list.classList.add(opts[listActive]);
			}
		},

		close: function () {
			var inst = this;
			var opts = inst.opts;
			var link = inst.stack.pop();
			var list = opts.list(link);
			var callbacks = cb.close;
			var i;

			for(i = 0; i < callbacks.length; i++) {
				callbacks[i](link, list, opts);
			}
			link.classList.remove(opts[linkActive]);
			list.classList.remove(opts[listActive]);
		}
	};

} ());
