using StructureMap;
using System.Web.Http.Dependencies;

namespace Company.Shopping.DependencyResolution
{
    /// <summary>
    /// The structure map web api dependency scope.
    /// </summary>
    public class StructureMapWebApiDependencyScope : StructureMapDependencyScope, IDependencyScope
    {
        #region Constructors

        public StructureMapWebApiDependencyScope(IContainer container)
            : base(container)
        {
        }

        #endregion Constructors
    }
}
