using System.Collections.Generic;

namespace Company.Shopping.Model
{
    public class Order
    {
        #region Properties

        public Address DeliveryAddress { get; set; }
        public IEnumerable<ProductInOrder> Products { get; set; }

        #endregion Properties
    }
}
