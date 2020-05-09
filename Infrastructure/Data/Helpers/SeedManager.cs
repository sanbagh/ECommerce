using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Core.OrderAggregate;
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
            var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            await ActualSeedAsync<ProductType>(dbContext, path + @"/Data/SeedData/types_sqlserver.json");
            await ActualSeedAsync<ProductBrand>(dbContext, path + @"/Data/SeedData/brands_sqlserver.json");
            await ActualSeedAsync<Product>(dbContext, path + @"/Data/SeedData/products.json");
            await ActualSeedAsync<DeliveryMethod>(dbContext, path + @"/Data/SeedData/delivery_sqlserver.json");
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
            var d_Data = JsonSerializer.Deserialize<List<T>>(data);
            foreach (var obj in d_Data)
            {
                entities.Add(obj);
            }
            await dbContext.SaveChangesAsync();
        }

        entities = null;
    }
}