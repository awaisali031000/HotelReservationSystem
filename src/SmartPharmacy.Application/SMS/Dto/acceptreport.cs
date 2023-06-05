using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.SMS.Dto
{
    public class acceptreport
    {
        public bool Statuscode { get; set; }
        public string statusmessage { get; set; }
        public string Messageid { get; set; }
        public string Recipient { get; set; }
        public string Originator { get; set; }
        public string Messagetype { get; set; }
        public string Messagedata { get; set; }

    }
}
