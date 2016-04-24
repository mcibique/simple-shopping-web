'use strict';

angular
  .module('shopping')
  .controller('HeaderController', function HeaderController($state) {
    const vm = this;

    vm.shouldShowBasketStatus = function () {
      return $state.includes('products');
    };
  });
