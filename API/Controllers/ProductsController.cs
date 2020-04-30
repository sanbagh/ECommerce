using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTO;
using API.Errors;
using API.Helpers;
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
        private readonly IGenericRepository<ProductBrand> _repoBrands;
        private readonly IGenericRepository<ProductType> _repoTypes;
        private readonly IMapper _mapper;
        public ProductsController(IGenericRepository<Product> repo, IGenericRepository<ProductBrand> repoBrands,
                                IGenericRepository<ProductType> repoTypes, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
            _repoBrands = repoBrands;
            _repoTypes = repoTypes;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProductsAsync([FromQuery]ProductSpecParam productSpecParam)
        {
            ProductsWithBrandsAndTypesSpec spec = new ProductsWithBrandsAndTypesSpec(productSpecParam);
            ProuductsWithFilterCountSpec countProductsAfterFilter = new ProuductsWithFilterCountSpec(productSpecParam);
            int count = await _repo.GetCountAsync(countProductsAfterFilter);
            var productDto = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(await _repo.GetAllBySpecAsync(spec));
            Pagination<ProductToReturnDto> pagination = new Pagination<ProductToReturnDto>(productSpecParam.PageSize, productSpecParam.PageIndex, count, productDto);
            return Ok(pagination);
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

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetBrands()
        {
            return Ok(await _repoBrands.GetAllAsync());
        }
        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetTypes()
        {
            return Ok(await _repoTypes.GetAllAsync());
        }
    }
}

