angular
  .module('rating', ['env'])
  .directive('rating', function (appPath) {
    function link(scope) {
      scope.stars = [];
      scope.stars.length = scope.rating;
    }

    return {
      restrict: 'A',
      templateUrl: `${appPath}/scripts/directives/rating/rating.html`,
      scope: {
        rating: '='
      },
      link
    }
  });
