angular
  .module('checkout', ['ui.router', 'env'])
  .config(function ($stateProvider, appPath) {
    $stateProvider.state('checkout', {
      url: '/checkout',
      templateUrl: appPath + '/scripts/states/checkout/checkout.html',
      controller: 'CheckoutController',
      controllerAs: 'vm'
    });
  });
