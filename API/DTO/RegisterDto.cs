using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", 
        ErrorMessage = "Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")]
        public string Password { get; set; }
    }
}