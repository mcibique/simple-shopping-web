angular
  .module('checkout')
  .controller('CheckoutController', function CheckoutController($state, basket, orderService) {
    const vm = this;

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
      let basketAmounts = basket.getProductAmounts();
      let orderAmounts = [];

      for (let key in basketAmounts) {
        orderAmounts.push({
          productId: key,
          amount: basketAmounts[key]
        });
      }

      let order = {
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
