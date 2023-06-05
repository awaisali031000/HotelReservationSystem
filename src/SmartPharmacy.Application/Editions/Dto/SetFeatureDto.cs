using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Editions.Dto
{
    public class SetFeatureDto
    {
        public int editionId { get; set; }

        public Abp.NameValue[] features { get; set; }
    }
}
