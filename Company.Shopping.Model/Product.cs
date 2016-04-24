namespace Company.Shopping.Model
{
    public class Product
    {
        #region Properties

        public string Description { get; set; }
        public long Id { get; set; }
        public string ImageUrl { get; set; }
        public bool IsNew { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Rating { get; set; }

        #endregion Properties
    }
}
