angular
  .module('admin')
  .controller('CreateProductController', function CreateProductController($state, productsService) {
    const vm = this;

    vm.product = {};

    vm.submit = function (product) {
      productsService.createProduct(product).then(onProductCreated);
    };

    function onProductCreated() {
      $state.go('admin');
    }
  });
