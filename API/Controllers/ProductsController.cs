using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTO;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IGenericRepository<Product> _repo;
        private readonly IMapper _mapper;
        public ProductsController(IGenericRepository<Product> repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProductsAsync()
        {

            ProductsWithBrandsAndTypesSpec spec = new ProductsWithBrandsAndTypesSpec();
            var productDto = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(await _repo.GetAllBySpecAsync(spec));
            return Ok(productDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            ProductsWithBrandsAndTypesSpec spec = new ProductsWithBrandsAndTypesSpec(id);
            return _mapper.Map<Product, ProductToReturnDto>(await _repo.GetEntityBySpecAsync(spec));

        }
    }
}