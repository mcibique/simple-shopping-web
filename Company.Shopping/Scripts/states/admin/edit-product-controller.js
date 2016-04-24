angular
  .module('admin')
  .controller('EditProductController', function EditProductController($state, productsService, product) {
    const vm = this;

    vm.product = product;

    vm.submit = function (product) {
      productsService.updateProduct(product).then(onProductUpdated);
    };

    function onProductUpdated() {
      $state.go('admin');
    }
  });
