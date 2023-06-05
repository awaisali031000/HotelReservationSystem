using Abp.Application.Services.Dto;

namespace SmartPharmacy.Roles.Dto
{
    public class PagedRoleResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}

