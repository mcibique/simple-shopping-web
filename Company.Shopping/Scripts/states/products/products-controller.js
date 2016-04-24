angular
  .module('products')
  .controller('ProductsController', function ProductsController(products, basket) {
    const vm = this;
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
