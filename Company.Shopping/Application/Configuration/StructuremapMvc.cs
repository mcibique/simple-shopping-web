using Company.Shopping.DependencyResolution;
using Microsoft.Web.Infrastructure.DynamicModuleHelper;
using StructureMap;
using System.Web.Mvc;
using WebActivatorEx;

[assembly: PreApplicationStartMethod(typeof(Company.Shopping.StructuremapMvc), "Start")]
[assembly: ApplicationShutdownMethod(typeof(Company.Shopping.StructuremapMvc), "End")]

namespace Company.Shopping
{
    public static class StructuremapMvc
    {
        #region Properties

        public static StructureMapDependencyScope StructureMapDependencyScope { get; set; }

        #endregion Properties

        #region Methods

        public static void End()
        {
            StructureMapDependencyScope.Dispose();
        }

        public static void Start()
        {
            IContainer container = IoC.Initialize();
            StructureMapDependencyScope = new StructureMapDependencyScope(container);
            DependencyResolver.SetResolver(StructureMapDependencyScope);
            DynamicModuleUtility.RegisterModule(typeof(StructureMapScopeModule));
        }

        #endregion Methods
    }
}
