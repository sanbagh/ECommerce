using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithBrandsAndTypesSpec : BaseSpecification<Product>
    {
        public ProductsWithBrandsAndTypesSpec()
        {
            AddIncludes(x => x.ProductBrand);
            AddIncludes(x => x.ProducType);
        }
        public ProductsWithBrandsAndTypesSpec(int id) : base(x => x.Id == id)
        {
            AddIncludes(x => x.ProductBrand);
            AddIncludes(x => x.ProducType);
        }
    }
}