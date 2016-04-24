angular
  .module('productsService', ['env'])
  .factory('productsService', function productsService($http, apiPath) {
    function getProducts() {
      return $http.get(`${apiPath}/products/`).then(response => response.data);
    }

    function getProduct(id) {
      return $http.get(`${apiPath}/products/${id}`).then(response => response.data);
    }

    function updateProduct(product) {
      return $http.put(`${apiPath}/products/${product.id}`, product).then(response => response.data);
    }

    function createProduct(product) {
      return $http.post(`${apiPath}/products/`, product).then(response => response.data);
    }

    function deleteProduct(id) {
      return $http.delete(`${apiPath}/products/${id}`).then(response => response.data);
    }

    return { getProducts, getProduct, updateProduct, createProduct, deleteProduct };
  });
