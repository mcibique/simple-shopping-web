using System.Web.Mvc;

namespace Company.Shopping
{
    public static class ViewEngineConfig
    {
        #region Methods

        public static void Register(ViewEngineCollection engines)
        {
            engines.Clear();
            engines.Add(new RazorViewEngine());
        }

        #endregion Methods
    }
}
