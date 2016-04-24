using System.Web.Mvc;

namespace Company.Shopping.Controllers
{
    public abstract class BaseController : Controller
    {
        #region Properties

        public string Title
        {
            get
            {
                return this.ViewBag.Title;
            }
            set
            {
                this.ViewBag.Title = value;
            }
        }

        #endregion Properties
    }
}
