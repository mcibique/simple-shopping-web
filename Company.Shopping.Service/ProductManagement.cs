using Company.Shopping.Model;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Company.Shopping.Service
{
    public class ProductManagement : IProductManagement
    {
        #region Fields

        private static List<Product> _products = new List<Product>
        {
            new Product
            {
                Id = 1,
                Name = "Product name",
                Description = "Tincidunt integer eu augue augue nunc elit dolor, luctus placerat scelerisque euismod, iaculis eu lacus nunc mi elit, vehicula ut laoreet ac, aliquam sit amet justo nunc tempor, metus vel.",
                Price = 20m,
                Rating = 4,
                ImageUrl = "//placehold.it/200x200?text=Product+image+1"
            },
            new Product
            {
                Id = 2,
                Name = "Product name 2",
                Description = "Tincidunt integer eu augue augue nunc elit dolor, luctus placerat scelerisque euismod, iaculis eu lacus nunc mi elit, vehicula ut laoreet ac, aliquam sit amet justo nunc tempor, metus vel.",
                Price = 40m,
                Rating = 1,
                ImageUrl = "//placehold.it/200x200?text=Product+image+2"
            },
            new Product
            {
                Id = 3,
                Name = "Product name 3",
                Description = "Tincidunt integer eu augue augue nunc elit dolor, luctus placerat scelerisque euismod, iaculis eu lacus nunc mi elit, vehicula ut laoreet ac, aliquam sit amet justo nunc tempor, metus vel.",
                Price = 15m,
                Rating = 5,
                ImageUrl = "//placehold.it/200x200?text=Product+image+3",
                IsNew = true
            },
            new Product
            {
                Id = 4,
                Name = "Product name 4",
                Description = "Tincidunt integer eu augue augue nunc elit dolor, luctus placerat scelerisque euismod, iaculis eu lacus nunc mi elit, vehicula ut laoreet ac, aliquam sit amet justo nunc tempor, metus vel.",
                Price = 80m,
                Rating = 4,
                ImageUrl = "//placehold.it/200x200?text=Product+image+4"
            },
            new Product
            {
                Id = 5,
                Name = "Product name 5",
                Description = "Tincidunt integer eu augue augue nunc elit dolor, luctus placerat scelerisque euismod, iaculis eu lacus nunc mi elit, vehicula ut laoreet ac, aliquam sit amet justo nunc tempor, metus vel.",
                Price = 175m,
                Rating = 2,
                ImageUrl = "//placehold.it/200x200?text=Product+image+5"
            },
            new Product
            {
                Id = 6,
                Name = "Product name 6",
                Description = "Tincidunt integer eu augue augue nunc elit dolor, luctus placerat scelerisque euismod, iaculis eu lacus nunc mi elit, vehicula ut laoreet ac, aliquam sit amet justo nunc tempor, metus vel.",
                Price = 12m,
                Rating = 5,
                ImageUrl = "//placehold.it/200x200?text=Product+image+6"
            }
        };

        #endregion Fields

        #region Methods

        public Task<Product> CreateProduct(Product product)
        {
            long id = 1;
            var lastProduct = _products.LastOrDefault();
            if (lastProduct != null)
            {
                id = lastProduct.Id + 1;
            }

            product.Rating = 0;
            product.Id = id;
            product.IsNew = true;

            _products.Add(product);
            return Task.FromResult(product);
        }

        public Task<int> DeleteProduct(long id)
        {
            var currentCount = _products.Count;
            _products = _products.Where(p => p.Id != id).ToList();
            return Task.FromResult(currentCount - _products.Count);
        }

        public Task<Product> GetProduct(long id)
        {
            return Task.FromResult(_products.FirstOrDefault(p => p.Id == id));
        }

        public Task<IEnumerable<Product>> GetProducts()
        {
            return Task.FromResult<IEnumerable<Product>>(_products);
        }

        public Task<Product> UpdateProduct(Product product)
        {
            var existingProduct = _products.FirstOrDefault(p => p.Id == product.Id);
            if (existingProduct != null)
            {
                existingProduct.Name = product.Name;
                existingProduct.Description = product.Description;
                existingProduct.Price = product.Price;
                existingProduct.ImageUrl = product.ImageUrl;
                existingProduct.IsNew = true;
            }

            return Task.FromResult(existingProduct);
        }

        #endregion Methods
    }
}
