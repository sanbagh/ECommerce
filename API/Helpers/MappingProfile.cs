using API.DTO;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Product, ProductToReturnDto>()
            .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
            .ForMember(d => d.ProducType, o => o.MapFrom(s => s.ProducType.Name))
            .ForMember(d => d.PhotoUrl, o => o.MapFrom<ProductUrlResolver>());
        }
    }
}