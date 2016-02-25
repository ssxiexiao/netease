'use strict';
angular.module('appDirective', [])
  .directive('detailView', function($window) {
    return {
      restrict: 'EA',
      replace: 'true',
      link: function(scope, elem, attrs) {
        var d3 = $window.d3;
        var svgBody = d3.select(elem[0]).select('svg');
        var svgWidth = 1000;
        var svgHeight = 1000;
        if (svgBody.empty()) svgBody = d3.select(elem[0]).append('svg').attr('width', svgWidth).attr('height', svgHeight);
      }
    };
  });