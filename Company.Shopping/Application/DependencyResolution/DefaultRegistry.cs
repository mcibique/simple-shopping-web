using Company.Shopping.Service;
using StructureMap.Configuration.DSL;

namespace Company.Shopping.DependencyResolution
{
    public class DefaultRegistry : Registry
    {
        #region Constructors

        public DefaultRegistry()
        {
            For<IProductManagement>().Use<ProductManagement>();
        }

        #endregion Constructors
    }
}
