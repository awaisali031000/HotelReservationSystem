using Abp.Dependency;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.SMS
{
    public interface ISMSSender : ITransientDependency
    {
        Task SendBrandedAsync(string reciever, string messageData);
        Task SendShortCodeAsync(string reciever, string messageData);
    }
}
