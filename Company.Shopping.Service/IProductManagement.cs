using Company.Shopping.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Company.Shopping.Service
{
    public interface IProductManagement
    {
        #region Methods

        Task<Product> CreateProduct(Product product);

        Task<int> DeleteProduct(long id);

        Task<Product> GetProduct(long id);

        Task<IEnumerable<Product>> GetProducts();

        Task<Product> UpdateProduct(Product product);

        #endregion Methods
    }
}
