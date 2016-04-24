using StructureMap;

namespace Company.Shopping.DependencyResolution
{
    public static class IoC
    {
        #region Methods

        public static IContainer Initialize()
        {
            return new Container(c => c.AddRegistry<DefaultRegistry>());
        }

        #endregion Methods
    }
}
