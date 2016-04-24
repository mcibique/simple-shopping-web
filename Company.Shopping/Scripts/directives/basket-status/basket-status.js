angular
  .module('basketStatus', ['env', 'basket'])
  .directive('basketStatus', function basketStatusDirective(appPath, basket) {
    function link(scope, element) {
      scope.getTotalItems = function () {
        return basket.count();
      };
    }

    return {
      restrict: 'A',
      templateUrl: `${appPath}/scripts/directives/basket-status/basket-status.html`,
      scope: true,
      replace: true,
      link
    };
  });
