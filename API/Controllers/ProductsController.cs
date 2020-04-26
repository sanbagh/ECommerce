using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTO;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class ProductsController : BaseApiController
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
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            ProductsWithBrandsAndTypesSpec spec = new ProductsWithBrandsAndTypesSpec(id);
            var product = _mapper.Map<Product, ProductToReturnDto>(await _repo.GetEntityBySpecAsync(spec));
            if (product == null) return NotFound(new ApiResponse(404));
            return product;
        }
    }
}