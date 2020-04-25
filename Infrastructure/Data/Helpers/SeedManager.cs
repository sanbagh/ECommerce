using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

public class SeedManager
{
    public static async Task SeedDataBaseAsync(StoreContext dbContext, ILogger<SeedManager> logger)
    {
        try
        {
            await ActualSeedAsync<ProductType>(dbContext, "../Infrastructure/Data/SeedData/types.json");
            await ActualSeedAsync<ProductBrand>(dbContext, "../Infrastructure/Data/SeedData/brands.json");
            await ActualSeedAsync<Product>(dbContext, "../Infrastructure/Data/SeedData/products.json");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error occured while seeding data");
        }
    }
    private static async Task ActualSeedAsync<T>(StoreContext dbContext, string fileName) where T : BaseEntity
    {
        var entities = dbContext.Set<T>();

        if (!await entities.AnyAsync())
        {
            string data = File.ReadAllText(fileName);
            var brands = JsonSerializer.Deserialize<List<T>>(data);
            foreach (var brand in brands)
            {
                entities.Add(brand);
            }
            await dbContext.SaveChangesAsync();
        }

        entities = null;
    }
}