(function () {
    'use strict';

    angular
        .module('qorDash.core')
        .directive('horizontalScroll', $HorizontalScroll);

    $HorizontalScroll.$inject = ['jQuery'];
    function $HorizontalScroll($) {
        return {
            restrict: 'ECA',
            terminal: true,
            priority: 400,
            link: function (scope, $element) {
                var hasScrollBar = function ($el) {
                        return $el.length && $el.get(0).scrollHeight > $el.get(0).clientHeight;
                    },
                    hasScrollBarUpwards = function ($el, $till) {
                        if ($el == $till || !$till.has($el).length) {
                            return false
                        }
                        if (hasScrollBar($el)) {
                            return true;
                        }
                        return hasScrollBarUpwards($el.parent(), $till);
                    },
                    isHorizontal = function ($el) {
                        return !hasScrollBar($el.closest('.qor-sheet-content'));
                    },
                    isScrolling = false,
                    previousHorizontal = false,
                    scrollingTimeout;
                $element[0].addEventListener('mousewheel', function (event) {
                    var $target = $(event.target),
                        continuePropagation;
                    if (hasScrollBarUpwards($target, $target.closest('.qor-sheet-content'))) {
                        return
                    }
                    if (isHorizontal($target) || isScrolling && previousHorizontal) {
                        if ($(window).width() >= 768) { // no horizontal scrolling for mobile. only for tablet+
                            if ($element[0].doScroll) {
                                $element[0].doScroll(event.wheelDelta > 0 ? 'left' : 'right');
                            } else if ((event.wheelDelta || event.detail) > 0) {
                                $element[0].scrollLeft -= 20;
                            } else {
                                $element[0].scrollLeft += 20;
                            }
                            continuePropagation = false;
                            previousHorizontal = true;
                        }
                        event.preventDefault();
                    } else {
                        previousHorizontal = false;
                    }
                    isScrolling = true;
                    clearTimeout(scrollingTimeout);
                    scrollingTimeout = setTimeout(function () {
                        isScrolling = false;
                        previousHorizontal = false;
                    }, 400);
                    return continuePropagation;
                });
            }
        };
    }

})();
