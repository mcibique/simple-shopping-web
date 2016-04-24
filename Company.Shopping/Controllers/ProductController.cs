using Company.Shopping.Model;
using Company.Shopping.Service;
using System.Threading.Tasks;
using System.Web.Http;

namespace Company.Shopping.Controllers
{
    [RoutePrefix("api/products")]
    public class ProductController : ApiController
    {
        #region Fields

        private readonly IProductManagement _productManagement;

        #endregion Fields

        #region Constructors

        public ProductController(IProductManagement productManagement)
        {
            this._productManagement = productManagement;
        }

        #endregion Constructors

        #region Methods

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> CreateProduct([FromBody]Product product)
        {
            var createProduct = await this._productManagement.CreateProduct(product);
            return this.Ok(createProduct);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IHttpActionResult> DeleteProduct([FromUri]long id)
        {
            int count = await this._productManagement.DeleteProduct(id);
            if (count == 0)
            {
                return this.NotFound();
            }
            return this.Ok(count);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IHttpActionResult> GetProduct([FromUri]long id)
        {
            var product = await this._productManagement.GetProduct(id);
            if (product == null)
            {
                return this.NotFound();
            }
            return this.Ok(product);
        }

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> GetProducts()
        {
            var products = await this._productManagement.GetProducts();
            return this.Ok(products);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IHttpActionResult> UpdateProduct([FromUri]long id, [FromBody]Product product)
        {
            var updatedProduct = await this._productManagement.UpdateProduct(product);
            if (updatedProduct == null)
            {
                return this.NotFound();
            }
            return this.Ok(updatedProduct);
        }

        #endregion Methods
    }
}
