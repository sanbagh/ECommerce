using System;
using System.Linq.Expressions;
using Core.OrderAggregate;

namespace Core.Specifications
{
    public class OrderWithPaymentIntentIdSpec : BaseSpecification<Order>
    {
        public OrderWithPaymentIntentIdSpec(string paymentIntentId) : base(x => x.PaymentIntentId == paymentIntentId)
        {
        }
    }
}