(function() {
	'use strict';

	angular
		.module('app', [
			// Application
			'app.data',
			'app.header',
			'app.products',

			// Components
			'app.directives',

			// Configuration
			'app.router'
		]);
})();