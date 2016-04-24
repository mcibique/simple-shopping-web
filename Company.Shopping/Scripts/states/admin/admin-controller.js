angular
  .module('admin')
  .controller('ProductManagementController', function ProductManagementController(productsService, products) {
    const vm = this;

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
