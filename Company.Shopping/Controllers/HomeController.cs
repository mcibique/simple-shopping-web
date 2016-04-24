using System.Web.Mvc;

namespace Company.Shopping.Controllers
{
    public class HomeController : BaseController
    {
        #region Methods

        [HttpGet]
        public ActionResult Index()
        {
            return this.View();
        }

        #endregion Methods
    }
}
