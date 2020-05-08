using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.OrderAggregate;
using Infrastructure.Data;
using Microsoft.Extensions.Configuration;
using Stripe;

namespace Infrastructure.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IBasketRepo _bsktRepo;
        private readonly IUnitOfWork _uow;
        private readonly IConfiguration _config;
        public PaymentService(IBasketRepo bsktRepo, IUnitOfWork uow, IConfiguration config)
        {
            _config = config;
            _uow = uow;
            _bsktRepo = bsktRepo;

        }
        public async Task<CustomerBasket> CreateOrUpdatePayementIntent(string basketId)
        {
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];
            var basket = await _bsktRepo.GetBasketAsync(basketId);
            if (basket == null) return null;
            var shippingCharge = 0m;
            if (basket.DeliveryMethodId.HasValue)
            {
                var deliveryMethod = await _uow.Repository<DeliveryMethod>().GetByIdAsync(basket.DeliveryMethodId.Value);
                if (deliveryMethod != null) shippingCharge = deliveryMethod.Price;
            }
            foreach (var item in basket.Items)
            {
                var product = await _uow.Repository<Core.Entities.Product>().GetByIdAsync(item.Id);
                item.Price = product.Price;
            }
            var paymentIntentService = new PaymentIntentService();
            if (string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = (long)((basket.Items.Sum(x => x.Price * x.Quantity) + shippingCharge)) * 100,
                    Currency = "usd",
                    PaymentMethodTypes = new List<string> { "card" }
                };
                var payment = await paymentIntentService.CreateAsync(options);
                basket.ClientSecret = payment.ClientSecret;
                basket.PaymentIntentId = payment.Id;
            }
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = (long)((basket.Items.Sum(x => x.Price * x.Quantity) + shippingCharge)) * 100
                };
                await paymentIntentService.UpdateAsync(basket.PaymentIntentId, options);
            }
            await _bsktRepo.CreateOrUpdateBasketAsync(basket);
            return basket;
        }
    }
}