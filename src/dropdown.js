(function () {

	var plugin = 'dropdown';
	var nextSibling = 'nextElementSibling';
	var linkActive = 'classLinkActive';
	var listActive = 'classListActive';
	var instances = [];

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

	var dropdown = {
		init: function (opts) {
			opts = opts || {};
			opts.link = opts.link || '.' + plugin + '-link';
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
		}
	};

	if(typeof exports === 'object') {
		module.exports = dropdown;
	} else {
		window[plugin] = dropdown;
	}

	function Dropdown(opts) {
		var inst = this;
		inst.stack = [];
		inst.opts = opts;

		document.addEventListener('click', function (e) {
			inst.toggle(e.target);
		});
	}

	Dropdown.prototype = {
		toggle: function (target) {
			var inst = this;
			var stack = inst.stack;
			var opts = inst.opts;
			var link = target.closest(opts.link);
			var i;

			for(i = stack.length - 1; ~i; i -= 1) {
				if(isAncestor(target, stack[i][nextSibling]) || link === stack[i]) {
					break;
				}
				inst.close();
			}

			if(link) {
				if(link.matches('.' + opts[linkActive])) {
					inst.close();
				} else {
					inst.open(link);
				}
			}
		},

		open: function (link) {
			var inst = this;
			var list = link[nextSibling];
			var opts = inst.opts;

			if(list && ( ! opts.list || list.matches(opts.list))) {
				inst.stack.push(link);
				link.classList.add(opts[linkActive]);
				list.classList.add(opts[listActive]);
			}
		},

		close: function (link) {
			var inst = this;
			var link = inst.stack.pop();
			var list = link[nextSibling];
			var opts = inst.opts;

			link.classList.remove(opts[linkActive]);
			list.classList.remove(opts[listActive]);
		}
	};

} ());
