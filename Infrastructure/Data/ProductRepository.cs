using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreContext _dbContext;
        public ProductRepository(StoreContext dbContext)
        {
            _dbContext = dbContext;

        }
        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _dbContext.Products.FindAsync(id);
        }

        public async Task<IReadOnlyList<Product>> GetProductsAsync()
        {
            return await _dbContext.Products.ToListAsync();
        }
    }
}