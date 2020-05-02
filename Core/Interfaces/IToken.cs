using Core.Entities.Identity;

namespace Core.Interfaces
{
    public interface IToken
    {
        string CreateToken(AppUser user);
    }
}