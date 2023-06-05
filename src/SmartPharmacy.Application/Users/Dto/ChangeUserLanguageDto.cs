using System.ComponentModel.DataAnnotations;

namespace SmartPharmacy.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}