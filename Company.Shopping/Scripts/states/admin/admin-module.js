angular
  .module('admin', ['ui.router', 'env'])
  .config(function ($stateProvider, appPath) {
    $stateProvider.state('admin', {
      url: '/admin',
      templateUrl: appPath + '/scripts/states/admin/admin.html',
      controller: 'ProductManagementController',
      controllerAs: 'vm',
      resolve: {
        products: function (productsService) {
          return productsService.getProducts();
        }
      }
    })
    .state('create', {
      parent: '',
      url: '/create',
      templateUrl: appPath + '/scripts/states/admin/create-product.html',
      controller: 'CreateProductController',
      controllerAs: 'vm'
    })
    .state('edit', {
      parent: '',
      url: '/edit/:id',
      templateUrl: appPath + '/scripts/states/admin/edit-product.html',
      controller: 'EditProductController',
      controllerAs: 'vm',
      resolve: {
        product: function ($stateParams, productsService) {
          return productsService.getProduct($stateParams.id);
        }
      }
    });
  });
