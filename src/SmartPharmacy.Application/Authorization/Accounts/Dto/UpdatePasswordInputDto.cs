using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Authorization.Accounts.Dto
{
    public class UpdatePasswordInputDto
    {
        public string UserEmail { get; set; }
        public string Token { get; set; }
        public string NewPassword { get; set; }

    }
}
