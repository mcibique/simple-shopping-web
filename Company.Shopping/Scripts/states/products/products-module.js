angular
  .module('products', ['ui.router', 'env'])
  .config(function ($stateProvider, appPath) {
    $stateProvider.state('products', {
      url: '/',
      templateUrl: appPath + '/scripts/states/products/products.html',
      controller: 'ProductsController',
      controllerAs: 'vm',
      resolve: {
        products: function (productsService) {
          return productsService.getProducts();
        }
      }
    });
  });
