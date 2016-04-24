using System.Web;
using System.Web.Mvc;

namespace Company.Shopping.Views
{
    public abstract class BaseViewPage : BaseViewPage<dynamic>
    {
    }

    public abstract class BaseViewPage<TModel> : WebViewPage<TModel>
    {
        #region Properties

        public bool IsDebug
        {
            get
            {
                return HttpContext.Current.IsDebuggingEnabled;
            }
        }

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
