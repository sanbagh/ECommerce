using System.Threading.Tasks;
using Core.Entities;
using Core.OrderAggregate;

namespace Core.Interfaces
{
    public interface IPaymentService
    {
         Task<CustomerBasket> CreateOrUpdatePayementIntent(string basketId);
         Task<Order> UpdateOrderPayementSucceeded(string paymentIntentId);
         Task<Order> UpdateOrderPayementFailed(string paymentIntentId);
    }
}