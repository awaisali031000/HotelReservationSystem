using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Enums
{
    public enum StoreStockSourceType
    {
        Direct = 1,
        SaleOrder = 2,
        SaleOrderReturn = 3,
        StockTransfer = 4,
        StockTransferReturn = 5,
    }
}
