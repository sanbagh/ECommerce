using System.IO;
using System.Threading.Tasks;
using API.DTO;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Stripe;

namespace API.Controllers
{
    public class PaymentController : BaseApiController
    {
        private readonly IPaymentService _paymentService;
        private readonly IMapper _mapper;
        private static readonly string _whSecret = "whsec_8OfbglBkSWkMEBsPJiHoNeIHIiTwj5hu";
        private readonly ILogger<IPaymentService> _logger;
        public PaymentController(IPaymentService paymentService, IMapper mapper, ILogger<IPaymentService> logger)
        {
            _logger = logger;
            _mapper = mapper;
            _paymentService = paymentService;
        }

        [HttpPost("{basketId}")]
        [Authorize]
        public async Task<ActionResult<CustomerBasketDto>> CreateOrUpdatePaymentIntent(string basketId)
        {
            var basket = await _paymentService.CreateOrUpdatePayementIntent(basketId);
            if (basket == null) return new BadRequestObjectResult(new ApiResponse(400, "No such basket exists"));
            return Ok(_mapper.Map<CustomerBasket, CustomerBasketDto>(basket));
        }

        [HttpPost("webhook")]
        public async Task<string> StripeWebhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], _whSecret);
            PaymentIntent intent;
            Core.OrderAggregate.Order order = null;
            string message = null;

            switch (stripeEvent.Type)
            {
                case "payment_intent.succeeded":
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    _logger.LogInformation("Payment Succeeded " + intent.Id);
                    order = await _paymentService.UpdateOrderPayementSucceeded(intent.Id);
                    if (order != null)
                    {
                        message = "Payment Received for order id " + order.Id;
                        _logger.LogInformation(message);
                    }
                    break;
                case "payment_intent.payment_failed":
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    _logger.LogInformation("Payment Failed " + intent.Id);
                    order = await _paymentService.UpdateOrderPayementFailed(intent.Id);
                    if (order != null)
                    {
                        message = "Payment not received for order id " + order.Id;
                        _logger.LogInformation(message);
                    }
                    break;
            }
            if (order == null) return  "Payment Falied from API";
                    return message;
        }
    }
}