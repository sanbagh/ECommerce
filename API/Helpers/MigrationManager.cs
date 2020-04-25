using System;
using System.Threading.Tasks;
using API;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

public static class MigrationManager
{
    public static async Task<IHost> MigrateDataBaseAsync(this IHost host)
    {
        using (var scope = host.Services.CreateScope())
        {
            var services = scope.ServiceProvider;
            try
            {
                var dbContext = services.GetRequiredService<StoreContext>();
                await dbContext.Database.MigrateAsync();
                await SeedManager.SeedDataBaseAsync(dbContext, services.GetRequiredService<ILogger<SeedManager>>());
            }
            catch (Exception ex)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error occured while applying migrations");
            }
        }
        return host;
    }
}