using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.SMS.Dto
{
    public class SendBrandedResponseDto
    {
        public string ContentEncoding { get; set; }
        public string ContentType { get; set; }
        public string Data { get; set; }
        public bool JsonRequestBehavior { get; set; }
        public string MaxJsonLength { get; set; }
        public string RecursionLimit { get; set; }

    }
}
