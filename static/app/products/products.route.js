(function() {
    'use strict';

    angular
        .module('app.products')
        .run(appRun);

    function appRun(routeHelper) {
        routeHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app.products',
                config: {
                    url: '/',
                    views: {
                        'content@': {
                            templateUrl: '/app/products/products.html',
                            controller: 'Products',
                            controllerAs: 'vm'
                        }
                    }
                }
            }
        ];
    }
})();