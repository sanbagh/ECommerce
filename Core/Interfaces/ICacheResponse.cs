using System;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface ICacheResponse
    {
         Task CacheResponseAsync(string cacheKey, object response, TimeSpan timeToLive);
         Task<string> GetCacheResponse(string cacheKey);
    }
}