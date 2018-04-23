angular.element(document).ready(function($timeout) {
    function fix_height() {
        var heightWithoutNavbar = angular.element("body > #wrapper").height();
        angular.element(".sidebar-panel").css("min-height", heightWithoutNavbar + "px");

        var navbarHeight = angular.element('nav.navbar-default').height();
        var wrapperHeight = angular.element('#page-wrapper').height();

        if (navbarHeight >= wrapperHeight) {
            angular.element('#page-wrapper').css("min-height", navbarHeight + "px");
        }

        if (navbarHeight < wrapperHeight) {
            angular.element('#page-wrapper').css("min-height", angular.element(window).height() + "px");
        }

        if (angular.element('body').hasClass('fixed-nav')) {
            if (navbarHeight > wrapperHeight) {
                angular.element('#page-wrapper').css("min-height", navbarHeight + 60 + "px");
            } else {
                angular.element('#page-wrapper').css("min-height", angular.element(window).height() + "px");
            }
        }

    }

    angular.element(window).bind("load resize scroll", function() {
        fix_height();
    });

    angular.element(window).bind("load", function() {
        if (angular.element('body').hasClass('body-small')) {
            angular.element('body').removeClass('mini-navbar')
        }
    });


    $timeout(function() {
        fix_height();
    }, 100);

    // Minimalize menu when screen is less than 768 px

    angular.element(window).bind("load resize", function() {
        if (angular.element(document).width() < 769) {
            angular.element('body').addClass('body-small')
            fix_height();
        } else {
            angular.element('body').removeClass('body-small');
            fix_height();
        }
    })

});