(function() {
    'use strict';

    angular
        .module('app.header')
        .run(appRun);

    function appRun(routeHelper) {
        routeHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app',
                config: {
                    url: '',
                    abstract: true,
                    views: {
                        'header@': {
                            templateUrl: '/app/header/header.html'
                        }
                    }
                }
            }
        ];
    }
})();