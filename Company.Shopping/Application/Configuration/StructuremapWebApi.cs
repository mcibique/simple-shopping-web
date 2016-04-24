using Company.Shopping.DependencyResolution;
using System.Web.Http;

[assembly: WebActivatorEx.PostApplicationStartMethod(typeof(Company.Shopping.StructuremapWebApi), "Start")]

namespace Company.Shopping
{
    public static class StructuremapWebApi
    {
        #region Methods

        public static void Start()
        {
            var container = StructuremapMvc.StructureMapDependencyScope.Container;
            GlobalConfiguration.Configuration.DependencyResolver = new StructureMapWebApiDependencyResolver(container);
        }

        #endregion Methods
    }
}
