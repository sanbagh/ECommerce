using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepo _repo;
        public BasketController(IBasketRepo repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketAsync(string id)
        {
            var basket = await _repo.GetBasketAsync(id);
            return Ok(basket ?? new CustomerBasket(id));
        }
        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> CreateOrUpdateBasketAsync(CustomerBasket basket)
        {
            var result = await _repo.CreateOrUpdateBasketAsync(basket);
            return Ok(result);
        }
        [HttpDelete]
        public async Task<ActionResult<bool>> DeleteBasketAsync(string id)
        {
            return Ok(await _repo.DeleteBasketAsync(id));
        }
    }
}