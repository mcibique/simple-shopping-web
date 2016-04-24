angular
  .module('basket', [])
  .factory('basket', function () {
    let products = [];
    let productAmount = Object.create(null);
    let totalItems = 0;

    function add(product) {
      let productId = product.id;
      if (productAmount[productId]) {
        productAmount[productId]++;
      } else {
        products.push(product);
        productAmount[productId] = 1;
      }
      totalItems++;
    }

    function remove(product) {
      let productId = product.id;
      let amount = productAmount[productId];
      if (amount) {
        productAmount[productId]--;
        if (amount <= 1) {
          delete productAmount[productId];
          products = products.filter(p => p.id !== productId);
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
      let total = 0;

      products.forEach(function (product) {
        let amount = productAmount[product.id];
        if (!amount) {
          return;
        }

        total += amount * product.price;
      });

      return total;
    }

    return { getProducts, add, remove, clear, count, getProductAmount, getProductAmounts, getTotal };
  });
