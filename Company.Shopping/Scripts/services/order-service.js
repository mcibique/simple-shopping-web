angular
  .module('orderService', ['env'])
  .factory('orderService', function ($http, apiPath) {
    function placeOrder(order) {
      return $http.post(`${apiPath}/checkout/`, order).then(response => response.data);
    }

    return { placeOrder };
  });
