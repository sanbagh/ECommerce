using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<T> GetByIdAsync(int id);
        Task<IReadOnlyList<T>> GetAllAsync();

        Task<T> GetEntityBySpecAsync(ISpecification<T> spec);
        Task<IReadOnlyList<T>> GetAllBySpecAsync(ISpecification<T> sepc);
    }
}