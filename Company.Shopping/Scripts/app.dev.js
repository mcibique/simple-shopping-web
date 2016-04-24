    (function (window, document, angular) {
      'use strict';
      angular.module('products', [
        'ui.router',
        'env'
      ]).config(function ($stateProvider, appPath) {
        $stateProvider.state('products', {
          url: '/',
          templateUrl: appPath + '/scripts/states/products/products.html',
          controller: 'ProductsController',
          controllerAs: 'vm',
          resolve: {
            products: function products(productsService) {
              return productsService.getProducts();
            }
          }
        });
      });
      'use strict';
      angular.module('products').controller('ProductsController', function ProductsController(products, basket) {
        var vm = this;
        vm.products = products;
        vm.addToBasket = function (product) {
          return basket.add(product);
        };
        vm.isProductInBasket = function (product) {
          return !!basket.getProductAmount(product.id);
        };
        vm.getProductAmount = function (product) {
          return basket.getProductAmount(product.id);
        };
      });
      'use strict';
      angular.module('checkout', [
        'ui.router',
        'env'
      ]).config(function ($stateProvider, appPath) {
        $stateProvider.state('checkout', {
          url: '/checkout',
          templateUrl: appPath + '/scripts/states/checkout/checkout.html',
          controller: 'CheckoutController',
          controllerAs: 'vm'
        });
      });
      'use strict';
      angular.module('checkout').controller('CheckoutController', function CheckoutController($state, basket, orderService) {
        var vm = this;
        vm.address = getEmptyAddress();
        loadBasketProducts();
        vm.getProductAmount = function (product) {
          return basket.getProductAmount(product.id);
        };
        vm.increase = function (product) {
          basket.add(product);
        };
        vm.decrease = function (product) {
          basket.remove(product);
          loadBasketProducts();
        };
        vm.clearBasket = function () {
          basket.clear();
          vm.address = getEmptyAddress();
        };
        vm.submit = function () {
          var basketAmounts = basket.getProductAmounts();
          var orderAmounts = [];
          for (var key in basketAmounts) {
            orderAmounts.push({
              productId: key,
              amount: basketAmounts[key]
            });
          }
          var order = {
            deliveryAddress: vm.address,
            products: orderAmounts
          };
          orderService.placeOrder(order).then(function () {
            basket.clear();
            // TODO: show the success message in the modal dialogue or as a floating message.
            alert('Your order has been successfully placed.');
            $state.go('products');
          });
        };
        vm.getTotal = function () {
          return basket.getTotal();
        };
        function loadBasketProducts() {
          vm.basketProducts = basket.getProducts();
        }
        function getEmptyAddress() {
          return {
            firstName: '',
            lastName: '',
            firstAddressLine: '',
            secondAddressLine: '',
            postCode: '',
            city: ''
          };
        }
      });
      'use strict';
      angular.module('admin', [
        'ui.router',
        'env'
      ]).config(function ($stateProvider, appPath) {
        $stateProvider.state('admin', {
          url: '/admin',
          templateUrl: appPath + '/scripts/states/admin/admin.html',
          controller: 'ProductManagementController',
          controllerAs: 'vm',
          resolve: {
            products: function products(productsService) {
              return productsService.getProducts();
            }
          }
        }).state('create', {
          parent: '',
          url: '/create',
          templateUrl: appPath + '/scripts/states/admin/create-product.html',
          controller: 'CreateProductController',
          controllerAs: 'vm'
        }).state('edit', {
          parent: '',
          url: '/edit/:id',
          templateUrl: appPath + '/scripts/states/admin/edit-product.html',
          controller: 'EditProductController',
          controllerAs: 'vm',
          resolve: {
            product: function product($stateParams, productsService) {
              return productsService.getProduct($stateParams.id);
            }
          }
        });
      });
      'use strict';
      angular.module('admin').controller('EditProductController', function EditProductController($state, productsService, product) {
        var vm = this;
        vm.product = product;
        vm.submit = function (product) {
          productsService.updateProduct(product).then(onProductUpdated);
        };
        function onProductUpdated() {
          $state.go('admin');
        }
      });
      'use strict';
      angular.module('admin').controller('CreateProductController', function CreateProductController($state, productsService) {
        var vm = this;
        vm.product = {};
        vm.submit = function (product) {
          productsService.createProduct(product).then(onProductCreated);
        };
        function onProductCreated() {
          $state.go('admin');
        }
      });
      'use strict';
      angular.module('admin').controller('ProductManagementController', function ProductManagementController(productsService, products) {
        var vm = this;
        vm.products = products;
        vm.deleteProduct = function (product) {
          productsService.deleteProduct(product.id).then(onProductDeleted);
        };
        function onProductDeleted() {
          productsService.getProducts().then(function (products) {
            vm.products = products;
          });
        }
      });
      'use strict';
      angular.module('rating', ['env']).directive('rating', function (appPath) {
        function link(scope) {
          scope.stars = [];
          scope.stars.length = scope.rating;
        }
        return {
          restrict: 'A',
          templateUrl: appPath + '/scripts/directives/rating/rating.html',
          scope: { rating: '=' },
          link: link
        };
      });
      'use strict';
      angular.module('basketStatus', [
        'env',
        'basket'
      ]).directive('basketStatus', function basketStatusDirective(appPath, basket) {
        function link(scope, element) {
          scope.getTotalItems = function () {
            return basket.count();
          };
        }
        return {
          restrict: 'A',
          templateUrl: appPath + '/scripts/directives/basket-status/basket-status.html',
          scope: true,
          replace: true,
          link: link
        };
      });
      'use strict';
      angular.module('productsService', ['env']).factory('productsService', function productsService($http, apiPath) {
        function getProducts() {
          return $http.get(apiPath + '/products/').then(function (response) {
            return response.data;
          });
        }
        function getProduct(id) {
          return $http.get(apiPath + '/products/' + id).then(function (response) {
            return response.data;
          });
        }
        function updateProduct(product) {
          return $http.put(apiPath + '/products/' + product.id, product).then(function (response) {
            return response.data;
          });
        }
        function createProduct(product) {
          return $http.post(apiPath + '/products/', product).then(function (response) {
            return response.data;
          });
        }
        function deleteProduct(id) {
          return $http.delete(apiPath + '/products/' + id).then(function (response) {
            return response.data;
          });
        }
        return {
          getProducts: getProducts,
          getProduct: getProduct,
          updateProduct: updateProduct,
          createProduct: createProduct,
          deleteProduct: deleteProduct
        };
      });
      'use strict';
      angular.module('orderService', ['env']).factory('orderService', function ($http, apiPath) {
        function placeOrder(order) {
          return $http.post(apiPath + '/checkout/', order).then(function (response) {
            return response.data;
          });
        }
        return { placeOrder: placeOrder };
      });
      'use strict';
      angular.module('basket', []).factory('basket', function () {
        var products = [];
        var productAmount = Object.create(null);
        var totalItems = 0;
        function add(product) {
          var productId = product.id;
          if (productAmount[productId]) {
            productAmount[productId]++;
          } else {
            products.push(product);
            productAmount[productId] = 1;
          }
          totalItems++;
        }
        function remove(product) {
          var productId = product.id;
          var amount = productAmount[productId];
          if (amount) {
            productAmount[productId]--;
            if (amount <= 1) {
              delete productAmount[productId];
              products = products.filter(function (p) {
                return p.id !== productId;
              });
            }
            totalItems--;
          }
        }
        function clear() {
          products.length = 0;
          productAmount = Object.create(null);
          totalItems = 0;
        }
        function count() {
          return totalItems;
        }
        function getProductAmount(productId) {
          return productAmount[productId] || 0;
        }
        function getProductAmounts() {
          return productAmount;
        }
        function getProducts() {
          return products;
        }
        function getTotal() {
          var total = 0;
          products.forEach(function (product) {
            var amount = productAmount[product.id];
            if (!amount) {
              return;
            }
            total += amount * product.price;
          });
          return total;
        }
        return {
          getProducts: getProducts,
          add: add,
          remove: remove,
          clear: clear,
          count: count,
          getProductAmount: getProductAmount,
          getProductAmounts: getProductAmounts,
          getTotal: getTotal
        };
      });
      'use strict';
      angular.module('states', [
        'products',
        'admin',
        'checkout'
      ]);
      angular.module('services', [
        'basket',
        'orderService',
        'productsService'
      ]);
      angular.module('directives', [
        'basketStatus',
        'rating'
      ]);
      angular.module('shopping', [
        'ui.router',
        'env',
        'states',
        'services',
        'directives'
      ]).config(function ($urlRouterProvider, $logProvider, debug) {
        $logProvider.debugEnabled(debug);
        $urlRouterProvider.otherwise('/');
      }).run(function ($log, debug) {
        $log.info('Shopping application is running in ' + (debug ? 'debug' : 'production') + ' mode.');
      });
      'use strict';
      angular.module('shopping').controller('HeaderController', function HeaderController($state) {
        var vm = this;
        vm.shouldShowBasketStatus = function () {
          return $state.includes('products');
        };
      });
    }(window, document, window.angular));
//# sourceMappingURL=app.dev.js.map
