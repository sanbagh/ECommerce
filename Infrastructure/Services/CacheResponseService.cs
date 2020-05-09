using System;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Services
{
    public class CacheResponseService : ICacheResponse
    {
        private IDatabase _database;

        public CacheResponseService(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }
        public async Task CacheResponseAsync(string cacheKey, object response, TimeSpan timeToLive)
        {
            if (response == null) return;
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            var result = JsonSerializer.Serialize(response, options);
            await _database.StringSetAsync(cacheKey, result, timeToLive);
        }

        public async Task<string> GetCacheResponse(string cacheKey)
        {
          var rsult = await _database.StringGetAsync(cacheKey);
          if(rsult.IsNullOrEmpty) return null;
          return rsult;
        }
    }
}