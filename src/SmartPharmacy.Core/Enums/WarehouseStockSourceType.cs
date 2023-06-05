using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Enums
{
    public enum WarehouseStockSourceType
    {
        Direct = 1,
        PurchaseOrder = 2,
        PurchaseOrderReturn = 3,
        StockTransfer = 4,
        StockTransferReturn = 5,
    }
}
