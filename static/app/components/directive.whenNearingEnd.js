(function() {
    'use strict';

    angular
        .module('app.directives')
        .directive('whenNearingEnd', whenNearingEnd);

    function whenNearingEnd() {
        var directive = {
            restrict: "A",
            scope: {whenNearingEnd: '&whenNearingEnd'},
            link: link
        };
        return directive;

        function link (scope, element, attrs) {
            var threshold = 100; // pixels

            $(window).scroll(checkScroll);
            $(window).scroll();  // dummy event in case entire page fits on screen

            function checkScroll() {
                if (nearBottomOfPage()) {
                    // call the loading function
                    scope.whenNearingEnd();
                }
            }

            function nearBottomOfPage() {
                return $(window).scrollTop() > ($(document).height() - $(window).height() - threshold);
            }
        }
    }
})();