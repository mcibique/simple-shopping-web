using Company.Shopping.Model;
using System.Web.Http;

namespace Company.Shopping.Controllers
{
    [RoutePrefix("api/checkout")]
    public class CheckoutController : ApiController
    {
        #region Methods

        [HttpPost]
        public IHttpActionResult Checkout([FromBody]Order order)
        {
            // TODO: process order
            return this.Ok();
        }

        #endregion Methods
    }
}
