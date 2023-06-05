using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.AuditLogs.Dto
{
    public class PagedAuditLogResultResponseDto
    {
        public int Id { get; set; }
        public string BrowserInfo { get; set; }
        public string ClientIpAddress { get; set; }
        public string ClientName { get; set; }
        public string MethodName { get; set; }
        public string ServiceName { get; set; }
        public string Exception { get; set; }
        public string ExceptionMessage { get; set; }
    }
}
